import { CurriedFunction2, CurriedFunction3 } from 'lodash';

interface ValueMap {
  value: any;
  map: (val?: any) => any;
}

type MapFunc = (target: any) => any;
type LensFunc = (valueMap: ValueMap) => MapFunc;

declare function lens(getter: (obj: any) => any, setter: (obj: any, val: any) => any): LensFunc;

// lens operators
// declare function view(lens: LensFunc, target: any): any;
declare const view: CurriedFunction2<LensFunc, any, any>;

// declare function over(lens: LensFunc, func: MapFunc, target: any): any;
declare const over: CurriedFunction3<LensFunc, MapFunc, any, any>;

// declare function merge(lens: LensFunc, newVal: any, target: any): any;
declare const merge: CurriedFunction3<LensFunc, any, any, any>;

// declare function replace(lens: LensFunc, newVal: any, target: any): any;
declare const replace: CurriedFunction3<LensFunc, any, any, any>;

// predefined lenses
type PathIndex = string | number;
type TPath = string | PathIndex[];

declare function pathLens(path?: TPath): LensFunc;

type Predicate = (obj: any) => boolean;
type FindProps = string | PathIndex[] | Predicate | { [k: string]: any };
declare function findLens(props: FindProps): LensFunc;

declare function pickLens(props: TPath, ...rest: any[]): LensFunc;
