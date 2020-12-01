import { convertDegrees } from './converter';

describe('test temperature converter', () => {
  describe('test different possible temperature values', () => {
    it.each`
      value        | mode                               | decimalPartPrecision | expected
      ${25}        | ${convertDegrees.modes.FAHRENHEIT} | ${3}                 | ${77.0}
      ${77}        | ${convertDegrees.modes.CELSIUS}    | ${2}                 | ${25.0}
      ${12}        | ${convertDegrees.modes.FAHRENHEIT} | ${undefined}         | ${53.6}
      ${12}        | ${convertDegrees.modes.FAHRENHEIT} | ${-2}                | ${53.6}
      ${12}        | ${convertDegrees.modes.FAHRENHEIT} | ${3.25}              | ${53.6}
      ${12}        | ${convertDegrees.modes.FAHRENHEIT} | ${0.25}              | ${54}
      ${12}        | ${convertDegrees.modes.FAHRENHEIT} | ${0}                 | ${54}
      ${12}        | ${undefined}                       | ${undefined}         | ${12}
      ${-6}        | ${convertDegrees.modes.CELSIUS}    | ${undefined}         | ${-21.1}
      ${72}        | ${convertDegrees.modes.CELSIUS}    | ${undefined}         | ${22.2}
      ${72}        | ${convertDegrees.modes.CELSIUS}    | ${3}                 | ${22.222}
      ${'72F'}     | ${convertDegrees.modes.CELSIUS}    | ${0}                 | ${22}
      ${'30C'}     | ${convertDegrees.modes.FAHRENHEIT} | ${undefined}         | ${86}
      ${'72.25F'}  | ${convertDegrees.modes.CELSIUS}    | ${2}                 | ${22.36}
      ${'30.7C'}   | ${convertDegrees.modes.FAHRENHEIT} | ${undefined}         | ${87.3}
      ${'a72.25F'} | ${convertDegrees.modes.CELSIUS}    | ${2}                 | ${null}
      ${'a30.7C'}  | ${convertDegrees.modes.FAHRENHEIT} | ${undefined}         | ${null}
      ${''}        | ${convertDegrees.modes.CELSIUS}    | ${undefined}         | ${null}
      ${undefined} | ${convertDegrees.modes.FAHRENHEIT} | ${undefined}         | ${null}
      ${null}      | ${convertDegrees.modes.CELSIUS}    | ${undefined}         | ${null}
      ${NaN}       | ${convertDegrees.modes.FAHRENHEIT} | ${undefined}         | ${null}
      ${100000}    | ${convertDegrees.modes.PRESSURE}   | ${1}                 | ${14.5}
      ${'100000'}  | ${convertDegrees.modes.PRESSURE}   | ${1}                 | ${14.5}
      ${''}        | ${convertDegrees.modes.PRESSURE}   | ${1}                 | ${null}
      ${undefined} | ${convertDegrees.modes.PRESSURE}   | ${1}                 | ${null}
      ${null}      | ${convertDegrees.modes.PRESSURE}   | ${1}                 | ${null}
      ${NaN}       | ${convertDegrees.modes.PRESSURE}   | ${1}                 | ${null}
      ${'13psi'}   | ${convertDegrees.modes.PRESSURE}   | ${1}                 | ${0}
    `(
      '$value should be converted to $expected',
      ({ value, mode, decimalPartPrecision, expected }) => {
        expect(convertDegrees(value, mode, decimalPartPrecision)).toEqual(expected);
      },
    );
  });
});
