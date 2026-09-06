function wrap(ctx, value, width) {
  const lines = [];
  for (const paragraph of String(value).split("\n")) {
    let line = "";
    for (const word of paragraph.split(" ")) {
      const candidate = line ? line + " " + word : word;
      if (line && ctx.measureText(candidate).width > width) {
        lines.push(line);
        line = word;
      } else line = candidate;
    }
    lines.push(line);
  }
  return lines;
}
export function drawUI(canvas, frame) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width,
    height = canvas.height;
  const scale = Math.min(width / frame.width, height / frame.height),
    ox = (width - frame.width * scale) / 2,
    oy = (height - frame.height * scale) / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);
  for (const e of frame.elements) {
    if (e.kind === "rect") {
      ctx.fillStyle = e.fill;
      ctx.fillRect(e.x, e.y, e.w, e.h);
      continue;
    }
    if (e.kind === "button") {
      const active = frame.cursor.activeId === e.id;
      ctx.globalAlpha = e.disabled ? 0.35 : 1;
      ctx.fillStyle = active
        ? "#b5a16c2b"
        : e.style === "menu"
          ? "#00000000"
          : "#16282ddc";
      ctx.fillRect(e.x, e.y, e.w, e.h);
      ctx.strokeStyle = active
        ? "#d4bd85"
        : e.selected
          ? "#ad9b6d"
          : "#62777566";
      ctx.lineWidth = active ? 1.5 : 0.7;
      ctx.beginPath();
      ctx.moveTo(e.x, e.y + e.h);
      ctx.lineTo(e.x + e.w, e.y + e.h);
      ctx.stroke();
      const size = e.small
        ? 12
        : e.style === "menu"
          ? 23
          : e.kindLabel
            ? 18
            : 17;
      ctx.font =
        (e.style === "menu" ? "" : "") +
        size +
        "px " +
        (e.style === "menu" ? "Georgia, serif" : "Arial, sans-serif");
      ctx.fillStyle = active ? "#fff3d1" : "#dbded0";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(
        e.text,
        e.x + (e.small ? 6 : 14),
        e.y + e.h / 2 + (e.kindLabel ? 7 : 0),
        e.w - 25,
      );
      if (e.kindLabel) {
        ctx.font = "9px Arial";
        ctx.fillStyle = "#aeaa8c";
        ctx.fillText((e.seen ? "✓  " : "") + e.kindLabel, e.x + 14, e.y + 12);
      }
      ctx.globalAlpha = 1;
      continue;
    }
    if (e.kind === "text") {
      ctx.font =
        (e.italic ? "italic " : "") +
        e.size +
        "px " +
        (e.font === "serif" ? "Georgia, serif" : "Arial, sans-serif");
      ctx.fillStyle = e.color;
      ctx.textAlign = e.align ?? "left";
      ctx.textBaseline = "top";
      const lines = wrap(ctx, e.text, e.maxWidth ?? 1200);
      lines.forEach((line, i) =>
        ctx.fillText(line, e.x, e.y + i * e.size * (e.lineHeight ?? 1.3)),
      );
    }
  }
  const c = frame.cursor;
  ctx.translate(c.x, c.y);
  ctx.strokeStyle = c.activeId ? "#f4dfad" : "#e2d9ba";
  ctx.lineWidth = 1.25;
  const r = 6 * c.scale;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r, 0);
  ctx.lineTo(0, r);
  ctx.lineTo(-r, 0);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "#f3e1bb";
  ctx.fillRect(-1, -1, 2, 2);
  if (c.label) {
    ctx.font = "10px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(c.label, r + 8, 0);
  }
  ctx.restore();
}
export function hitButton(frame, x, y) {
  let elements = frame.elements;
  if (frame.modal) {
    const index = elements.findIndex(
      (e) => e.id === "panel-scrim" || e.id === "puzzle-scrim",
    );
    elements = elements.slice(index);
  }
  return (
    [...elements]
      .reverse()
      .find(
        (e) =>
          e.kind === "button" &&
          !e.disabled &&
          x >= e.x &&
          x <= e.x + e.w &&
          y >= e.y &&
          y <= e.y + e.h,
      ) ?? null
  );
}
export function focusable(frame) {
  const index = frame.modal
    ? frame.elements.findIndex(
        (e) => e.id === "panel-scrim" || e.id === "puzzle-scrim",
      )
    : 0;
  return frame.elements
    .slice(Math.max(0, index))
    .filter((e) => e.kind === "button" && !e.disabled);
}
