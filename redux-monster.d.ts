import { PickExtends } from "./pick-extends";
import { ReduxReducer } from "./redux-reducer";

declare interface ReduxMonster<S = {}, T = {}, A = {}, R = {}, P = {}>
{
    name : string;

    ownStateKey : string;

    initialState : S;

    actionTypePrefix : string;

    actionTypes : T;

    actionCreators : A;

    reducer : ReduxReducer<S>;

    selectors? : PickExtends<R, Function>;

    ownProperty? : P;
}

export {
    ReduxMonster,
};
