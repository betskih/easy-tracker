import React, { FunctionComponent, useMemo } from 'react';
import { GeoObject, Map, YMaps } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import {getMapViewParams, getYandexTrack} from '../../services/geoIds/selector';
import { getDefaultState } from './utils';

export enum MapTypes {
  scheme = 'yandex#map',
  satellite = 'yandex#satellite',
  hybrid = 'yandex#hybrid',
}

interface IYandexProps {
  type?: MapTypes;
}

export const Yandex: FunctionComponent<IYandexProps> = ({ type = MapTypes.scheme }) => {
  const strokeColor = useMemo(()=>{
    switch (type) {
      case MapTypes.scheme: return 'b503bbed';
      case MapTypes.satellite: return 'efc006'
      default: return 'e747ff'
    }
  },[type]);
  const track = useSelector(getYandexTrack);
  const viewParams = useSelector(getMapViewParams)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultState = useMemo(() => getDefaultState(track), [viewParams]);
  return (
    <YMaps>
      <Map
        style={{ marginLeft: 0, marginRight: 0, width: '100%' }}
        state={{ ...defaultState, type: type }}
      >
        <GeoObject
          geometry={{
            type: 'LineString',
            coordinates: track,
          }}
          options={{strokeColor, strokeWidth: 3}}
        />
      </Map>
    </YMaps>
  );
};
