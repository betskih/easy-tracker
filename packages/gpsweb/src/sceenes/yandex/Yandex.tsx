import React, { FunctionComponent } from 'react';
import { YMaps, Map, GeoObject } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import { getYandexTrack } from '../../services/geoIds/selector';

interface IYandexProps {}

export const Yandex: FunctionComponent<IYandexProps> = () => {
  const track = useSelector(getYandexTrack);
  return (
    <YMaps>
      <Map
        style={{ marginLeft: 0, marginRight: 0, width: '100%' }}
        defaultState={{ center: [56.8613653, 53.2278155], zoom: 13 }}
      >
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
