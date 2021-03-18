import { PickExtends, PickReturnTypes } from "./ts-utils";
import { ReduxReducer, ReduxActionCreator, ReduxSelector, ReduxMonster } from "./redux-monster";

export declare interface createMonster<
    Context = any,
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<OwnState, Context>>
>
{
    (
        param : MonsterCreatorParam<
            Context,
            OwnState,
            Reducers,
            ActionCreatorFactories,
            SelectorFactories
        >
    ) : FactoredMonster<
        Context,
        OwnState,
        Reducers,
        ActionCreatorFactories,
        SelectorFactories
    >;
}

export declare function createMonster<
    Context = any,
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<OwnState, Context>>
>(
    param : MonsterCreatorParam<
        Context,
        OwnState,
        Reducers,
        ActionCreatorFactories,
        SelectorFactories
    >
) : FactoredMonster<
    Context,
    OwnState,
    Reducers,
    ActionCreatorFactories,
    SelectorFactories
>;

export declare type FactoredMonster<
    Context = any,
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<OwnState, Context>>,
> = ReduxMonster<
    OwnState,
    Reducers,
    PickReturnTypes<ActionCreatorFactories>,
    PickReturnTypes<SelectorFactories>
>;

export declare interface MonsterCreatorParam<
    Context = any,
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<OwnState, Context>>,
>
{
    name : string;

    ownStateKey? : string;

    context? : Context;

    initialState? : OwnState;

    reducers? : PickExtends<
        Reducers,
        ReduxReducer<OwnState>
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
