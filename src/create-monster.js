var kapheinJs = require("kaphein-js");
var StringKeyMap = kapheinJs.StringKeyMap;

module.exports = (function ()
{
    var _slice = Array.prototype.slice;

    /**
     *  @template O, R, A, S
     *  @typedef {import("./create-monster").MonsterCreatorParam} MonsterCreatorParam
     */
    /**
     *  @template O, R, A, S
     *  @typedef {import("./redux-monster").ReduxMonster} ReduxMonster
     */
    /**
     *  @typedef {import("./redux-monster").ReduxReducer} AnyReduxReducer
     */

    /**
     *  @template O, R, A, S
     *  @param {MonsterCreatorParam<O, R, A, S>} param
     */
    function createMonster(param)
    {
        var context = param.context;

        /**
         *  @type {ReduxMonster<O, R, A, S>}
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
            actionCreators : (
                new StringKeyMap(Object
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
                ).toRecord()
            ),
            selectors : null
        };

        monster.actionTypes = Object.keys(monster.reducers).reduce(function (acc, key)
        {
            acc[key] = key;

            return acc;
        }, {});

        monster.reducer = _composeReducers(monster.reducers, param.initialState);

        monster.selectors = (
            new StringKeyMap(Object
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
            ).toRecord()
        );

        return monster;
    }

    /**
     *  @param {Record<string, AnyReduxReducer>} reducerMap
     */
    function _composeReducers(reducerMap)
    {
        var initialState = arguments[1];
        if("undefined" === typeof initialState)
        {
            initialState = null;
        }

        return function (state, action)
        {
            var nextState = state;

            var type = action.type;
            if(
                "string" === typeof type
                && type in reducerMap
                && "function" === typeof reducerMap[type]
            )
            {
                nextState = reducerMap[type](state, action);
            }

            if("undefined" === typeof nextState)
            {
                nextState = initialState;
            }

            return nextState;
        };
    }

    return {
        createMonster : createMonster
    };
})();
