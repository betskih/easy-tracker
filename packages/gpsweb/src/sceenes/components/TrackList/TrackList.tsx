import React, { FunctionComponent, useCallback, useState } from 'react';
import { last } from 'lodash';
import { Accordion } from 'semantic-ui-react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { getTrackListSelector } from '../../../services/geoIds/selector';
import './TrackList.scss';
import { getText } from '../../../Constants/constants';

interface ITrackListProps {
  geoId: string;
  isOpened: boolean;
  onPress?: (index: number) => void;
}

export const TrackList: FunctionComponent<ITrackListProps> = ({
  geoId,
  isOpened,
  onPress = () => {},
}) => {
  const tracks = useSelector(getTrackListSelector(geoId));
  const [active, setActive] = useState();
  const handlePress = useCallback(
    (index) => () => {
      onPress(index);
      setActive(index);
    },
    [onPress],
  );
  const monthes: string[] = [];
  return (
    <Accordion.Content active={isOpened} className={'accordion-content'}>
      {tracks.map((track, index) => {
        const start = dayjs(track.startDate);
        const textId = `mon_${start.format('MM')}`;
        const monthTitle = start.format(`DD ${getText(textId)} YYYY`);
        const lastText = last(monthes);
        const spanText = lastText !== monthTitle ? <span>{monthTitle}</span> : null;
        monthes.push(monthTitle);
        const distance =
          track.pathLength > 1000
            ? `${Math.trunc(track.pathLength / 1000)} ${getText('km')} ${
                track.pathLength % 1000
              } ${getText('m')}`
            : `${track.pathLength % 1000} ${getText('m')}`;
        return (
          <>
            {spanText && (
              <span key={`date_${index}`} className={'accordion-content__date'}>
                {spanText}
              </span>
            )}
            <div onClick={handlePress(index)} key={index}>
              <span
                className={
                  active === index ? 'accordion-content__item active' : 'accordion-content__item'
                }
              >
                {`${dayjs(track.startDate).format('HH:mm -')}  ${dayjs(track.endDate).format(
                  'HH:mm',
                )}`}
              </span>
              <span className={'accordion-content__item no-underline'}>{track.pathLength>0 ? distance: ''}</span>
            </div>
          </>
        );
      })}
    </Accordion.Content>
  );
};
