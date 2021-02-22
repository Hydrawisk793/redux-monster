var kapheinJs = require("kaphein-js");
var isFunction = kapheinJs.isFunction;
var isUndefinedOrNull = kapheinJs.isUndefinedOrNull;
var isNonNullObject = kapheinJs.isNonNullObject;
var StringKeyMap = kapheinJs.StringKeyMap;
var EventEmitter = require("kaphein-js-event-emitter").EventEmitter;
var combineReducers = require("redux").combineReducers;

module.exports = (function ()
{
    /**
     *  @typedef {import("redux").Store} Store
     */
    /**
     *  @typedef {import("./redux-monster").ReduxMonster} AnyReduxMonster
     *  @typedef {import("./redux-monster").ReduxReducer} AnyReduxReducer
     *  @typedef {import("./redux-monster-registry").ReduxMonsterRegistryEventListenerMap} ReduxMonsterRegistryEventListenerMap
     *  @typedef {import("./redux-monster-registry").ReduxMonsterRegistryOption} ReduxMonsterRegistryOption
     *  @typedef {import("./redux-monster-registry").ReduxReducerEnhancer} AnyReduxReducerEnhancer
     */

    /**
     *  @typedef {{
            name : string;
            monster : AnyReduxMonster;
        }} Registration
     */

    var _emptyAction = { type : "" };

    var _internalActionTypePrefix = "__REDUX_MONSTER_REGISTRY_";
    /**
     *  @readonly
     *  @enum {string}
     */
    var _InternalActionType = {
        "MERGE" : _internalActionTypePrefix + "MERGE",
        "MERGE_NEW_PROPERTIES_ONLY" : _internalActionTypePrefix + "MERGE_NEW_PROPERTIES_ONLY",
        "RESET" : _internalActionTypePrefix + "RESET"
    };

    /**
     *  @readonly
     *  @enum {number}
     */
    var ReduxMonsterRegistryMonsterStateOption = {
        preserve : 0,
        mergeNewPropertiesOnly : 1,
        merge : 2,
        reset : 3
    };

    /**
     *  @constructor
     *  @param {Store} reduxStore
     *  @param {ReduxMonsterRegistryOption | null} [option]
     */
    function ReduxMonsterRegistry(reduxStore)
    {
        /** @type {ReduxMonsterRegistryOption | null} */var option = Object.assign({}, arguments[1]);

        if(isUndefinedOrNull(reduxStore))
        {
            throw new TypeError("'reduxStore' must satisfy \"redux\".Store interface.");
        }

        /** @type {EventEmitter<ReduxMonsterRegistryEventListenerMap>} */this._evtEmt = new EventEmitter({
            xBindThis : false,
            xEmitNewListenerEvent : false,
            xEmitRemoveListenerEvent : false,
            xPreventDuplicateListeners : true,
            xRemoveFirstFoundOne : true
        });
        this._registrations = new StringKeyMap(/** @type {Iterable<[string, Registration]>} */(null));
        /** @type {Store} */this._reduxStore = null;
        /** @type {AnyReduxReducerEnhancer} */this._reducerEnhancer = null;

        this.setReducerEnhancer(option.reducerEnhancer || null);

        _setReduxStore(this, reduxStore);
    }

    ReduxMonsterRegistry.prototype = {
        constructor : ReduxMonsterRegistry,

        addListener : function addListener(eventName, listener)
        {
            this._evtEmt.addListener(eventName, listener);

            return this;
        },

        removeListener : function removeListener(eventName, listener)
        {
            this._evtEmt.removeListener(eventName, listener);

            return this;
        },

        on : function on(eventName, listener)
        {
            this._evtEmt.on(eventName, listener);

            return this;
        },

        once : function once(eventName, listener)
        {
            this._evtEmt.once(eventName, listener);

            return this;
        },

        off : function off(eventName, listener)
        {
            this._evtEmt.off(eventName, listener);

            return this;
        },

        getMonsterNames : function getMonsterNames()
        {
            return this._registrations.map(function (registration)
            {
                return registration.name;
            });
        },

        getMonster : function getMonster(name)
        {
            var registration = this._registrations.get(name);

            return (registration ? registration.monster : null);
        },

        /**
         *  @param {AnyReduxMonster} monster
         *  @param {boolean} [replaceExistingOne]
         *  @param {ReduxMonsterRegistryMonsterStateOption} [monsterStateOption]
         */
        registerMonster : function registerMonster(monster)
        {
            var replaceExistingOne = !!arguments[1];

            var monsterStateOption = arguments[2];
            if(
                !Number.isSafeInteger(monsterStateOption)
                || monsterStateOption < ReduxMonsterRegistryMonsterStateOption.preserve
                || monsterStateOption > ReduxMonsterRegistryMonsterStateOption.reset
            )
            {
                monsterStateOption = ReduxMonsterRegistryMonsterStateOption.preserve;
            }

            var monsterName = monster.name;
            var registration = this._registrations.get(monsterName) || null;

            var shouldRegister = true;
            if(registration)
            {
                if(replaceExistingOne)
                {
                    this.unregisterMonster(monsterName);
                }
                else
                {
                    shouldRegister = registration.monster !== monster;
                }
            }

            if(shouldRegister)
            {
                this._registrations.set(monsterName, {
                    name : monsterName,
                    monster : monster
                });

                _replaceReducer(this);

                switch(monsterStateOption)
                {
                case ReduxMonsterRegistryMonsterStateOption.mergeNewPropertiesOnly:
                    this._reduxStore.dispatch({
                        type : _InternalActionType.MERGE_NEW_PROPERTIES_ONLY,
                        payload : {
                            monsterName : monsterName
                        }
                    });
                    break;
                case ReduxMonsterRegistryMonsterStateOption.merge:
                    this._reduxStore.dispatch({
                        type : _InternalActionType.MERGE,
                        payload : {
                            monsterName : monsterName
                        }
                    });
                    break;
                case ReduxMonsterRegistryMonsterStateOption.reset:
                    this._reduxStore.dispatch({
                        type : _InternalActionType.RESET,
                        payload : {
                            monsterName : monsterName
                        }
                    });
                    break;
                default:
                    // Does nothing.
                }

                this._evtEmt.emit(
                    "monsterRegistered",
                    {
                        source : this,
                        monster : monster
                    }
                );
            }
        },

        unregisterMonster : function unregisterMonster(name)
        {
            var monster = this.getMonster(name);
            if(monster)
            {
                this._registrations["delete"](name);

                _replaceReducer(this);

                this._evtEmt.emit(
                    "monsterUnregistered",
                    {
                        source : this,
                        monster : monster
                    }
                );
            }
        },

        setReducerEnhancer : function setReducerEnhancer(reducerEnhancer)
        {
            if(
                null !== reducerEnhancer
                && !isFunction(reducerEnhancer)
            )
            {
                throw new TypeError("'reducerEnhancer' must be null or a function.");
            }

            this._reducerEnhancer = reducerEnhancer;
        }
    }

    ReduxMonsterRegistry.findFromReduxStore = function findFromReduxStore(store)
    {
        return (
            (
                !isUndefinedOrNull(store)
                && ("getMonsterRegistry" in store)
                && isFunction(store.getMonsterRegistry)
            )
                ? store.getMonsterRegistry()
                : null
        );
    };

    /**
     *  @param {ReduxMonsterRegistry} thisRef
     *  @param {Store | null} reduxStore
     *  @param {Record<string, any> | null} [initialState]
     */
    function _setReduxStore(thisRef, reduxStore)
    {
        var initialState = arguments[2];
        var oldReduxStore = thisRef._reduxStore;

        if(!isNonNullObject(reduxStore))
        {
            thisRef._reduxStore = null;

            if(oldReduxStore)
            {
                delete oldReduxStore.getMonsterRegistry;
            }
        }
        else
        {
            if(oldReduxStore !== reduxStore)
            {
                _setReduxStore(thisRef);

                thisRef._reduxStore = reduxStore;

                reduxStore.getMonsterRegistry = function getMonsterRegistry()
                {
                    return thisRef;
                };

                _replaceReducer(thisRef, initialState);
            }
        }
    }

    /**
     *  @param {ReduxMonsterRegistry} thisRef
     */
    function _getReducerMap(thisRef)
    {
        return Array.from(thisRef._registrations.values())
            .reduce(
                function (acc, registration)
                {
                    var monster = registration.monster;
                    acc[monster.ownStateKey] = monster.reducer;

                    return acc;
                },
                {}
            )
        ;
    }

    /**
     *  @param {ReduxMonsterRegistry} thisRef
     *  @param {Record<string, any> | null} [initialState]
     */
    function _replaceReducer(thisRef)
    {
        var initialState = arguments[1];
        var reduxStore = thisRef._reduxStore;
        if(reduxStore)
        {
            var newReducer = _combineReducers(thisRef, _getReducerMap(thisRef), initialState);
            var reducerEnhancer = this._reducerEnhancer;
            var enhancedReducer = (
                isFunction(reducerEnhancer)
                    ? reducerEnhancer(newReducer)
                    : null
            );
            if(isFunction(enhancedReducer))
            {
                newReducer = enhancedReducer;
            }

            reduxStore.replaceReducer(newReducer);
        }
    }

    /**
     *  @param {ReduxMonsterRegistry} thisRef
     *  @param {Record<string, AnyReduxReducer>} reducerMap
     *  @param {Record<string, any> | null} [initialState]
     */
    function _combineReducers(thisRef, reducerMap)
    {
        var initialState = arguments[2] || null;
        var finalReducerMap = Object.assign({}, reducerMap);
        if(initialState)
        {
            Object
                .keys(initialState)
                .forEach(function (key)
                {
                    if(!(key in reducerMap))
                    {
                        finalReducerMap[key] = function (state)
                        {
                            return ("undefined" === typeof state ? initialState[key] : state);
                        };
                    }
                })
            ;
        }

        var combinedReducer = (
            Object.keys(finalReducerMap).length > 0
                ? combineReducers(finalReducerMap)
                : function (state)
                {
                    return ("undefined" === typeof state ? initialState : state);
                }
        );

        return function (state, action)
        {
            var nextState = state;

            var payload = action.payload;
            var registration;
            var monster;
            var monsterName;
            var monsterReducer;
            var monsterInitialState;
            var ownStateKey;
            switch(action.type)
            {
            case _InternalActionType.MERGE_NEW_PROPERTIES_ONLY:
                monsterName = payload.monsterName;
                registration = thisRef._registrations.get(monsterName) || null;
                if(registration)
                {
                    monster = registration.monster;
                    ownStateKey = monster.ownStateKey;
                    monsterReducer = monster.reducer;

                    nextState = Object.assign({}, nextState);
                    nextState[ownStateKey] = Object.assign({}, nextState[ownStateKey]);

                    monsterInitialState = monsterReducer(void 0, _emptyAction);
                    Object.keys(monsterInitialState).forEach(function (key)
                    {
                        if(nextState[ownStateKey] && !(key in nextState[ownStateKey]))
                        {
                            nextState[ownStateKey][key] = monsterInitialState[key];
                        }
                    });
                }
                break;
            case _InternalActionType.MERGE:
                monsterName = payload.monsterName;
                registration = thisRef._registrations.get(monsterName) || null;
                if(registration)
                {
                    monster = registration.monster;
                    ownStateKey = monster.ownStateKey;
                    monsterReducer = monster.reducer;

                    nextState = Object.assign({}, nextState);
                    nextState[ownStateKey] = Object.assign(
                        {},
                        nextState[ownStateKey],
                        monsterReducer(void 0, _emptyAction)
                    );
                }
                break;
            case _InternalActionType.RESET:
                monsterName = payload.monsterName;
                registration = thisRef._registrations.get(monsterName) || null;
                if(registration)
                {
                    monster = registration.monster;
                    ownStateKey = monster.ownStateKey;
                    monsterReducer = monster.reducer;

                    nextState = Object.assign({}, nextState);
                    nextState[ownStateKey] = monsterReducer(void 0, _emptyAction);
                }
                break;
            default:
                nextState = combinedReducer(state, action);
            }

            return nextState;
        };
    }

    return {
        ReduxMonsterRegistry : ReduxMonsterRegistry,
        ReduxMonsterRegistryMonsterStateOption : ReduxMonsterRegistryMonsterStateOption
    };
})();
