// 'path' can include nested properties separating by dot ('.'), like property.nestedProperty.moreNestedProperty
import { createTransform } from 'redux-persist';
import { cloneDeep, set, has, isPlainObject, last } from 'lodash';

interface IPropertyDefineObj {
  path: string;
  value: any;
}
interface IPartialStoreDescription {
  [branchName: string]: IPropertyDefineObj[];
}

export const transformState = (
  state: any,
  key: string | number,
  branches: IPartialStoreDescription,
): any => {
  if (!(key in branches)) {
    return state;
  }

  // if state's first level branch isn't an object we return last value from the args
  if (!isPlainObject(state)) {
    const lastDefinition = last(branches[key]);

    return lastDefinition ? lastDefinition.value : state;
  }

  const newState = cloneDeep(state);

  branches[key].forEach(({ path, value }: IPropertyDefineObj) => {
    if (has(newState, path)) {
      set(newState, path, value);
    }
  });

  return newState;
};

/**
 * Defines properties in the persisted branches before the rehydrating.
 * @param branches {IPartialStoreDescription} - 'path' property can include nested properties separating by dot ('.'), like property.nestedProperty.moreNestedProperty
 */
export const predefineNestedProperties = (branches: IPartialStoreDescription) => {
  return createTransform(
    (inboundState: any) => inboundState,
    (outboundState: any, key: string | number) => transformState(outboundState, key, branches),
    { whitelist: Object.keys(branches) },
  );
};
