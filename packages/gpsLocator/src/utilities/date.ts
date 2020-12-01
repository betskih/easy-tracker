import { sortBy, findIndex } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AppointmentSlotDto } from '../api/AppointmentSlotDto';
import { TimezoneDto } from '../api/TimezoneDto';

dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const FORMAT_ERROR_MESSAGE = 'Unable to localize the date';
const DEFAULT_TIMEZONE_PREFRENCES = {
  iana: 'UTC',
};

function getCorrectDate2Convert(date: Dayjs | Date | string): Dayjs | Date | string {
  if (date instanceof dayjs || date instanceof Date) {
    return date;
  }

  return dayjs(date);
}

export function formatDate(
  date: Date | Dayjs | string,
  timezonePreferences: Partial<TimezoneDto>,
  formatTemplate?: string,
): string {
  const { iana, abbreviation } = timezonePreferences;
  const currentAbbreviation = abbreviation ?? iana;

  const isValid = dayjs(date).isValid();
  if (!isValid) {
    return '';
  }

  if (!date || !iana) {
    return '';
  }

  // we need to pass days object or date object as first .tz() argument instead of string,
  // otherwise next transform like .toString or .format(template) will return incorrect date
  const correctTzDateArg = getCorrectDate2Convert(date);
  const formattedDate: Dayjs | string = dayjs(correctTzDateArg).tz(iana);

  // we need to call .format(template || '') function for correct local time representing,
  // otherwise dayjsObj.toString() will return incorrect result
  const formattedDateString = formattedDate.format(formatTemplate).replace('GMT', '').trim();

  return currentAbbreviation
    ? `${formattedDateString} (${currentAbbreviation})`
    : formattedDateString;
}

export function formatAppointmentDate(
  date: string | AppointmentSlotDto[],
  formatTemplate: string,
  timezonePreferences: Partial<TimezoneDto> = DEFAULT_TIMEZONE_PREFRENCES,
): string {
  if (Array.isArray(date)) {
    const sortedSlots = sortBy(date, 'startTime');

    const isValid = findIndex(sortedSlots, ({ startTime }) => !dayjs(startTime).isValid()) === -1;
    if (!isValid) {
      return '';
    }

    const rangeStart = dayjs(sortedSlots[0].startTime);
    const rangeEnd = dayjs(sortedSlots[sortedSlots.length - 1].startTime);

    // if all timeslots have the same day, we format only this day
    if (rangeStart.get('date') === rangeEnd.get('date')) {
      return formatDate(rangeStart, timezonePreferences, formatTemplate);
    }

    const formattedRangeStart = formatDate(
      rangeStart,
      { ...timezonePreferences, abbreviation: '' },
      formatTemplate,
    );
    const formattedRangeEnd = formatDate(rangeEnd, timezonePreferences, formatTemplate);

    return `${formattedRangeStart} - ${formattedRangeEnd}`;
  }

  return formatDate(date, timezonePreferences, formatTemplate);
}
