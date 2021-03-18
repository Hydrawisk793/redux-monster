import {
    PickExtends,
    PickReturnTypes,
} from "./type-utils";
import {
    ReduxReducer,
    ReduxActionCreator,
    ReduxSelector,
    ReduxMonster,
} from "./redux-monster";

export declare interface createMonster<
    Name extends string = string,
    OwnStateKey extends string = Name,
    Context = any,
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<Context, OwnState>>
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
    Context = any,
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<Context, OwnState>>
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
    Context = any,
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreatorFactories = Record<string, ActionCreatorFactory<Context>>,
    SelectorFactories = Record<string, SelectorFactory<Context, OwnState>>
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
        ActionCreatorFactory<Context>
    >;

    selectorFactories? : PickExtends<
        SelectorFactories,
        SelectorFactory<Context, OwnState>
    >;
}

export declare type ActionCreatorFactory<
    Context = any
> = (
    context : Context
) => ReduxActionCreator;

export declare type SelectorFactory<
    Context = any,
    OwnState = any
> = (
    context : Context
) => ReduxSelector<OwnState>;
