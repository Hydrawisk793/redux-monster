import { PickExtends } from "./ts-utils";
import { FluxStandardAction } from "./flux-standard-action";

export declare interface ReduxMonster<
    OwnState = any,
    Reducers = Record<string, ReduxReducer<OwnState>>,
    ActionCreators = Record<string, ActionCreator>,
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
        ActionCreator
    >;

    selectors : PickExtends<
        Selectors,
        ReduxSelector
    >;
}

export declare type ReduxReducer<S = any, P = any, R = S> = (
    state : S,
    action : FluxStandardAction<P>
) => R;

export declare type ActionCreator = (
    ...args : any[]
) => any;

export declare type ReduxSelector<State = any> = (
    state : State,
    ...args : any[]
) => any;
