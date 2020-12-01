import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { formatAppointmentDate, formatDate } from './date';

dayjs.extend(advancedFormat);

// eslint
describe('test formatAppointmentDate function', () => {
  describe('test single date', () => {
    it.each`
      date                                 | template             | expected
      ${new Date('2020-01-01:10:15:20')}   | ${'MMMM Do, h:mm A'} | ${'January 1st, 6:15 AM (UTC)'}
      ${new Date('2020-09-20:18:00')}      | ${'MMMM Do, h:mm A'} | ${'September 20th, 2:00 PM (UTC)'}
      ${new Date('2007-12-25:19:30')}      | ${'MMMM Do, h:mm A'} | ${'December 25th, 3:30 PM (UTC)'}
      ${'1999-03-10'}                      | ${'dddd - MMMM Do'}  | ${'Tuesday - March 9th (UTC)'}
      ${[{ startTime: new Date('2020') }]} | ${'dddd - MMMM Do'}  | ${'Wednesday - January 1st (UTC)'}
      ${[{ startTime: '1999-03-10' }]}     | ${'MMMM Do'}         | ${'March 9th (UTC)'}
    `('$date should be converted to $expected', ({ date, template, expected }) => {
      expect(formatAppointmentDate(date, template)).toEqual(expected);
    });
  });

  describe('test multiple date', () => {
    it('should correctly format dates range', () => {
      expect(
        formatAppointmentDate(
          [
            { startTime: new Date('2020-03-11').toString(), endTime: '' },
            { startTime: new Date('2020-03-15').toString(), endTime: new Date().toString() },
            {
              startTime: new Date('2020-03-05').toString(),
              endTime: new Date('2020-11-11').toString(),
            },
            { startTime: new Date('2020-02-23').toString(), endTime: '' },
          ],
          'MMMM Do',
        ),
      ).toEqual('February 23rd - March 11th (UTC)');
    });

    it('should correctly format date strings range', () => {
      expect(
        formatAppointmentDate(
          [
            { startTime: '2007-08-11:18:20', endTime: '' },
            { startTime: '2007-07-15', endTime: new Date().toString() },
            { startTime: '2011-12-16:10:11:30', endTime: '2020-11-11' },
            { startTime: '2008-02-23:20:00', endTime: '' },
          ],
          'MMMM Do, h:mm A',
        ),
      ).toEqual('July 14th, 7:00 PM - December 16th, 6:11 AM (UTC)');
    });

    it('should correctly format dates with the same day', () => {
      expect(
        formatAppointmentDate(
          [
            { startTime: new Date('2007-08-15:18:20').toString(), endTime: '' },
            { startTime: '2007-08-15:10:20', endTime: new Date().toString() },
            { startTime: '2007-08-15:19:47', endTime: '2020-11-11' },
            { startTime: new Date('2008-08-11:21:00').toString(), endTime: '' },
          ],
          'MMMM Do, h:mm A',
        ),
      ).toEqual('August 15th, 5:20 AM (UTC)');
    });
  });
});

describe('test formatDate function', () => {
  const testDate = 'Wed Oct 14 2020 15:26:45 GMT+0400 (Samara Standard Time)';
  const newYorkTimezone = 'America/New_York';
  const sidneyTimezone = 'Australia/Sydney';

  it('should return empty string if incorrect arguments were passed', () => {
    expect(formatDate(testDate, { iana: '' })).toEqual('');
    expect(formatDate(testDate, { iana: undefined })).toEqual('');
    expect(formatDate(testDate, { iana: null })).toEqual('');
    expect(formatDate('', { iana: newYorkTimezone })).toEqual('');
    expect(formatDate(undefined, { iana: newYorkTimezone })).toEqual('');
    expect(formatDate(null, { iana: newYorkTimezone })).toEqual('');
    expect(formatDate(NaN, { iana: newYorkTimezone })).toEqual('');
    expect(formatDate('4534-44-44T07:26:45-04:00', { iana: newYorkTimezone })).toEqual('');
  });

  it('should correctly convert the different date types with different passed arguments', () => {
    expect(formatDate(testDate, { iana: newYorkTimezone })).toEqual(
      '2020-10-14T07:26:45-04:00 (America/New_York)',
    );
    expect(formatDate(new Date(testDate), { iana: newYorkTimezone })).toEqual(
      '2020-10-14T07:26:45-04:00 (America/New_York)',
    );
    expect(formatDate(dayjs(testDate), { iana: newYorkTimezone })).toEqual(
      '2020-10-14T07:26:45-04:00 (America/New_York)',
    );

    expect(formatDate(testDate, { iana: sidneyTimezone })).toEqual(
      '2020-10-14T22:26:45+11:00 (Australia/Sydney)',
    );
    expect(formatDate(new Date(testDate), { iana: sidneyTimezone })).toEqual(
      '2020-10-14T22:26:45+11:00 (Australia/Sydney)',
    );
    expect(formatDate(dayjs(testDate), { iana: sidneyTimezone })).toEqual(
      '2020-10-14T22:26:45+11:00 (Australia/Sydney)',
    );

    expect(formatDate(testDate, { iana: newYorkTimezone, abbreviation: 'NY' })).toEqual(
      '2020-10-14T07:26:45-04:00 (NY)',
    );
    expect(formatDate(new Date(testDate), { iana: newYorkTimezone, abbreviation: '' })).toEqual(
      '2020-10-14T07:26:45-04:00',
    );
    expect(
      formatDate(dayjs(testDate), { iana: newYorkTimezone, abbreviation: 'Big Apple' }),
    ).toEqual('2020-10-14T07:26:45-04:00 (Big Apple)');

    expect(
      formatDate(testDate, { iana: newYorkTimezone, abbreviation: 'NY' }, 'dddd - MMMM Do, h:mm A'),
    ).toEqual('Wednesday - October 14th, 7:26 AM (NY)');
    expect(
      formatDate(new Date(testDate), { iana: newYorkTimezone, abbreviation: '' }, 'dddd - MMMM Do'),
    ).toEqual('Wednesday - October 14th');
    expect(
      formatDate(
        dayjs(testDate),
        { iana: newYorkTimezone, abbreviation: 'Big Apple' },
        'MMMM Do, HH:mm',
      ),
    ).toEqual('October 14th, 07:26 (Big Apple)');
  });
});
