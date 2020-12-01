import { PickExtends } from "./ts-utils";
import { FluxStandardAction } from "./flux-standard-action";

export declare interface ReduxMonster<
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreators = Record<string, ReduxActionCreator>,
    Selectors = Record<string, ReduxSelector<OwnState>>
>
{
    name : string;

    ownStateKey : string;

    initialState : OwnState;

    actionTypes : {
        [ K in keyof PickExtends<
            Reducers,
            ReduxReducer<OwnState>
        > ] : K;
    };

    reducer : ReduxReducer<OwnState>;

    reducers : PickExtends<
        Reducers,
        ReduxReducer<OwnState>
    >;

    actionCreators : PickExtends<
        ActionCreators,
        ReduxActionCreator
    >;

    selectors : PickExtends<
        Selectors,
        ReduxSelector<OwnState>
    >;
}

export declare type ReduxReducer<
    S = any,
    P = any,
    R = S
> = (
    state : S,
    action : FluxStandardAction<P>
) => R;

export declare type ReduxActionCreator = (
    ...args : any[]
) => any;

/**
 *  @deprecated Use 'ReduxActionCreator' type instead.
 */
export declare type ActionCreator = (
    ...args : any[]
) => any;

export declare type ReduxSelector<
    State = any
> = (
    state : State,
    ...args : any[]
) => any;
