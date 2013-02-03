/**
 * app class
 **/
define([], function () {
    var app = Class.extend({
        init:function (IO) {
            this.socket = IO.connect('http://localhost:8080');

            this.socket.on('1', function () {
                console.log('on 1');
            });
        },
    });

    return app
});

