export declare interface FluxStandardAction<
    T extends string = string,
    P = any,
    M = any
>
{
    type : T;

    payload? : P;

    error? : boolean;

    meta? : M;
}

export declare type AnyFluxStandardAction = FluxStandardAction<
    string,
    any,
    any
>;
