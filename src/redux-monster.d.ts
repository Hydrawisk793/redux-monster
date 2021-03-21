import { PickExtends } from "kaphein-ts-type-utils";

import {
    FluxStandardAction,
    AnyFluxStandardAction,
} from "./flux-standard-action";

export declare interface ReduxMonster<
    Name extends string = string,
    OwnStateKey extends string = string,
    OwnState = {},
    Reducers extends Record<string, ReduxReducer<OwnState>> = Record<string, ReduxReducer<OwnState>>,
    ActionCreators extends Record<string, ReduxActionCreator> = Record<string, ReduxActionCreator>,
    Selectors extends Record<string, AnyReduxSelector> = Record<string, AnyReduxSelector>
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

    reducers : Reducers;

    actionCreators : ActionCreators;

    selectors : Selectors;
}

export declare type AnyReduxMonster = ReduxMonster<
    string,
    string,
    any,
    Record<string, ReduxReducer<any>>,
    Record<string, ReduxActionCreator>,
    Record<string, AnyReduxSelector>
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
    RestArgs extends Array<any> = Array<any>,
    R = any
> = (
    state : State,
    ...args : RestArgs
) => R;

export declare type AnyReduxSelector = ReduxSelector<
    any,
    Array<any>,
    any
>;
