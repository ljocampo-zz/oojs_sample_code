/**
 var eb = new EventBus();

 eb.subscribe("event", function(){alert("hello");}, this);
 var func2 = function(){alert("Hi there!");};
 eb.subscribe("event", func2, this);
 var func3 = function(){alert("Hello again!");};
 eb.subscribe("event_foo", func3, self);

 eb.publish("event"); --> alerts "hello", func2
 eb.publish("event_foo"); --> func3
 **/

var EventBus = function () {
    this.events = {};
};

EventBus.prototype.subscribe = function (evt, callback, context) {
    if (!this.events[evt]) {
        this.events[evt] = [];
    }
    this.events[evt].push(callback.bind(context));
};

EventBus.prototype.publish = function (evt, data) {
    try {
        for (var idx in this.events[evt]) {
            // noprotect to avoid endless loop warning and allow for to continue with next events
            this.events[evt][idx](data);
        }
    } catch (e) {
        console.log(e.stack);
    }
};