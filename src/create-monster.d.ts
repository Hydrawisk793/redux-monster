import { PickExtends, PickReturnTypes } from "./ts-utils";
import { ReduxReducer, ReduxActionCreator, ReduxSelector, ReduxMonster } from "./redux-monster";

export declare interface createMonster<
    Context = any,
    OwnState = any,
    ReducerFactories = Record<string, ReducerFactory<OwnState, Context>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<OwnState, Context>>
>
{
    (
        param : MonsterCreatorParam<
            Context,
            OwnState,
            ReducerFactories,
            ActionCreatorFactories,
            SelectorFactories
        >
    ) : FactoredMonster<
        Context,
        OwnState,
        ReducerFactories,
        ActionCreatorFactories,
        SelectorFactories
    >;
}

export declare function createMonster<
    Context = any,
    OwnState = any,
    ReducerFactories = Record<string, ReducerFactory<OwnState, Context>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<OwnState, Context>>
>(
    param : MonsterCreatorParam<
        Context,
        OwnState,
        ReducerFactories,
        ActionCreatorFactories,
        SelectorFactories
    >
) : FactoredMonster<
    Context,
    OwnState,
    ReducerFactories,
    ActionCreatorFactories,
    SelectorFactories
>;

export declare type FactoredMonster<
    Context = any,
    OwnState = any,
    ReducerFactories = Record<string, ReducerFactory<OwnState, Context>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<OwnState, Context>>,
> = ReduxMonster<
    OwnState,
    PickReturnTypes<ReducerFactories>,
    PickReturnTypes<ActionCreatorFactories>,
    PickReturnTypes<SelectorFactories>
>;

export declare interface MonsterCreatorParam<
    Context = any,
    OwnState = any,
    ReducerFactories = Record<string, ReducerFactory<OwnState, Context>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<OwnState, Context>>,
>
{
    name : string;

    ownStateKey? : string;

    context? : Context;

    initialState? : OwnState;

    reducerFactories? : PickExtends<
        ReducerFactories,
        ReducerFactory<OwnState, Context>
    >;

    actionCreatorFactories? : PickExtends<
        ActionCreatorFactories,
        ActionCreatorFactory<Context>
    >;

    selectorFactories? : PickExtends<
        SelectorFactories,
        SelectorFactory<OwnState, Context>
    >;
}

export declare type ReducerFactory<
    OwnState = any,
    Context = any
> = (
    context : Context
) => ReduxReducer<OwnState>;

export declare type ActionCreatorFactory<
    Context = any
> = (
    context : Context
) => ReduxActionCreator;

export declare type SelectorFactory<
    OwnState = any,
    Context = any
> = (
    context : Context
) => ReduxSelector<OwnState>;
