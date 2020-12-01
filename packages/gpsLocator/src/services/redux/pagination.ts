import { CommonReducerConfig, requestsReducer } from 'redux-saga-requests';
import { AnyAction } from 'redux';
import { get, each, find } from 'lodash';

import { fillDefaults, getDefaultsBySchema } from '../schema/fill-defaults';
import { IJsonSchema } from '../schema/json-schema';

export interface PagedResponse<T> {
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
  content: T[];
}

export function paginationDataUpdate<T>(prevState: any, action: AnyAction, schema: IJsonSchema) {
  const response: PagedResponse<T> = fillDefaults(schema)(action.data);
  const { number, size, totalPages, totalElements, content: newContent } = response;
  if (get(action, 'meta.reset', true)) {
    return {
      ...prevState,
      data: response,
      pending: prevState.pending - 1,
    };
  }
  const content = [...prevState.data.content];
  const prevFirstPosition = get(prevState, 'data.content.length', 0);
  const firstPosition = Math.min(number * size, prevFirstPosition);
  let index = firstPosition;
  each(newContent, (item) => {
    const id = get(item, 'id');
    if (id && !find(content, { id })) {
      content[index] = item;
      index++;
    }
  });
  return {
    ...prevState,
    data: { number, size, totalPages, totalElements, content },
    pending: prevState.pending - 1,
  };
}

export function paginationRequestReducer<T>(
  actionType: string,
  schema: IJsonSchema,
  config: CommonReducerConfig = {},
) {
  return requestsReducer({
    ...config,
    actionType,
    getDefaultData: getDefaultsBySchema(schema),
    onSuccess: (prevState, action) => paginationDataUpdate<T>(prevState, action, schema),
    onError: requestsEmptyReducer,
  });
}

export function requestsEmptyReducer(state: any, action: AnyAction) {
  const pending = get(state, 'pending', 1) - 1;
  return {
    ...state,
    pending,
  };
}
