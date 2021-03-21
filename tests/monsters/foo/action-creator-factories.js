module.exports = (function ()
{
    const actionCreatorFactories = {
        // eslint-disable-next-line no-unused-vars
        "Foo.create" : (context) => (properties) =>
        {
            return {
                type : "Foo.onCreated",
                payload : {
                    properties,
                },
            };
        },
        // eslint-disable-next-line no-unused-vars
        "Foo.update" : (context) => (properties) =>
        {
            return {
                type : "Foo.onUpdated",
                payload : {
                    properties,
                },
            };
        },
        // eslint-disable-next-line no-unused-vars
        "Foo.remove" : (context) => (ids) =>
        {
            return {
                type : "Foo.onRemoved",
                payload : {
                    ids,
                },
            };
        },
    };

    return {
        actionCreatorFactories,
    };
})();
