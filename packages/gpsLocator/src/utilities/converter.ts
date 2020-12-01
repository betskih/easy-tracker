export enum TemperatureModes {
  CELSIUS = 'CELSIUS',
  FAHRENHEIT = 'FAHRENHEIT',
  PRESSURE = 'PRESSURE',
}

const CELSIUS_COEFF = 5 / 9;
const FAHRENHEIT_COEFF = 1 / CELSIUS_COEFF;
const DELTA = 32;
const DEFAULT_PREICISION = 1;
const PRESSURE_COEFF = (0.0254 * 0.0254) / (0.45359237 * 9.80665);

function roundDecimalPart(value: number, count: number): number {
  const coeff = 10 ** Math.abs(count);

  return Math.round(value * coeff) / coeff;
}

export function convertDegrees(
  value: number,
  mode: TemperatureModes,
  decimalPartPrecision: number = DEFAULT_PREICISION,
): number | null {
  const convertInValue = typeof value === 'number' ? value : parseFloat(value);
  let convertedOutValue = null;

  if (isNaN(convertInValue)) {
    return null;
  }

  switch (mode) {
    case TemperatureModes.CELSIUS:
      convertedOutValue = (convertInValue - DELTA) * CELSIUS_COEFF;
      break;
    case TemperatureModes.FAHRENHEIT:
      convertedOutValue = convertInValue * FAHRENHEIT_COEFF + DELTA;
      break;
    case TemperatureModes.PRESSURE:
      convertedOutValue = convertInValue * PRESSURE_COEFF;
      break;
    default:
      return value;
  }

  return roundDecimalPart(convertedOutValue, Math.trunc(decimalPartPrecision) || 0);
}

convertDegrees.modes = {
  ...TemperatureModes,
};
