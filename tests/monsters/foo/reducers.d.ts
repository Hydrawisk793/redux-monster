import { ReduxReducer } from "../../../src";

import { FooState } from "./initial-state";

export declare const reducers : {
    "Foo.onCreated" : ReduxReducer<FooState>;

    "Foo.onUpdated" : ReduxReducer<FooState>;

    "Foo.onRemoved" : ReduxReducer<FooState>;
};
