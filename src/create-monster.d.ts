import { Assign, PickExtends } from "kaphein-ts-type-utils";

import {
    PickReturnTypes,
} from "./type-utils";
import {
    ReduxReducer,
    ReduxActionCreator,
    ReduxSelector,
    ReduxMonster,
    AnyReduxMonster,
} from "./redux-monster";
import {
    ReduxMonsterRegistry,
} from "./redux-monster-registry";

export declare interface createMonster<
    Name extends string = string,
    OwnStateKey extends string = Name,
    Context = {},
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<
        string,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    >,
    SelectorFactories = Record<
        string,
        SelectorFactory<
            Assign<FactoredReduxMonsterDefaultContext, Context>,
            OwnState
        >
    >
>
{
    (
        param : MonsterCreatorParam<
            Name,
            OwnStateKey,
            Context,
            OwnState,
            Reducers,
            ActionCreatorFactories,
            SelectorFactories
        >
    ) : ReduxMonster<
        Name,
        OwnStateKey,
        OwnState,
        Reducers,
        PickReturnTypes<ActionCreatorFactories>,
        PickReturnTypes<SelectorFactories>
    >;
}

export declare function createMonster<
    Name extends string = string,
    OwnStateKey extends string = Name,
    Context = {},
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<
        string,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    >,
    SelectorFactories = Record<
        string,
        SelectorFactory<
            Assign<FactoredReduxMonsterDefaultContext, Context>,
            OwnState
        >
    >
>(
    param : MonsterCreatorParam<
        Name,
        OwnStateKey,
        Context,
        OwnState,
        Reducers,
        ActionCreatorFactories,
        SelectorFactories
    >
) : ReduxMonster<
    Name,
    OwnStateKey,
    OwnState,
    Reducers,
    PickReturnTypes<ActionCreatorFactories>,
    PickReturnTypes<SelectorFactories>
>;

export declare interface MonsterCreatorParam<
    Name extends string = string,
    OwnStateKey extends string = Name,
    Context = {},
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<
        string,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    >,
    SelectorFactories = Record<
        string,
        SelectorFactory<
            Assign<FactoredReduxMonsterDefaultContext, Context>,
            OwnState
        >
    >
>
{
    name : Name;

    ownStateKey? : OwnStateKey;

    context? : Context;

    initialState? : OwnState;

    reducers? : PickExtends<
        Reducers,
        ReduxReducer<OwnState>
    >;

    actionCreatorFactories? : PickExtends<
        ActionCreatorFactories,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    >;

    selectorFactories? : PickExtends<
        SelectorFactories,
        SelectorFactory<
            Assign<FactoredReduxMonsterDefaultContext, Context>,
            OwnState
        >
    >;
}

export declare type ActionCreatorFactory<
    Context = Assign<FactoredReduxMonsterDefaultContext, {}>
> = (
    context : Context
) => ReduxActionCreator;

export declare type SelectorFactory<
    Context = Assign<FactoredReduxMonsterDefaultContext, {}>,
    OwnState = any
> = (
    context : Context
) => ReduxSelector<OwnState>;

export declare interface FactoredReduxMonsterDefaultContext
{
    monster : AnyReduxMonster;
}
