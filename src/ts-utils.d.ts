export declare type PickExtends<S, T> = Pick<
    S,
    { [ K in keyof S ] : (S[K] extends T ? K : never) }[keyof S]
>;

export declare type PickReturnTypes<S> = {
    [ K2 in ({ [ K in keyof S ] : (S[K] extends (...args : any[]) => any ? K : never) }[keyof S]) ] : ReturnType<S[K2]>;
};
