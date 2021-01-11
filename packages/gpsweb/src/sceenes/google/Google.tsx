import React, { FunctionComponent, useEffect, useState } from 'react';

import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { createScriptLoader } from '@bigcommerce/script-loader';

const MapWithAMarker = withGoogleMap(() => (
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: 56.8613653, lng: 53.2278155 }}>
    <Marker position={{ lat: 56.844, lng: 53.22 }} />
    <Polyline
      path={[
        { lat: 56.8452266, lng: 53.2228163 },
        { lat: 56.8450602, lng: 53.2229727 },
        { lat: 56.8448208, lng: 53.2207116 },
        { lat: 56.8447727, lng: 53.2203614 },
        { lat: 56.8452163, lng: 53.2197015 },
        { lat: 56.8456042, lng: 53.2196293 },
        { lat: 56.845706, lng: 53.219342 },
        { lat: 56.8468919, lng: 53.2192242 },
        { lat: 56.8476058, lng: 53.2190961 },
        { lat: 56.8482468, lng: 53.2188917 },
        { lat: 56.8486952, lng: 53.21858 },
      ]}
    />
  </GoogleMap>
));

interface IGoogleProps {}

export const Google: FunctionComponent<IGoogleProps> = () => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const loader = createScriptLoader();
    loader
      .loadScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDnhakyY9L3pkj-oW9RuxphlvX2M8sVXnc',
      )
      .then(() => {
        setLoaded(true);
      });
  }, []);

  return isLoaded ? (
    <MapWithAMarker
      containerElement={<div style={{ width: '1000', height: '800' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  ) : null;
};
