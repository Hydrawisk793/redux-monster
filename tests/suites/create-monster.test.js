const { expect } = require("chai");

const { createMonster }  = require("../../src");
const { FooParam } = require("../monsters/foo");

module.exports = function ()
{
    it("should create a monster", function ()
    {
        /**
         *  @typedef {{
                id : string;

                foo : number;

                bar : boolean;

                baz : string;
            }} Foo
         */

        const monster = createMonster(FooParam);
        expect(monster).to.be.exist;
        expect(monster.initialState).to.deep.equal(FooParam.initialState);
        expect(monster.initialState).to.equal(FooParam.initialState);
    });
};
