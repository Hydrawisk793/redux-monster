import { EventListenable } from "kaphein-js-event-emitter";
import { Store } from "redux";

import { FluxStandardAction } from "./flux-standard-action";
import { ReduxMonster, ReduxReducer } from "./redux-monster";

export declare class ReduxMonsterRegistry implements EventListenable<ReduxMonsterRegistryEventListenerMap>
{
    public static findFromReduxStore(
        reduxStore : Store
    ) : ReduxMonsterRegistry | null;

    public constructor(
        reduxStore : Store,
        option? : ReduxMonsterRegistryOption | null
    );

    public addListener<K extends keyof ReduxMonsterRegistryEventListenerMap>(
        eventName : K,
        listener : ReduxMonsterRegistryEventListenerMap[K]
    ) : this;

    public removeListener<K extends keyof ReduxMonsterRegistryEventListenerMap>(
        eventName : K,
        listener : ReduxMonsterRegistryEventListenerMap[K]
    ) : this;

    public on<K extends keyof ReduxMonsterRegistryEventListenerMap>(
        eventName : K,
        listener : ReduxMonsterRegistryEventListenerMap[K]
    ) : this;

    public once<K extends keyof ReduxMonsterRegistryEventListenerMap>(
        eventName : K,
        listener : ReduxMonsterRegistryEventListenerMap[K]
    ) : this;

    public off<K extends keyof ReduxMonsterRegistryEventListenerMap>(
        eventName : K,
        listener : ReduxMonsterRegistryEventListenerMap[K]
    ) : this;

    public getMonsterNames() : string[];

    public getMonster(
        name : string
    ) : ReduxMonster | null;

    public registerMonster(
        monster : ReduxMonster,
        replaceExistingOne? : boolean
    ) : void;

    public unregisterMonster(
        name : string,
    ) : void;

    public setReducerEnhancer(
        reducerEnhancer : ReduxReducerEnhancer | null
    ) : void;
}

export declare interface ReduxMonsterRegistryOption
{
    reducerEnhancer? : ReduxReducerEnhancer | null;
}

export declare type ReduxReducerEnhancer<
    S = any,
    A extends FluxStandardAction = FluxStandardAction
> = (
    reducer : ReduxReducer<S, A>
) => ReduxReducer<S, A>;

export declare interface ReduxMonsterRegistryEventMap
{
    "monsterRegistered" : {
        source : ReduxMonsterRegistry;

        monster : ReduxMonster;
    };

    "monsterUnregistered" : {
        source : ReduxMonsterRegistry;

        monster : ReduxMonster;
    };
}

export declare type ReduxMonsterRegistryEventListenerMap = {
    [K in keyof ReduxMonsterRegistryEventMap] : (e : ReduxMonsterRegistryEventMap[K]) => void
};
