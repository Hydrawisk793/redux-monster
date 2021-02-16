import { StoreEnhancerStoreCreator } from "redux";
import { ReduxMonsterRegistry, ReduxMonsterRegistryOption } from "./redux-monster-registry";

export declare function createReduxMonsterEnhancer(
    registryOption? : ReduxMonsterRegistryOption | null
) : <
    Ext = any,
    StoreExt = any
>(
    next : StoreEnhancerStoreCreator<Ext, StoreExt>
) => StoreEnhancerStoreCreator<
    Ext & {
        getMonsterRegistry : () => ReduxMonsterRegistry;
    },
    StoreExt
>;
