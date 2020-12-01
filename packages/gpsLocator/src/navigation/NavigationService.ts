import { noop } from 'lodash';
import { StackActions, CommonActions } from '@react-navigation/native';

let _navigator: any = {
  dispatch: noop,
};

export function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

export function navigate(name: string, params?: { [key: string]: any }, key?: string) {
  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
      key,
    }),
  );
}

export function replace(name: string, params?: { [key: string]: any }) {
  _navigator.dispatch(StackActions.replace(name, params));
}

export function back() {
  _navigator.dispatch(CommonActions.goBack());
}
