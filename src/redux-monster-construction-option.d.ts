import { ReduxMonsterRegistry } from "./redux-monster-registry";
import { FluxStandardAction } from "./flux-standard-action";
import { ReduxReducer } from "./redux-reducer";
import { ReduxMonster } from "./redux-monster";
import { PickExtends } from "kaphein-js";

declare interface ReduxMonsterPayloadCreatorDefinition
{
    type : string;

    payloadCreator : (...args : any[]) => any;
}

declare type IncompletelyConstructedReduxMonster<S, T, P> = Pick<
    ReduxMonster<
        S,
        PickExtends<T, string>,
        {},
        {},
        P
    >,
    Exclude<keyof ReduxMonster<S, PickExtends<T, string>, {}, {}, P>, "actionCreators"|"selectors">
>;

declare type ReduxMonsterActionCreatorMaker<S, T, P> = (monster : IncompletelyConstructedReduxMonster<S, T, P>) => (...args : any[]) => (FluxStandardAction | Function);

declare type ReduxMonsterSelectorMaker<S, T, P> = (monster : IncompletelyConstructedReduxMonster<S, T, P>) => (rootState : any, ...args : any[]) => any;

declare type ConstructedReduxMonster<S, T, P, Pcd, Acm, Sm> = ReduxMonster<
    S,
    PickExtends<T, string>,
    (
        {
            [ K in keyof Pcd ] : (
                Pcd[K] extends ReduxMonsterPayloadCreatorDefinition
                ? (...args : Parameters<Pcd[K]["payloadCreator"]>) => FluxStandardAction<ReturnType<Pcd[K]["payloadCreator"]>>
                : never
            )
        }
        & {
            [ K in keyof Acm ] : (
                Acm[K] extends ReduxMonsterActionCreatorMaker<S, T, P>
                ? ReturnType<Acm[K]>
                : never
            )
        }
    ),
    {
        [ K in keyof Sm ] : (
            Sm[K] extends ReduxMonsterSelectorMaker<S, T, P>
            ? ReturnType<Sm[K]>
            : never
        )
    },
    P
>;

declare type ReduxMonsterPayloadCreatorDefinitions = Record<string, ReduxMonsterPayloadCreatorDefinition>;

declare type ReduxMonsterActionCreatorMakers<S, T, P> = Record<string, ReduxMonsterActionCreatorMaker<S, T, P>>;

declare type ReduxMonsterSelectorMakers<S, T, P> = Record<string, ReduxMonsterSelectorMaker<S, T, P>>;

declare interface ReduxMonsterConstructionOption<
    S = any,
    T = any,
    P = any,
    Pcd = any,
    Acm = any,
    Sm = any,
>
{
    name : string;

    ownStateKey? : string;

    initialState : S;

    actionTypePrefix? : string;

    actionTypes : T;

    payloadCreatorDefinitions? : Pcd extends ReduxMonsterPayloadCreatorDefinitions ? Pcd : ReduxMonsterPayloadCreatorDefinitions;

    actionCreatorMakers? : Acm extends ReduxMonsterActionCreatorMakers<S, T, P> ? Acm : ReduxMonsterActionCreatorMakers<S, T, P>;

    reducers? : Record<string, ReduxReducer<S>>;

    selectorMakers? : Sm extends ReduxMonsterSelectorMakers<S, T, P> ? Sm : ReduxMonsterSelectorMakers<S, T, P>;

    ownProperty? : P;

    monsterRegistry? : ReduxMonsterRegistry;
}

export {
    ReduxMonsterPayloadCreatorDefinition,
    ReduxMonsterActionCreatorMaker,
    ReduxMonsterConstructionOption,
    ConstructedReduxMonster,
};
