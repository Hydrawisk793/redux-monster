var ReduxMonsterRegistry = require("./redux-monster-registry").ReduxMonsterRegistry;

module.exports = (function ()
{
    /**
     *  @template Ext, StoreExt
     *  @typedef {import("redux").StoreEnhancerStoreCreator<Ext, StoreExt>} StoreEnhancerStoreCreator
     */
    /**
     *  @typedef {import("./redux-monster-registry").ReduxMonsterRegistryOption} ReduxMonsterRegistryOption
     */

    /**
     *  @param {ReduxMonsterRegistryOption} [registryOption]
     */
    function createReduxMonsterEnhancer()
    {
        var registryOption = arguments[1];

        /**
         *  @template Ext
         *  @template StoreExt
         *  @param {StoreEnhancerStoreCreator<Ext, StoreExt>} next
         */
        function reduxMonsterEnhancer(next)
        {
            /**
             *  @type {StoreEnhancerStoreCreator<Ext & {
                    getMonsterRegistry : () => ReduxMonsterRegistry;
                }, StoreExt>}
             */
            function createStore(reducer)
            {
                var initialState = arguments[1];
                var store = Object.assign({}, next(reducer, initialState));

                new ReduxMonsterRegistry(store, registryOption);

                return store;
            }

            return createStore;
        }

        return reduxMonsterEnhancer;
    }

    return {
        createReduxMonsterEnhancer : createReduxMonsterEnhancer
    };
})();
