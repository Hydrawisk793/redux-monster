export declare type PickExtends<S, T> = {
    [ K2 in { [ K in keyof S ] : (S[K] extends T ? K : never) }[keyof S] ] : S[K2];
};

export declare type PickReturnTypes<S> = {
    [ K2 in { [ K in keyof S ] : (S[K] extends (...args : any[]) => any ? ReturnType<S[K]> : never) }[keyof S] ] : S[K2];
};
