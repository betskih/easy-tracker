import { useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { OS_ANDROID, OS_WEB } from '../constants/constants';

export function useSelectorFactory<TState, TSelected>(
  selectorFactory: (...args: any[]) => (state: TState) => TSelected,
  ...args: any[]
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useSelector(useMemo(() => selectorFactory(...args), [selectorFactory, ...args]));
}

export function useAnimated() {
  if (Platform.OS !== OS_WEB) {
    if (Platform.OS === OS_ANDROID && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }
}

export function useTimeout(
  callback: Function,
  delay: number,
): { start: () => void; clean: () => void } {
  const countId = useRef<number | undefined>();

  useEffect(() => {
    return () => {
      if (countId.current) {
        clearTimeout(countId.current);
        countId.current = undefined;
      }
    };
  }, []);
  return {
    start: useCallback(() => {
      if (countId.current) {
        clearTimeout(countId.current);
      }
      countId.current = setTimeout(callback, delay);
    }, [delay, callback]),
    clean: useCallback(() => {
      if (countId.current) {
        clearTimeout(countId.current);
        countId.current = undefined;
      }
    }, []),
  };
}
