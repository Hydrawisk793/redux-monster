declare type PickExtends<S, T> = Pick<S, { [K in keyof S] : (S[K] extends T ? K : never) }[keyof S]>;

export {
    PickExtends,
};
