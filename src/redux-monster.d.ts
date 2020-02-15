import { PickExtends } from "kaphein-js";
import { ReduxReducer } from "./redux-reducer";

declare interface ReduxMonster<S = any, T = any, A = any, R = any, P = any>
{
    name : string;

    ownStateKey : string;

    initialState : S;

    actionTypePrefix : string;

    actionTypes : T;

    actionCreators : A;

    reducer : ReduxReducer<S>;

    selectors? : PickExtends<R, (state : any, ...args : any[]) => any>;

    ownProperty? : P;
}

export {
    ReduxMonster,
};
