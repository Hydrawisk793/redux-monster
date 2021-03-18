import { ExtractExtends } from "kaphein-ts-type-utils";

export declare type PickReturnTypes<S> = {
    [ K in (ExtractExtends<S, (...args : any[]) => any>) ] : ReturnType<S[K]>;
};
