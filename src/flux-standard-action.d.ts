export declare interface FluxStandardAction<P = any, M = any>
{
    type : string;

    payload? : P;

    error? : boolean;

    meta? : M;
}
