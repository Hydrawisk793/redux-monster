import { initialState } from "./initial-state";
import { reducers } from "./reducers";
import { actionCreatorFactories } from "./action-creator-factories";

export declare const FooParam : {
    name : "Foo";

    initialState : typeof initialState;

    reducers : typeof reducers;

    actionCreatorFactories : typeof actionCreatorFactories;
};
