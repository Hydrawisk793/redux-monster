const { pick } = require("kaphein-js-object-utils");

module.exports = (function ()
{
    /**
     *  @typedef {import("../../../src").AnyFluxStandardAction} AnyFluxStandardAction
     *  @typedef {import("./initial-state").FooState} FooState
     */

    const reducers = {
        /**
         *  @param {FooState} state
         *  @param {AnyFluxStandardAction} action
         */
        "Foo.onCreated"(state, action)
        {
            let nextState = state;

            const { payload } = action;
            const properties = (payload.properties ? coerceToArray(payload.properties) : []);

            properties.forEach(function (prop)
            {
                const id = prop.id;
                if(!(id in nextState.modelsById))
                {
                    nextState = { ...nextState, };
                    nextState.modelsById = { ...nextState.modelsById, };
                    nextState.modelsById[id] = pick(
                        prop,
                        [
                            "id",
                            "foo",
                            "bar",
                            "baz",
                        ]
                    );
                }
            });

            return nextState;
        },

        /**
         *  @param {FooState} state
         *  @param {AnyFluxStandardAction} action
         */
        "Foo.onUpdated"(state, action)
        {
            let nextState = state;

            const { payload } = action;
            const properties = (payload.properties ? coerceToArray(payload.properties) : []);

            properties.forEach(function (prop)
            {
                const id = prop.id;
                if((id in nextState.modelsById))
                {
                    nextState = { ...nextState, };
                    nextState.modelsById = { ...nextState.modelsById, };
                    nextState.modelsById[id] = {
                        ...nextState.modelsById[id],
                        ...pick(
                            prop,
                            [
                                "foo",
                                "bar",
                                "baz",
                            ]
                        ),
                    };
                }
            });

            return nextState;
        },

        /**
         *  @param {FooState} state
         *  @param {AnyFluxStandardAction} action
         */
        "Foo.onRemoved"(state, action)
        {
            let nextState = state;

            const { payload } = action;
            const ids = (payload.ids ? coerceToArray(payload.ids) : []);

            ids.forEach(function (id)
            {
                if((id in nextState.modelsById))
                {
                    nextState = { ...nextState, };
                    nextState.modelsById = { ...nextState.modelsById, };
                    delete nextState.modelsById[id];
                }
            });

            return nextState;
        },
    }

    /**
     *  @template T
     *  @param {T | T[]} v
     *  @returns {T[]}
     */
    function coerceToArray(v)
    {
        return (Array.isArray(v) ? v : [v]);
    }

    return {
        reducers,
    };
})();
