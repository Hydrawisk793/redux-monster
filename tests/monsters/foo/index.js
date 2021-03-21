const { initialState } = require("./initial-state");
const { reducers } = require("./reducers");
const { actionCreatorFactories } = require("./action-creator-factories");

module.exports = (function ()
{
    const FooParam = {
        name : "Foo",
        initialState,
        reducers,
        actionCreatorFactories,
    };

    return {
        FooParam,
    };
})();
