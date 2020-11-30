import { FluxStandardAction } from "./flux-standard-action";

export declare type ReduxReducer<S = any, P = any, R = S> = (
    state : S,
    action : FluxStandardAction<P>
) => R;
