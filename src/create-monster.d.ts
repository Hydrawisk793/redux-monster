import { ReduxMonsterConstructionOption, ConstructedReduxMonster } from "./redux-monster-construction-option";

declare function createMonster<S, T, P, Pcd, Acm, Sm>(
    option : ReduxMonsterConstructionOption<S, T, P, Pcd, Acm, Sm>
) : ConstructedReduxMonster<S, T, P, Pcd, Acm, Sm>;

export {
    createMonster,
};
