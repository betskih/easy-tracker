import React, { FunctionComponent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Geolocation from 'react-native-geolocation-service';
import { setNewLocation, startRecording, stopRecording } from '../../services/geo/actions';
import { getIsBackground, getLastArrayList } from '../../services/geo/selector';
import { ROUTES } from '../../navigation/RootRouter';
import { DashboardView } from './DashBoardView';

const UPDATE_LOCATION_INTERVAL = 10000;

export const Dashboard: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [isRecording, setRecord] = useState(false);
  const items = useSelector(getLastArrayList);
  const isBackground = useSelector(getIsBackground);
  const [watch, setWatch] = useState(-1);

  const onShowId = useCallback(() => {
    Actions[ROUTES.password]();
  }, []);

  const onPressButton = useCallback(() => {
    if (isRecording) {
      setRecord(false);
      Geolocation.clearWatch(watch);
      dispatch(stopRecording());
      setRecord(!isRecording);
    } else {
      const newWatch = Geolocation.watchPosition(
        (info) => {
          if (!isBackground) {
            dispatch(setNewLocation({ timestamp: info.timestamp, coords: info.coords }));
          }
        },
        (e) => {},
        {
          enableHighAccuracy: true,
          distanceFilter: 20,
          interval: UPDATE_LOCATION_INTERVAL,
          useSignificantChanges: false,
        },
      );
      setWatch(newWatch);
      dispatch(startRecording());
      setRecord(true);
    }
  }, [isRecording, dispatch, isBackground, watch]);

  return (
    <DashboardView
      onPress={onPressButton}
      isRecording={isRecording}
      items={items}
      onShowId={onShowId}
    />
  );
};
