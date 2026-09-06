export const operations = {
  start(s, p) {
    if (![0, 1, 2].includes(p.slot)) throw new Error("Invalid slot");
    s.started = true;
    s.slot = p.slot;
    return { started: true };
  },
  slot(s, p) {
    if (![0, 1, 2].includes(p.slot)) throw new Error("Invalid slot");
    s.slot = p.slot;
    return { slot: p.slot };
  },
  depart(s) {
    s.sequenceNumber++;
    return { sequenceNumber: s.sequenceNumber };
  },
};
