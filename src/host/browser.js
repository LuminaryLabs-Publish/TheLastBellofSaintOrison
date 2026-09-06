import { hitButton, focusable } from "../providers/canvas-ui.js";
export function attachBrowserHost({
  engine,
  graphics,
  audio,
  surface,
  review = false,
}) {
  let previous = 0,
    accumulator = 0,
    raf = 0,
    lastPad = 0,
    lastPadButtons = [],
    pendingPoint = null,
    receipt = null,
    lastPlatformRequest = 0;
  const removers = [];
  const submit = (command) => engine.n.orison.submit(command);
  const packet = () => engine.n.orisonPresentation.packet();
  const on = (target, type, fn) => {
    target.addEventListener(type, fn);
    removers.push(() => target.removeEventListener(type, fn));
  };
  const point = (e) => {
    const r = surface.getBoundingClientRect(),
      scale = Math.min(r.width / 1280, r.height / 720);
    return {
      x: (e.clientX - r.left - (r.width - 1280 * scale) / 2) / scale,
      y: (e.clientY - r.top - (r.height - 720 * scale) / 2) / scale,
    };
  };
  on(
    surface,
    "pointermove",
    (e) => (pendingPoint = { type: "point", ...point(e) }),
  );
  function activate() {
    const frame = packet().ui,
      b = frame.elements.find(
        (e) => e.id === frame.cursor.activeId && e.kind === "button",
      );
    if (b && !b.disabled) submit(b.command);
  }
  function focus(delta) {
    const f = packet().ui,
      buttons = focusable(f);
    if (!buttons.length) return;
    const index = buttons.findIndex((b) => b.id === f.cursor.activeId),
      next = buttons[(index + delta + buttons.length) % buttons.length];
    submit({ type: "focus", id: next.id });
  }
  on(surface, "pointerdown", (e) => {
    audio.unlock();
    surface.focus();
    const p = point(e),
      frame = packet().ui;
    const b = hitButton(frame, p.x, p.y);
    if (b) submit(b.command);
    else if (!frame.modal && engine.n.ui.getState().screen === "play") {
      const r = surface.getBoundingClientRect(),
        id = graphics.pick(
          (e.clientX - r.left) / r.width,
          (e.clientY - r.top) / r.height,
        );
      if (id) submit({ action: "inspect", id });
    }
  });
  on(window, "keydown", (e) => {
    if (
      [
        "Tab",
        "ArrowDown",
        "ArrowRight",
        "ArrowUp",
        "ArrowLeft",
        "Enter",
        " ",
        "Escape",
      ].includes(e.key)
    )
      e.preventDefault();
    audio.unlock();
    if (e.repeat) return;
    if (["Tab", "ArrowDown", "ArrowRight"].includes(e.key)) {
      focus(e.shiftKey ? -1 : 1);
      return;
    }
    if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
      focus(-1);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      activate();
      return;
    }
    const u = engine.n.ui.getState();
    if (e.key === "Escape") {
      submit({
        action:
          u.panel || u.puzzle
            ? "close"
            : u.screen === "play"
              ? "pause"
              : "back",
      });
      return;
    }
    if (u.screen === "play" && !u.panel && !u.puzzle) {
      const action = { j: "journal", i: "inventory", m: "map", h: "hint" }[
        e.key.toLowerCase()
      ];
      if (action) submit({ action });
    }
  });
  on(window, "resize", () =>
    submit({ type: "resize", width: innerWidth, height: innerHeight }),
  );
  on(document, "visibilitychange", () => {
    previous = 0;
    accumulator = 0;
    submit({ type: "suspend", value: document.hidden });
  });
  on(window, "blur", () => submit({ type: "suspend", value: true }));
  on(window, "focus", () => {
    previous = 0;
    submit({ type: "suspend", value: false });
  });
  function gamepad(now) {
    const pad = navigator.getGamepads?.()[0];
    if (!pad) return;
    const buttons = pad.buttons.map((b) => b.pressed);
    if (buttons[0] && !lastPadButtons[0]) {
      audio.unlock();
      activate();
    }
    if (buttons[1] && !lastPadButtons[1]) submit({ action: "back" });
    if (buttons[9] && !lastPadButtons[9]) submit({ action: "pause" });
    if (now - lastPad > 180) {
      if (pad.axes[1] > 0.5 || buttons[13]) {
        focus(1);
        lastPad = now;
      }
      if (pad.axes[1] < -0.5 || buttons[12]) {
        focus(-1);
        lastPad = now;
      }
    }
    lastPadButtons = buttons;
  }
  function frame(now) {
    if (pendingPoint) {
      submit(pendingPoint);
      pendingPoint = null;
    }
    gamepad(now);
    accumulator += previous ? Math.min((now - previous) / 1000, 0.15) : 0;
    previous = now;
    let steps = 0;
    while (accumulator >= 1 / 30 && steps++ < 5) {
      engine.tick(1 / 30);
      accumulator -= 1 / 30;
    }
    const p = packet();
    if (p.platform && p.platform.id !== lastPlatformRequest) {
      lastPlatformRequest = p.platform.id;
      const op = p.platform.operation;
      const promise =
        op === "quit"
          ? window.orisonPlatform?.quit()
          : window.orisonPlatform?.desktop
            ? window.orisonPlatform.toggleFullscreen()
            : document.fullscreenElement
              ? document.exitFullscreen()
              : document.documentElement.requestFullscreen();
      Promise.resolve(promise).catch((error) =>
        submit({ action: "platform-error", message: error.message }),
      );
    }
    receipt = graphics.render(p);
    audio.present(p.audio);
    raf = requestAnimationFrame(frame);
  }
  submit({ type: "resize", width: innerWidth, height: innerHeight });
  engine.tick(1 / 30);
  raf = requestAnimationFrame(frame);
  if (review)
    Object.defineProperty(window, "orisonReview", {
      configurable: true,
      value: Object.freeze({
        inspect: () => ({
          game: engine.n.orison.getState(),
          room: engine.n.orison.getRoom().id,
          ui: engine.n.ui.getDescriptors("frames").active,
          screen: engine.n.ui.getState().screen,
          panel: engine.n.ui.getState().panel,
          puzzle: engine.n.ui.getState().puzzle,
          sequence: engine.n.sequence.getNodeRuntime().getRunnerStates(),
          graphics: graphics.stats(),
          audio: audio.stats(),
          receipt,
        }),
        // Validated command boundary; never raw state assignment. Enabled only by Vite development mode.
        command: (command) => submit(command),
      }),
    });
  return () => {
    cancelAnimationFrame(raf);
    for (const remove of removers) remove();
    engine.n.orison.dispose();
    engine.n.orisonPresentation.dispose();
    graphics.dispose();
    audio.dispose();
    if (review) delete window.orisonReview;
  };
}
