/**
 var ev = new EventBus();
 ev.subscribe('test', function(arg1, arg2) { console.log(this); console.log(arg1 + arg2); });
 ev.publish('test', {}, 'hello', 'hi'); //logs {}, hellohi
 **/

var EventBus = function () {
    Object.defineProperty(this, "events", {
        value: {}
    });
};

Object.defineProperties(EventBus.prototype, {
    subscribe: {
        value: function (ev, callback) {
            if (!this.events[ev]) {
                this.events[ev] = [];
            }
            this.events[ev].push(callback);
        },
        enumerable: true
    },
    publish: {
        value: function (ev, context) {
            var args = Array.prototype.slice.call(arguments, 2);

            try {
                for (var id in this.events[ev]) {
                    this.events[ev][id].apply(context, args);
                }
            } catch (e) {
                console.log(e.stack);
            }
        }
    }
});