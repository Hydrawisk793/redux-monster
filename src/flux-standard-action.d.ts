declare interface FluxStandardAction<P = any, M = any, T extends string = string>
{
    type : T;

    payload? : P;

    error? : boolean;

    meta? : M;
}

export {
    FluxStandardAction,
};
