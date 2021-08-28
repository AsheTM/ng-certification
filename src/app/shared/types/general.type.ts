
export type TKeyValue<T = string, U = any> = {
    key:    T;
    value:  U;
};

export type TNestedPartial<T> = {
    [K in keyof T]?: T extends Array<infer R> ? Array<TNestedPartial<R>> : TNestedPartial<T[K]>;
};