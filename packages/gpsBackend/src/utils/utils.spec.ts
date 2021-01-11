import { distance } from './utils';

describe('test distance function', () => {
  it('first', () => {
    const res = distance(77.1539, -139.398, -77.1804, -139.55);
    expect(Math.round(res)).toEqual(17166029);
  });
  it('second', () => {
    const res = distance(77.1539, 120.398, 77.1804, 129.55);
    expect(Math.round(res)).toEqual(225883);
  });
  it('short yandex.maps', () => {
    const res = distance(56.860610, 53.211645, 56.860774, 53.214379);
    expect(Math.round(res)).toEqual(167);
  });
  it('long yandex.maps', () => {
    const res = distance(56.860610, 53.211645, 59.663920, 150.136921);
    expect(Math.round(res / 1000)).toEqual(5163);
  });
});

