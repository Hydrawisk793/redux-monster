var createMonster = require("./create-monster");
var reduxMonsterRegistry = require("./redux-monster-registry");
var createReduxMonsterEnhancer = require("./create-redux-monster-enhancer");

module.exports = Object.assign(
    {},
    createMonster,
    reduxMonsterRegistry,
    createReduxMonsterEnhancer
);
