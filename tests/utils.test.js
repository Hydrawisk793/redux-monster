module.exports = (function ()
{
    function coerceToArray(v)
    {
        return (Array.isArray(v) ? v : [v]);
    }

    return {
        coerceToArray,
    };
})();
