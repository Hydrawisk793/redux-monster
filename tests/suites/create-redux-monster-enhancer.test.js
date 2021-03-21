const { expect } = require("chai");
const { createStore } = require("redux");

const {
    createReduxMonsterEnhancer,
    ReduxMonsterRegistry,
} = require("../../src");

module.exports = function ()
{
    it("should create an enhancer.", function ()
    {
        const enhancer = createReduxMonsterEnhancer();
        expect(enhancer).to.be.a("function");
    });

    it("should enhance a redux store.", function ()
    {
        const store = createStore(
            (state) => state,
            createReduxMonsterEnhancer()
        );
        expect(ReduxMonsterRegistry.findFromReduxStore(store)).to.be.exist;
    });
};
