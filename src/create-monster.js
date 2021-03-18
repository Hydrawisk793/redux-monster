var kapheinJsCollection = require("kaphein-js-collection");
var StringKeyMap = kapheinJsCollection.StringKeyMap;

module.exports = (function ()
{
    /**
     *  @template N, K, C, O, R, A, S
     *  @typedef {import("./create-monster").MonsterCreatorParam<N, K, C, O, R, A, S>} MonsterCreatorParam
     */
    /**
     *  @template N, K, O, R, A, S
     *  @typedef {import("./redux-monster").ReduxMonster<N, K, O, R, A, S>} ReduxMonster
     */
    /**
     *  @template O
     *  @typedef {import("./redux-monster").ReduxReducer<O>} ReduxReducer
     */

    var _slice = Array.prototype.slice;

    /**
     *  @template N, K, C, O, R, A, S
     *  @param {MonsterCreatorParam<N, K, C, O, R, A, S>} param
     */
    function createMonster(param)
    {
        /**
         *  @type {ReduxMonster<N, K, O, R, A, S>}
         */
        var monster = {
            name : param.name,
            ownStateKey : (param.ownStateKey || param.name),
            initialState : (
                "undefined" === typeof param.initialState
                    ? null
                    : param.initialState
            ),
            actionTypes : null,
            reducer : null,
            reducers : (
                new StringKeyMap(Object
                    .entries(param.reducers || {})
                    .map(function (pair)
                    {
                        var reducer = pair[1];

                        return (
                            "function" === typeof reducer
                                ? [pair[0], reducer]
                                : null
                        );
                    })
                    .filter(function (pair)
                    {
                        return !!pair;
                    })
                ).toRecord()
            ),
            actionCreators : null,
            selectors : null
        };

        var context = Object.assign(
            {
                monster : monster
            },
            param.context
        );

        monster.actionTypes = Object.keys(monster.reducers).reduce(function (acc, key)
        {
            acc[key] = key;

            return acc;
        }, {});

        monster.reducer = _composeReducers(monster.reducers, param.initialState);

        monster.actionCreators = new StringKeyMap(Object
            .entries(param.actionCreatorFactories || {})
            .map(function (pair)
            {
                var funcGen = pair[1];
                var func = ("function" === typeof funcGen ? funcGen(context) : null);

                return (
                    "function" === typeof func
                        ? [pair[0], func]
                        : null
                );
            })
            .filter(function (pair)
            {
                return !!pair;
            })
        ).toRecord();

        monster.selectors = new StringKeyMap(Object
            .entries(param.selectorFactories || {})
            .map(function (pair)
            {
                var selFact = pair[1];
                var sel = ("function" === typeof selFact ? selFact(context) : null);
                var finalSel = (
                    "function" === typeof sel
                        ? function (state)
                        {
                            return sel.apply(void 0, [state[monster.ownStateKey]].concat(_slice.call(arguments, 1)));
                        }
                        : null
                );

                return (
                    "function" === typeof finalSel
                        ? [pair[0], finalSel]
                        : null
                );
            })
            .filter(function (pair)
            {
                return !!pair;
            })
        ).toRecord();

        return monster;
    }

    /**
     *  @template O
     *  @param {Record<string, ReduxReducer<O>>} reducerMap
     *  @param {O} [initialState]
     */
    function _composeReducers(reducerMap)
    {
        /** @type {O} */var initialState = arguments[1];
        if("undefined" === typeof initialState)
        {
            initialState = null;
        }

        return /** @type {ReduxReducer<O>} */(function (state, action)
        {
            var nextState = state;

            var type = action.type;
            if("string" === typeof type)
            {
                var reducer = reducerMap[type];
                if("function" === typeof reducer)
                {
                    nextState = reducer(state, action);
                }
            }

            if("undefined" === typeof nextState)
            {
                nextState = initialState;
            }

            return nextState;
        });
    }

    return {
        createMonster : createMonster
    };
})();
