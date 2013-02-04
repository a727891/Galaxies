/**
 * app class
 **/
define([], function () {
    var app = Class.extend({
        init:function () {
            this.socket = io.connect('http://localhost:8080');


            this.socket.on('1', function (data) {
                console.log("recieved a 1");
            });

        },
    });

    return app
});

