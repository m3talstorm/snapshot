
var Snapshot = (function()
{

    return {
        'property' : function()
        {
            var snapshots = [];
            // Store the most recent value in private local scope so we don't have to access a list
            var head;

            var accessor = function(value)
            {
                // Getter and Setter combined
                return arguments.length ? (function()
                {
                    // Add the value to the list of snapshots, but only if it changed
                    (head !== value) && snapshots.push(head = value);
                })() : head;
            };

            accessor.snapshot = function(index)
            {
                return snapshots[index % snapshots.length];
            };

            accessor.count = function()
            {
                return snapshots.length;
            };

            accessor.rollback = function(index)
            {
                var removed = snapshots.splice(index % snapshots.length, snapshots.length);

                return head = (removed.length ? removed[0] : head);
            };

            accessor.clear = function()
            {
                snapshots = [];
            };

            return accessor;
        },
        'mixin' : function(object)
        {
            // TODO
        }
    };
})();
