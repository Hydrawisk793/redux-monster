var StringKeyMap = require("../kaphein-js/collections").StringKeyMap;
var EventNotifier = require("../kaphein-js/utils/event-notifier").EventNotifier;

/**
 *  @constructor 
 */
function ReduxMonsterRegistry()
{
    /** @type {StringKeyMap<import("./redux-monster").ReduxMonster>} */this._monsterMap = new StringKeyMap();

    this._eventNotifier = new EventNotifier();
}

ReduxMonsterRegistry.prototype = {
    constructor : ReduxMonsterRegistry,

    addEventListener(eventName, listener)
    {
        this._eventNotifier.add(eventName, listener);
    },

    removeEventListener(eventName, listener)
    {
        this._eventNotifier.remove(eventName, listener);
    },

    getReducerMap()
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

    isMonsterRegistered(name)
    {
        return this._monsterMap.has(name);
    },

    getMonster(name)
    {
        return (
            this.isMonsterRegistered(name)
            ? this._monsterMap["get"](name)
            : null
        );
    },

    registerMonster(monster, replaceExistingOne)
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
                    monster : monster,
                }
            );
        }
        else {
            console.log("'" + monster.name + "' has already been registed.");
        }

        return oldMonster;
    },

    unregisterMonster(name)
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
                    monster : monster,
                }
            );
        }

        return monster;
    },
};

module.exports = {
    ReduxMonsterRegistry : ReduxMonsterRegistry,
};
