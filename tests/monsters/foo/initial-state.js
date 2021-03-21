module.exports = (function ()
{
    /**
     *  @typedef {import("./foo").Foo} Foo
     */

    const initialState = {
        /** @type {Record<Foo["id"], Foo>} */modelsById : {},
    };

    return {
        initialState,
    };
})();
