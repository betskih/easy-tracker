import React, { FunctionComponent, useMemo } from 'react';
import { GeoObject, Map, YMaps } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import { getYandexTrack } from '../../services/geoIds/selector';
import { getDefaultState } from './utils';

interface IYandexProps {}

export const Yandex: FunctionComponent<IYandexProps> = () => {
  const track = useSelector(getYandexTrack);
  const defaultState = useMemo(() => getDefaultState(track), [track]);

  return (
    <YMaps>
      <Map style={{ marginLeft: 0, marginRight: 0, width: '100%' }} state={defaultState}>
        <GeoObject
          geometry={{
            type: 'LineString',
            coordinates: track,
          }}
        />
      </Map>
    </YMaps>
  );
};
