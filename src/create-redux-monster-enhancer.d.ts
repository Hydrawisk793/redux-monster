import { StoreEnhancerStoreCreator } from "redux";
import { ReduxMonsterRegistry } from "./redux-monster-registry";

export declare function createReduxMonsterEnhancer() : <
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
