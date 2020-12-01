import React, { FunctionComponent, useCallback, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { setNewLocation } from '../../services/geo/actions';
import { getLastArrayList } from '../../services/geo/selector';
import { DashboardView } from './DashBoardView';

const UPDATE_LOCATION_INTERVAL = 10000;

export const Dashboard: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [isRecording, setRecord] = useState(false);
  const [watch, setWatch] = useState(-1);
  const items = useSelector(getLastArrayList);
  const onPressButton = useCallback(() => {
    if (isRecording) {
      Geolocation.clearWatch(watch);
      setRecord(!isRecording);
    } else {
      const newWatch = Geolocation.watchPosition(
        (info) => {
          dispatch(setNewLocation({ timestamp: info.timestamp, coords: info.coords }));
        },
        (e) => {
          // console.log(e);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 20,
          interval: UPDATE_LOCATION_INTERVAL,
          useSignificantChanges: false,
        },
      );
      setWatch(newWatch);
    }
    setRecord(!isRecording);
  }, [isRecording, dispatch, watch]);
  return <DashboardView onPress={onPressButton} isRecording={isRecording} items={items} />;
};
