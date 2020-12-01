import { Platform } from 'react-native';
import { OS_ANDROID, OS_IOS } from '../constants/constants';

export const testId =
  Platform.OS === OS_ANDROID
    ? (id: string) => ({ accessible: true, accessibilityLabel: id })
    : Platform.OS === OS_IOS
    ? (id: string) => ({ testID: id })
    : (id: string) => ({ 'data-testid': id });
