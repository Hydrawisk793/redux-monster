export declare type ExtractExtends<S, T> = {
    [ K in keyof S ] : (S[K] extends T ? K : never)
}[keyof S];

export declare type PickExtends<S, T> = Pick<
    S,
    ExtractExtends<S, T>
>;

export declare type PickReturnTypes<S> = {
    [ K in (ExtractExtends<S, (...args : any[]) => any>) ] : ReturnType<S[K]>;
};
