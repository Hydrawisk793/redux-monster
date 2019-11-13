var StringKeyMap = require("../kaphein-js/collections").StringKeyMap;
var EventNotifier = require("../kaphein-js/utils/event-notifier").EventNotifier;

function ReduxMonsterRegistry()
{
    /** @type {StringKeyMap<import("./redux-monster").ReduxMonster>} */this._monsterMap = new StringKeyMap();

    this._eventNotifier = new EventNotifier();
};
ReduxMonsterRegistry.prototype.constructor = ReduxMonsterRegistry;

ReduxMonsterRegistry.prototype.addEventListener = function (eventName, listener)
{
    this._eventNotifier.add(eventName, listener);
};

ReduxMonsterRegistry.prototype.removeEventListener = function (eventName, listener)
{
    this._eventNotifier.remove(eventName, listener);
};

ReduxMonsterRegistry.prototype.getReducerMap = function ()
{
    return Array.from(this._monsterMap.values())
        .reduce(
            function (acc, monster) {
                acc[monster.ownStateKey] = monster.reducer;

                return acc;
            },
            {}
        )
    ;
};

ReduxMonsterRegistry.prototype.isMonsterRegistered = function (name)
{
    return this._monsterMap.has(name);
};

ReduxMonsterRegistry.prototype.getMonster = function (name)
{
    return (
        this.isMonsterRegistered(name)
        ? this._monsterMap["get"](name)
        : null
    );
};

ReduxMonsterRegistry.prototype.registerMonster = function (monster, replaceExistingOne)
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
};

ReduxMonsterRegistry.prototype.unregisterMonster = function (name)
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
};

module.exports = {
    ReduxMonsterRegistry : ReduxMonsterRegistry,
};
