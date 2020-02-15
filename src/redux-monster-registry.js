var isUndefinedOrNull = require("kaphein-js").isUndefinedOrNull;
var StringKeyMap = require("kaphein-js").StringKeyMap;
var EventNotifier = require("kaphein-js").EventNotifier;

module.exports = (function ()
{
    var _isSymbolSupported = (Symbol && "function" !== typeof Symbol);

    var getMonsterRegistryFunctionKey = (
        _isSymbolSupported
        ? Symbol("ReduxMonsterRegistry.getMonsterRegistryFunctionKey")
        : "pseudo-symbol:redux-monster:ReduxMonsterRegistry.getMonsterRegistryFunctionKey"
    );

    /**
     *  @constructor
     */
    function ReduxMonsterRegistry()
    {
        /** @type {Map<string, import("./redux-monster").ReduxMonster>} */this._monsterMap = new StringKeyMap();

        this._eventNotifier = new EventNotifier();

        this._reduxStore = null;

        this._registryChangedHandler = null;
    }

    ReduxMonsterRegistry.getMonsterRegistryFunctionKey = getMonsterRegistryFunctionKey;

    ReduxMonsterRegistry.findMonsterRegistryFromReduxStore = function findMonsterRegistryFromReduxStore(store)
    {
        return (
            (!isUndefinedOrNull(store) && (getMonsterRegistryFunctionKey in store))
            ? store[getMonsterRegistryFunctionKey]()
            : null
        );
    };

    ReduxMonsterRegistry.prototype = {
        constructor : ReduxMonsterRegistry,

        addEventListener : function addEventListener(eventName, listener)
        {
            this._eventNotifier.add(eventName, listener, arguments[2]);
        },

        removeEventListener : function removeEventListener(eventName, listener)
        {
            this._eventNotifier.remove(eventName, listener);
        },

        getConnectedReduxStore : function getConnectedReduxStorefunction()
        {
            return this._reduxStore;
        },

        connectReduxStore : function connectReduxStorefunction(store)
        {
            var prevReduxStore = this._reduxStore;
            if(prevReduxStore !== store) {
                if(null !== prevReduxStore) {
                    if(null !== this._registryChangedHandler) {
                        this.removeEventListener("registryChanged", this._registryChangedHandler);
                        this._registryChangedHandler = null;
                    }

                    if(getMonsterRegistryFunctionKey in prevReduxStore) {
                        delete prevReduxStore[getMonsterRegistryFunctionKey];
                    }
                }

                this._reduxStore = store;
                if(null !== store) {
                    var registryChagedHandler = arguments[1];
                    if("function" === typeof registryChagedHandler) {
                        this._registryChangedHandler = registryChagedHandler.bind(this);
                        this.addEventListener("registryChanged", this._registryChangedHandler);
                    }

                    var thisRef = this;
                    store[getMonsterRegistryFunctionKey] = function ()
                    {
                        return thisRef;
                    };
                }
            }

            return prevReduxStore;
        },

        getReducerMap : function getReducerMap()
        {
            return Array.from(this._monsterMap.values())
                .reduce(
                    function (acc, monster)
                    {
                        acc[monster.ownStateKey] = monster.reducer;

                        return acc;
                    },
                    {}
                )
            ;
        },

        isMonsterRegistered : function isMonsterRegistered(name)
        {
            return this._monsterMap.has(name);
        },

        getMonster : function getMonster(name)
        {
            return (
                this.isMonsterRegistered(name)
                ? this._monsterMap["get"](name)
                : null
            );
        },

        registerMonster : function registerMonster(monster, replaceExistingOne)
        {
            var oldMonster = this.getMonster(monster.name);

            if(
                replaceExistingOne
                || (null === oldMonster && oldMonster !== monster)
            ) {
                this._monsterMap["set"](monster.name, monster);

                this._eventNotifier.notify(
                    "registryChanged",
                    {
                        source : this,
                        operation : "register",
                        monster : monster
                    }
                );
            }
            // else {
            //     console.log("'" + monster.name + "' has already been registed.");
            // }

            return oldMonster;
        },

        unregisterMonster : function unregisterMonster(name)
        {
            var isReducerExists = this.isMonsterRegistered(name);
            var monster = null;

            if(isReducerExists) {
                monster = this._monsterMap["get"](name);

                this._monsterMap["delete"](name);

                this._eventNotifier.notify(
                    "registryChanged",
                    {
                        source : this,
                        operation : "unregister",
                        monster : monster
                    }
                );
            }

            return monster;
        }
    }

    return {
        ReduxMonsterRegistry : ReduxMonsterRegistry
    };
})();
