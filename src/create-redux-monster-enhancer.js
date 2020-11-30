var ReduxMonsterRegistry = require("./redux-monster-registry").ReduxMonsterRegistry;

module.exports = (function ()
{
    /**
     *  @template Ext, StoreExt
     *  @typedef {import("redux").StoreEnhancerStoreCreator<Ext, StoreExt>} StoreEnhancerStoreCreator
     */

    function createReduxMonsterEnhancer()
    {
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
                var store = next(reducer, initialState);

                var enhancedStore = Object.assign({}, store);
                new ReduxMonsterRegistry(enhancedStore);

                return enhancedStore;
            }

            return createStore;
        }

        return reduxMonsterEnhancer;
    }

    return {
        createReduxMonsterEnhancer : createReduxMonsterEnhancer
    };
})();
