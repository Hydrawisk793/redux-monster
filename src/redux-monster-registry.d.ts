import { EventListenable } from "kaphein-js-event-emitter";
import { Store } from "redux";

import { ReduxMonster } from "./redux-monster";

export declare class ReduxMonsterRegistry implements EventListenable<ReduxMonsterRegistryEventListenerMap>
{
    public static findFromReduxStore(
        reduxStore : Store
    ) : ReduxMonsterRegistry | null;

    public constructor(
        reduxStore : Store
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
}

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
