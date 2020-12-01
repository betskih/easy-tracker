import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Action } from 'redux';

import { ModalType } from '../scenes/Modal/ModalContent';
import { SensorType } from '../components/Sensor/types';
import { ModalNotificationTypes } from '../scenes/Modal/types';
import { TrialContactDto } from '../api/TrialContactDto';
import { IAppRoute } from '../app/actions';
import { SurveyTemplateDto } from '../api/SurveyTemplateDto';
import { INSTRUCTION } from '../scenes/Instruction/types';
import { APPT_MODAL_ROUTES, APPT_ROUTES, AUTH_ROUTES, MODAL_ROUTES, TAB_ROUTES } from './routes';

export interface IIconProps {
  style: {
    container?: StyleProp<ViewStyle>;
    underlineContainer?: StyleProp<ViewStyle>;
    labelContainer?: StyleProp<TextStyle>;
  };
  label?: LabelName;
  underline?: boolean;
}

export interface ILabelProps {
  label: string;
  style?: {
    underline?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
}

export enum LabelName {
  HOME = 'Home',
  CALENDAR = 'Calendar',
  SUPPORT = 'Support',
  SETTINGS = 'Settings',
}

export interface INavigatorTab {
  route: TAB_ROUTES;
  label?: LabelName;
  IconElement: React.ElementType;
  IconElementActive: React.ElementType;
  activeColor: string;
  screen: any;
}

export type AuthStackParamList = {
  [AUTH_ROUTES.WELCOME]: undefined;
  [AUTH_ROUTES.LOGIN]: undefined;
  [AUTH_ROUTES.LOGOUT]: undefined;
  [AUTH_ROUTES.MODAL_NAVIGATOR]: undefined;
  [AUTH_ROUTES.FORBIDDEN]: undefined;
  [AUTH_ROUTES.SOMETHING_WENT_WRONG]: { message?: string; timestamp?: string } | undefined;
};

export interface IModalButton {
  text: string;
  onPress: () => void;
}

export interface IOnCloseModalParams {
  [k: string]: any;
}

export type ModalStackParamList = {
  [MODAL_ROUTES.TAB_NAVIGATOR]: undefined;
  [MODAL_ROUTES.MODAL_MESSAGE]:
    | {
        type?: ModalType;
        message?: string;
        title?: string;
        buttons?: IModalButton[];
        onCloseParams?: IOnCloseModalParams;
        onViewDetails?: IAppRoute;
        confirmAction?: string;
        viewDetailsAction?: string;
        buttonText1?: string;
        buttonText2?: string;
        onButton1?: Action;
        onButton2?: Action;
      }
    | undefined;
  [MODAL_ROUTES.MODAL_NOTIFICATION]:
    | {
        type?: ModalNotificationTypes;
        message?: string;
        title?: string;
        onPress?: () => void;
      }
    | undefined;
  [MODAL_ROUTES.HOME]: undefined;
  [MODAL_ROUTES.UPDATE_SENSOR]: { type: SensorType } | undefined;
  [MODAL_ROUTES.FEEDBACK]: undefined;
  [MODAL_ROUTES.FEEDBACK_EDIT]: { Id?: string } | undefined;
  [MODAL_ROUTES.SCHEDULING_WITH_TIME_SLOT]: { Id?: string };
  [MODAL_ROUTES.SURVEY]: {
    taskId: string;
    type: SurveyTemplateDto['type'];
    trialId: string;
  };
  [MODAL_ROUTES.SURVEY_QUERY]: { screenName: string; changeAnswer?: boolean } | undefined;
  [MODAL_ROUTES.SURVEY_SUMMARY]: undefined;
  [MODAL_ROUTES.LOADING]: undefined;
  [MODAL_ROUTES.EXIT_INSTRUCTIONS]: undefined;
  [MODAL_ROUTES.SUPPORT_REQUEST]: { contact?: TrialContactDto } | undefined;
  [MODAL_ROUTES.INSTRUCTION]: { type?: INSTRUCTION } | undefined;
  [MODAL_ROUTES.RESCHEDULE_REASON]: { id?: string } | undefined;
  [MODAL_ROUTES.REQUEST_REASON]: { id?: string } | undefined;
};
