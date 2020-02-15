import { FluxStandardAction } from "./flux-standard-action";

declare type ReduxReducer<S = any, P = any> = (
    state : S,
    action : FluxStandardAction<P>
) => S;

export {
    ReduxReducer,
};
