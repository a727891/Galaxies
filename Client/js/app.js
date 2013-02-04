/**
 * app class
 **/
define([], function () {
    var app = Class.extend({
        init:function () {
            var self = this;
            this.socket = io.connect('http://localhost:8080');


            this.socket.on('1', function (data) {
                self.dispatchMessage(data);
            });
            this.handlers = [];
            this.handlers["WELCOME"] = this.receiveWelcome;


        },

        dispatchMessage:function (data) {

        },


        receiveWelcome:function (data) {
            var id = data[1],
                name = data[2],
                x = data[3],
                y = data[4],
                hp = data[5];

            if (this.welcome_callback) {
                this.welcome_callback(id, name, x, y, hp);
            }
        },

    });

    return app
});

