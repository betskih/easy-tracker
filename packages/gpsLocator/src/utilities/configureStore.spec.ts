import deepFreeze from 'deep-freeze';
import { transformState } from './configureStore';

jest.mock('@react-native-community/async-storage');

const STORE = deepFreeze({
  level1Prop1: {
    level2Prop1: {
      level3Prop1: {
        level4Prop1: [1, 2, 3],
      },
      level3Prop2: 'some value',
    },
    level2Prop2: 123,
  },
  level1Prop2: {
    level2Prop1: {
      level3Prop1: null,
    },
    level2Prop2: 'blablabla',
  },
  level1Prop3: undefined,
});

describe('predefineNestedProperties tests', () => {
  it('should apply changes correctly and return new outboundState (does not change the STORE)', () => {
    const result = transformState(STORE.level1Prop1, 'level1Prop1', {
      level1Prop1: [
        { path: 'level2Prop2', value: 777 },
        { path: 'level2Prop1.level3Prop1.level4Prop1', value: [] },
      ],
    });

    expect(result).toEqual({
      level2Prop1: {
        level3Prop1: {
          level4Prop1: [],
        },
        level3Prop2: 'some value',
      },
      level2Prop2: 777,
    });
    expect(result).not.toEqual(STORE.level1Prop1);
    expect(result).not.toBe(STORE.level1Prop1);
  });

  it('should correctly handle a few branches and does not change the STORE', () => {
    const predefineProps = {
      level1Prop1: [
        { path: 'level2Prop2', value: 777 },
        { path: 'level2Prop1.level3Prop1', value: 'removed nested obj with array' },
      ],
      level1Prop2: [{ path: 'level2Prop1.level3Prop1', value: true }],
      level1Prop3: [{ path: '', value: 'new value' }],
    };
    const result1 = transformState(STORE.level1Prop1, 'level1Prop1', predefineProps);
    const result2 = transformState(STORE.level1Prop2, 'level1Prop2', predefineProps);
    const result3 = transformState(STORE.level1Prop3, 'level1Prop3', predefineProps);

    expect(result1).toEqual({
      level2Prop1: {
        level3Prop1: 'removed nested obj with array',
        level3Prop2: 'some value',
      },
      level2Prop2: 777,
    });
    expect(result1.level1Prop1).not.toEqual(STORE.level1Prop1);
    expect(result1.level1Prop1).not.toBe(STORE.level1Prop1);

    expect(result2).toEqual({
      level2Prop1: {
        level3Prop1: true,
      },
      level2Prop2: 'blablabla',
    });
    expect(result2).not.toEqual(STORE.level1Prop2);
    expect(result2).not.toBe(STORE.level1Prop2);

    expect(result3).toEqual('new value');
    expect(result3).not.toEqual(STORE.level1Prop3);
    expect(result3).not.toBe(STORE.level1Prop3);
  });

  it('should not create new properties if passed path does not exist', () => {
    const result = transformState(STORE.level1Prop1, 'level1Prop1', {
      level1Prop1: [
        { path: 'level2Prop2.notExistProperty', value: 777 },
        { path: 'level2Prop1.notExistProperty.level4Prop1', value: [] },
      ],
    });

    expect(result).toEqual(STORE.level1Prop1);
    expect(result).not.toBe(STORE.level1Prop1);
  });

  it('should set last value if store first level branch is not plain object', () => {
    const result1 = transformState(STORE.level1Prop3, 'level1Prop3', {
      level1Prop3: [{ path: '', value: 10 }],
    });

    expect(result1).toEqual(10);

    const result2 = transformState(STORE.level1Prop3, 'level1Prop3', {
      level1Prop3: [
        { path: '', value: 10 },
        { path: '', value: 20 },
        { path: '', value: 30 },
        { path: 'somePath', value: 40 },
      ],
    });

    expect(result2).toEqual(40);
  });

  it('should return initial state if we pass empty array', () => {
    const result = transformState(STORE.level1Prop1, 'level1Prop1', {
      level1Prop1: [],
    });

    expect(result).toEqual(STORE.level1Prop1);
  });
});
