import { ReduxMonster } from "./redux-monster";
import { ReduxReducer } from "./redux-reducer";

declare namespace ReduxMonsterRegistry
{
    interface Event
    {
        source : ReduxMonsterRegistry,

        operation : string,

        monster : ReduxMonster,
    }
}

declare class ReduxMonsterRegistry
{
    public constructor();

    public addEventListener(
        eventName : string,
        listener : (e : ReduxMonsterRegistry.Event) => void
    ) : void;

    public removeEventListener(
        eventName : string,
        listener : (e : ReduxMonsterRegistry.Event) => void
    ) : void;

    public getReducerMap() : Record<string, ReduxReducer>;

    public isMonsterRegistered(
        name : string
    ) : boolean;

    public getMonster<S, T, A, R, P>(
        name : string
    ) : ReduxMonster<S, T, A, R, P>;

    public registerMonster(
        reduxModule : ReduxMonster,
        replaceExistingOne? : boolean
    ) : ReduxMonster;

    public unregisterMonster(
        name : string,
    ) : ReduxMonster;
}

export {
    ReduxMonsterRegistry,
};
