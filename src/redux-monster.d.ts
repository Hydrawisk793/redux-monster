import { PickExtends } from "kaphein-ts-type-utils";

import {
    FluxStandardAction,
    AnyFluxStandardAction,
} from "./flux-standard-action";

export declare interface ReduxMonster<
    Name extends string = string,
    OwnStateKey extends string = Name,
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreators = Record<string, ReduxActionCreator>,
    Selectors = Record<string, ReduxSelector<OwnState>>
>
{
    name : Name;

    ownStateKey : OwnStateKey;

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

export declare type AnyReduxMonster = ReduxMonster<
    string,
    string,
    any,
    Record<string, ReduxReducer<any>>,
    Record<string, ReduxActionCreator>,
    Record<string, ReduxSelector<any>>
>;

export declare type ReduxReducer<
    S = any,
    A extends FluxStandardAction = AnyFluxStandardAction,
    R = S
> = (
    state : S,
    action : A
) => R;

export declare type AnyReduxReducer = ReduxReducer<
    any,
    AnyFluxStandardAction
>;

export declare type ReduxActionCreator = (
    ...args : any[]
) => any;

export declare type ReduxSelector<
    State = any,
    RestArgs extends Array<any> = any[],
    R = any
> = (
    state : State,
    ...args : RestArgs
) => R;
