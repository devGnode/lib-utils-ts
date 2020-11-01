export declare module flombok {
    type accessorGetFunc<T> = () => T;
    type accessorSetFunc<T> = (value: T) => void;
    type getStringFunc = accessorGetFunc<string>;
    type getNumberFunc = accessorGetFunc<number>;
    type getObjectFunc = accessorGetFunc<object>;
    type getBooleanFunc = accessorGetFunc<boolean>;
    type getStringFuncA = accessorGetFunc<String>;
    type getNumberFuncA = accessorGetFunc<Number>;
    type getObjectFuncA = accessorGetFunc<Object>;
    type getBooleanFuncA = accessorGetFunc<Boolean>;
    type setStringFunc = accessorSetFunc<string>;
    type setNumberFunc = accessorSetFunc<number>;
    type setObjectFunc = accessorSetFunc<object>;
    type setBooleanFunc = accessorSetFunc<boolean>;
    type setStringFuncA = accessorSetFunc<String>;
    type setNumberFuncA = accessorSetFunc<Number>;
    type setObjectFuncA = accessorSetFunc<Object>;
    type setBooleanFuncA = accessorSetFunc<Boolean>;
    function GETTER<T>(readOnly?: boolean): (target: any, key: string) => void;
    function SETTER<T>(readOnly?: boolean): (target: any, key: string) => void;
}
