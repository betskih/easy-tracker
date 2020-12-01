import { each, keys, pick } from 'lodash/fp';
import { Action, AnyAction, combineReducers } from 'redux';
// import { CommonReducerConfig, requestsReducer } from 'redux-saga-requests';

// import { fillDefaults, getDataBySchema, getDefaultsBySchema } from '../schema/fill-defaults';
// import { IJsonSchema } from '../schema/json-schema';

export type BaseReducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A,
  rootState?: any,
) => S;

export type BaseInitReducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A,
  rootState?: any,
) => S;

export type BaseReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: BaseReducer<S[K], A>;
};

export function pipeReducers<S, A extends Action>(
  ...reducers: Array<BaseReducer<S, A>>
): BaseInitReducer<S, A> {
  return (pState: S | undefined, action: A, rootState?: any): S => {
    let state = pState;
    each((reducer: BaseInitReducer<S, A>) => {
      state = reducer(state, action, rootState);
    })(reducers);
    return state as S;
  };
}

export function combinePartialReducers<S, A extends Action>(
  reducers: BaseReducersMapObject<any, A>,
): BaseReducer<S, A> {
  const baseKeys = keys(reducers);
  const reducer = combineReducers(reducers);
  const pickByKeys = pick(baseKeys);
  return (state: S, action: A, rootState?: any) => {
    const partialState = pickByKeys(state) as S;
    const newState = reducer(partialState, action);
    if (newState !== partialState) {
      return {
        ...state,
        ...newState,
      };
    }
    return state;
  };
}

export function defaultReducerWithInitial<S, A extends Action>(
  reducer: BaseReducer<S, A>,
  initialState: S,
): BaseInitReducer<S, A> {
  return (state: S | undefined, action: A): S => {
    const State = state || initialState;
    return reducer(State, action);
  };
}

export function defaultReducer<S, A extends Action>(initialState: S): BaseInitReducer<S, A> {
  return (state: S | undefined, action: A): S => {
    return state || initialState;
  };
}

export const emptyReducer = <S, A extends Action>(state: S, action: A): S => state;

export interface ApiState<T> {
  data: T;
  error: null | {};
  pending: number;
}

export const defaultApiState = <T>(data: T): ApiState<T> => {
  return {
    data,
    error: null,
    pending: 0,
  };
};

// export function getDefaultApiState<T>(schema: IJsonSchema, obj: {} = {}): ApiState<T> {
//   return defaultApiState<T>(fillDefaults(schema)(obj));
// }
//
// export function apiRequestReducer(
//   actionType: string,
//   schema: IJsonSchema,
//   config: CommonReducerConfig = {},
// ) {
//   return requestsReducer({
//     ...config,
//     actionType,
//     getDefaultData: getDefaultsBySchema(schema),
//     getData: getDataBySchema(schema),
//   });
// }

export interface PaginationStatus {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
