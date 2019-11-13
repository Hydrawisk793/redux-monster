import { ReduxMonsterRegistry } from "./redux-monster-registry";
import { FluxStandardAction } from "./flux-standard-action";
import { ReduxReducer } from "./redux-reducer";
import { ReduxMonster } from "./redux-monster";
import { PickExtends } from "./pick-extends";

declare interface ReduxMonsterPayloadCreatorDefinition
{
    type : string;

    payloadCreator : (...args : any[]) => any;
}

declare type ConstructedReduxMonsterWithoutActionCreators<S, T, P> = Pick<ReduxMonster<S, PickExtends<T, string>, any, any, P>, Exclude<keyof ReduxMonster<S, PickExtends<T, string>, any, any, P>, "actionCreators">>;

declare type ReduxMonsterActionCreatorMaker<S, T, P> = (monster : ConstructedReduxMonsterWithoutActionCreators<S, T, P>) => (...args : any[]) => (FluxStandardAction | Function);

declare type ConstructedReduxMonster<S, T, Pcd, Acm, P> = ReduxMonster<
    S,
    PickExtends<T, string>,
    (
        { [K in keyof Pcd] : (Pcd[K] extends ReduxMonsterPayloadCreatorDefinition ? (...args : Parameters<Pcd[K]["payloadCreator"]>) => FluxStandardAction<ReturnType<Pcd[K]["payloadCreator"]>> : never) }
        & { [K in keyof Acm] : (Acm[K] extends ReduxMonsterActionCreatorMaker<S, T, P> ? ReturnType<Acm[K]> : never) }
    ),
    {},
    P
>;

declare type ReduxMonsterPayloadCreatorDefinitions = { [ name : string ] : ReduxMonsterPayloadCreatorDefinition };

declare type ReduxMonsterActionCreatorMakers<S, T, P> = { [ name : string ] : ReduxMonsterActionCreatorMaker<S, T, P> };

declare interface ReduxMonsterConstructionOption<
    S = {},
    T = {},
    Pcd = {},
    Acm = {},
    P = {}
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

    ownProperty? : P;

    monsterRegistry? : ReduxMonsterRegistry;
}

export {
    ReduxMonsterPayloadCreatorDefinition,
    ReduxMonsterActionCreatorMaker,
    ReduxMonsterConstructionOption,
    ConstructedReduxMonster,
};
