import { Assign, ExtractExtends, PickExtends } from "kaphein-ts-type-utils";

import {
    PickReturnTypes,
} from "./type-utils";
import {
    ReduxReducer,
    ReduxActionCreator,
    ReduxSelector,
    ReduxMonster,
    AnyReduxMonster,
    AnyReduxSelector,
} from "./redux-monster";
import {
    ReduxMonsterRegistry,
} from "./redux-monster-registry";

export declare interface createMonster<
    Name extends string = string,
    OwnStateKey extends string = Name,
    Context = {},
    OwnState = {},
    Reducers extends Record<string, ReduxReducer<OwnState>> = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories extends Record<
        string,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    > = Record<
        string,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    >,
    SelectorFactories extends Record<
        string,
        SelectorFactory<
            Assign<FactoredReduxMonsterDefaultContext, Context>,
            OwnState
        >
    > = Record<
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
        FactoredReduxSelectorMap<PickReturnTypes<SelectorFactories>>
    >;
}

export declare function createMonster<
    Name extends string = string,
    OwnStateKey extends string = Name,
    Context = {},
    OwnState = {},
    Reducers extends Record<string, ReduxReducer<OwnState>> = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories extends Record<
        string,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    > = Record<
        string,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    >,
    SelectorFactories extends Record<
        string,
        SelectorFactory<
            Assign<FactoredReduxMonsterDefaultContext, Context>,
            OwnState
        >
    > = Record<
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
    FactoredReduxSelectorMap<PickReturnTypes<SelectorFactories>>
>;

export declare interface MonsterCreatorParam<
    Name extends string = string,
    OwnStateKey extends string = Name,
    Context = {},
    OwnState = {},
    Reducers extends Record<string, ReduxReducer<OwnState>> = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories extends Record<
        string,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    > = Record<
        string,
        ActionCreatorFactory<Assign<FactoredReduxMonsterDefaultContext, Context>>
    >,
    SelectorFactories extends Record<
        string,
        SelectorFactory<
            Assign<FactoredReduxMonsterDefaultContext, Context>,
            OwnState
        >
    > = Record<
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

    reducers? : Reducers;

    actionCreatorFactories? : ActionCreatorFactories;

    selectorFactories? : SelectorFactories;
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

export declare type FactoredReduxSelectorMap<
    Selectors = Record<string, AnyReduxSelector>,
    ReduxStoreState = any
> = Omit<
    {
        [K in keyof Selectors] : (
            Selectors[K] extends ReduxSelector<infer S, infer RestArgs, infer R>
                ? ReduxSelector<ReduxStoreState, RestArgs, R>
                : never
        );
    },
    never
>;
