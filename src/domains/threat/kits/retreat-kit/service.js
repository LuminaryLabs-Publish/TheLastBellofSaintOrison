export const operations = {
  retreat(s) {
    s.exposure = 0;
    s.setbacks++;
    return { setbacks: s.setbacks };
  },
};
