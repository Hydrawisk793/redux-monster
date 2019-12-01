var handleActions = require("redux-actions").handleActions;

var isUndefinedOrNull = require("../kaphein-js/utils/type-trait").isUndefinedOrNull;
var isString = require("../kaphein-js/utils/type-trait").isString;
var isCallable = require("../kaphein-js/utils/type-trait").isCallable;
var isParameterString = require("../kaphein-js/assert/parameter").isParameterString;
var isParameterNotUndefined = require("../kaphein-js/assert/parameter").isParameterNotUndefined;
var isParameterNotUndefinedNorNull = require("../kaphein-js/assert/parameter").isParameterNotUndefinedNorNull;
var ReduxMonsterRegistry = require("./redux-monster-registry").ReduxMonsterRegistry;

function defaultPayloadCreator(payload)
{
    return payload;
}

/**
 *  @template S, T, P, Pcd, Acm, Sm
 *  @param {import("./redux-monster-construction-option").ReduxMonsterConstructionOption<S, T, P, Pcd, Acm, Sm>} option 
 */
function createMonster(option)
{
    isParameterString("option.name", option.name);
    isParameterNotUndefined("option.initialState", option.initialState);
    isParameterNotUndefinedNorNull("option.actionTypes", option.actionTypes);

    /** @type {import("./redux-monster-construction-option").ConstructedReduxMonster<S, T, P, Pcd, Acm, Sm>} */var monster;
    var isRegistryPresent = option.monsterRegistry instanceof ReduxMonsterRegistry;
    if(isRegistryPresent && option.monsterRegistry.isMonsterRegistered(option.name)) {
        monster = option.monsterRegistry.getMonster(option.name);
    }
    else {
        var actionTypePrefix = option.name + '/';
        var actionTypes = /** @type {typeof monster["actionTypes"]} */ Object.keys(option.actionTypes).reduce(
            function (acc, actionTypeName)
            {
                if(isString(option.actionTypes[actionTypeName])) {
                    acc[actionTypeName] = actionTypePrefix + actionTypeName;
                }

                return acc;
            },
            {}
        );

        monster = {
            name : option.name,

            ownStateKey : ("ownStateKey" in option && isString(option.ownStateKey) ? option.ownStateKey : option.name),

            initialState : option.initialState,

            actionTypePrefix : actionTypePrefix,

            actionTypes : actionTypes,

            actionCreators : /** @type {typeof monster["actionCreators"]} */ (
                "payloadCreatorDefinitions" in option && !isUndefinedOrNull(option.payloadCreatorDefinitions)
                ? Object.keys(option.payloadCreatorDefinitions).reduce(
                    function (acc, pcName)
                    {
                        var def = option.payloadCreatorDefinitions[pcName];

                        if(isString(def.type)) {
                            var prefixedActionType = actionTypePrefix + def.type;
                            var payloadCreator = (
                                ("payloadCreator" in def && isCallable(def.payloadCreator))
                                ? def.payloadCreator
                                : defaultPayloadCreator
                            );

                            acc[pcName] = function ()
                            {
                                return {
                                    type : prefixedActionType,
                                    payload : payloadCreator.apply(null, arguments),
                                };
                            };
                        }

                        return acc;
                    },
                    {}
                )
                : {}
            ),

            reducer : handleActions(
                Object.keys(option.reducers).reduce(
                    function (acc, actionType)
                    {
                        var reducer = option.reducers[actionType];

                        if(isCallable(reducer)) {
                            acc[actionTypePrefix + actionType] = reducer;
                        }

                        return acc;
                    },
                    {}
                ),
                option.initialState
            ),

            selectors : {},

            ownProperty : /** @type {P} */ (
                ("ownProperty" in option) && !isUndefinedOrNull(option.ownProperty)
                ? option.ownProperty
                : {}
            ),
        };

        if("selectorMakers" in option && !isUndefinedOrNull(option.selectorMakers)) {
            Object.entries(option.selectorMakers).reduce(
                function (acc, pair)
                {
                    var sm = pair[1];

                    if(isCallable(sm)) {
                        acc[pair[0]] = sm(monster);
                    }

                    return acc;
                },
                monster.selectors
            );
        }

        if("actionCreatorMakers" in option && !isUndefinedOrNull(option.actionCreatorMakers)) {
            Object.entries(option.actionCreatorMakers).reduce(
                function (acc, pair)
                {
                    var acm = pair[1];

                    if(isCallable(acm)) {
                        acc[pair[0]] = acm(monster);
                    }

                    return acc;
                },
                monster.actionCreators
            );
        }

        if(isRegistryPresent) {
            option.monsterRegistry.registerMonster(monster);
        }
    }

    return monster;
}

export {
    createMonster,
};
