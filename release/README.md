# Desktop and Steam release gates

Source delivery is not Steam delivery. Windows x64 is the proposed first commercial target. The same local `dist` is loaded through the sandboxed Electron application protocol; remote navigation and new windows are blocked. Saves live in Chromium local storage under Electron's per-user application data and fixed `orison://game` origin. Do not change the application identity/origin between releases without a save migration.

## Commands

`npm run desktop` builds and launches locally. `npm run desktop:package -- win32` stages only dist and the shell into an archive-backed Electron application. `npm run desktop:package -- linux` packages a Linux validation application. Outputs are excluded from git. The packager may need network access to acquire Electron for the selected target.

## Must be completed on target devices/accounts

- Install and run the exact Windows package. Verify offline startup, clean install, resizing, DPI, fullscreen, focus loss and suspend/resume.
- Create progress, quit the process, restart and load it. Install an update over an existing copy and confirm save retention. Verify prior-save recovery with a corrupted primary copy.
- Test physical mouse, keyboard and advertised controllers. A source handler is not device proof.
- Establish minimum/recommended hardware and measure frame time, draw calls, memory, loading and long-session stability. CPU Vulkan captures are not these measurements.
- Review audio intelligibility and cues on speakers/headphones, not just oscillator state.
- Complete final art, performed dialogue where selected, localization, accessibility review and asset licensing approval.
- Configure the user's actual Steam application, builds, depots and branches. Steam Cloud and achievements are not implemented and must not be advertised.
- Prepare store art, trailer, content disclosures and accurate feature/language claims from the final game. Complete Valve's store/build reviews. Steam Deck rating remains Valve-controlled.
- Select update and support ownership, archive the shipped source/build manifest, and verify rollback preserves supported saves.

No account configuration, Steam publication, signing, store submission or external upload is performed by the packaging scripts.
