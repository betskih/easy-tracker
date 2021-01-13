import {DEFAULT_STATE, DEFAULT_ZOOM, getDefaultState, getExtremeValue, getZoomValue} from './utils';

describe('Yandex utils', () => {
  describe('getDefaultState test', () => {
    it('should be return defaultState', () => {
      const track: Array<Array<number>> = [];
      expect(getDefaultState(track)).toEqual(DEFAULT_STATE);
    });
  });

  describe('getExtremeValue test', () => {
    it('should be return correct value', () => {
      const track: Array<Array<number>> = [
        [1, 2],
        [7, 8],
        [3, 4],
        [0, 9],
        [5, 6],
        [4, 3],
      ];
      const expected = { minLatitude: 0, maxLatitude: 7, minLongitude: 2, maxLongitude: 9 };

      expect(getExtremeValue(track)).toEqual(expected);
    });

    it('should be return correct value if multiple NaN values', () => {
      const track: Array<Array<number>> = [
        [NaN, 25],
        [7, 8],
        [3, NaN],
        [1, 9],
        [5, 6],
        [4, 3],
      ];
      const expected = { minLatitude: 1, maxLatitude: 7, minLongitude: 3, maxLongitude: 25 };

      expect(getExtremeValue(track)).toEqual(expected);
    });
  });

  describe('getZoomValue test should correct zoomValue', () => {
    it.each`
      widthRatio  | heightRatio | zoomValueDefault | expected
      ${24}       | ${14}       | ${undefined}     | ${19}
      ${25}       | ${14}       | ${undefined}     | ${18}
      ${24}       | ${15}       | ${undefined}     | ${18}
      ${49}       | ${29}       | ${undefined}     | ${18}
      ${49}       | ${30}       | ${undefined}     | ${17}
      ${50}       | ${29}       | ${undefined}     | ${17}
      ${99}       | ${59}       | ${undefined}     | ${17}
      ${99}       | ${60}       | ${undefined}     | ${16}
      ${100}      | ${59}       | ${undefined}     | ${16}
      ${199}      | ${119}      | ${undefined}     | ${16}
      ${199}      | ${120}      | ${undefined}     | ${15}
      ${200}      | ${119}      | ${undefined}     | ${15}
      ${399}      | ${239}      | ${undefined}     | ${15}
      ${399}      | ${240}      | ${undefined}     | ${14}
      ${400}      | ${239}      | ${undefined}     | ${14}
      ${799}      | ${479}      | ${undefined}     | ${14}
      ${799}      | ${480}      | ${undefined}     | ${13}
      ${800}      | ${479}      | ${undefined}     | ${13}
      ${1599}     | ${959}      | ${undefined}     | ${13}
      ${3199}     | ${1919}     | ${undefined}     | ${12}
      ${6399}     | ${3839}     | ${undefined}     | ${11}
      ${12799}    | ${7679}     | ${undefined}     | ${10}
      ${25599}    | ${15359}    | ${undefined}     | ${9}
      ${51199}    | ${30719}    | ${undefined}     | ${8}
      ${102399}   | ${61439}    | ${undefined}     | ${7}
      ${204799}   | ${122879}   | ${undefined}     | ${6}
      ${409599}   | ${245759}   | ${undefined}     | ${5}
      ${819199}   | ${491519}   | ${undefined}     | ${4}
      ${1638399}  | ${983039}   | ${undefined}     | ${3}
      ${3276799}  | ${1966079}  | ${undefined}     | ${2}
      ${6553599}  | ${3932159}  | ${undefined}     | ${1}
      ${13107199} | ${7864319}  | ${undefined}     | ${0}
      ${23107199} | ${8864319}  | ${undefined}     | ${DEFAULT_ZOOM}
      ${23107199} | ${8864319}  | ${15}            | ${15}
    `(
      '$value should be converted to $expected',
      ({ widthRatio, heightRatio, zoomValueDefault, expected }) => {
        expect(getZoomValue(widthRatio, heightRatio, zoomValueDefault)).toEqual(expected);
      },
    );
  });
});
