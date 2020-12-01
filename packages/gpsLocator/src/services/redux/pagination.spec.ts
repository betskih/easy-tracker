import { fillDefaults } from '../schema/fill-defaults';

import { numberSchema, stringSchema } from '../schema/json-schema';
import { pagedSchema } from '../schema/jsend-schema';
import { paginationDataUpdate } from './pagination';
import { IApiActionSuccess } from './ApiAction';

describe('pagination', () => {
  const schemaObj = {
    type: 'object',
    properties: {
      id: numberSchema,
      name: stringSchema,
      folder: stringSchema,
    },
  };

  const backendData = {
    Items: [
      { id: 1, payload: 'payload 1' },
      { id: 2, payload: 'payload 2' },
    ],
    ItemsCount: 4,
    PageSize: 2,
    PageNumber: 1,
    PageCount: 2,
  };

  it('should return object with pagination props', () => {
    const value = fillDefaults(pagedSchema(schemaObj))(backendData);
    expect(value).toEqual({
      Items: backendData.Items,
      ItemsCount: 4,
      PageSize: 2,
      PageNumber: 1,
      PageCount: 2,
    });
  });

  it('pagination should work correctly with PageNumber 1', () => {
    const someFetchingState = { data: { content: [] }, pending: 1 };
    const someActionWithData: Partial<IApiActionSuccess> = {
      type: 'SOME_FETCH_ACTION_SUCCESS',
      data: {
        content: [{ id: 1 }, { id: 2 }],
        number: 0,
        size: 10,
        totalElements: 10,
        totalPages: 1,
      },
    };
    const expectedResult = {
      data: {
        content: [{ id: 1 }, { id: 2 }],
        number: 0,
        size: 10,
        totalElements: 10,
        totalPages: 1,
      },
      pending: 0,
    };
    const recievedResult = paginationDataUpdate<any>(
      someFetchingState,
      someActionWithData as any,
      schemaObj,
    );
    expect(recievedResult).toEqual(expectedResult);
  });

  it('pagination should merged exist data with new one correctly (PageNumber 2)', () => {
    const backendData1 = {
      content: [
        { id: 1, payload: 'payload 1' },
        { id: 2, payload: 'payload 2' },
      ],
      totalElements: 4,
      size: 2,
      number: 0,
      totalPages: 2,
    };
    const backendData2 = {
      content: [
        { id: 3, payload: 'payload 3' },
        { id: 4, payload: 'payload 4' },
      ],
      totalElements: 4,
      size: 2,
      number: 1,
      totalPages: 2,
    };

    const someStateAfterFirstFetch = {
      data: {
        content: backendData.Items,
        totalElements: 4,
        size: 2,
        number: 1,
        totalPages: 2,
      },
      pending: 1,
    };
    const someActionWithData: Partial<IApiActionSuccess> = {
      type: 'SOME_FETCH_ACTION_SUCCESS',
      data: backendData2,
      meta: { reset: false },
    };
    const expectedResult = {
      data: {
        content: [...backendData1.content, ...backendData2.content],
        totalElements: 4,
        size: 2,
        number: 1,
        totalPages: 2,
      },
      pending: 0,
    };
    const recievedResult = paginationDataUpdate<any>(
      someStateAfterFirstFetch,
      someActionWithData as any,
      schemaObj,
    );
    expect(recievedResult).toEqual(expectedResult);
  });
});
