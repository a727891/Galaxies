//Galaxies Server
var cls = require("./lib/class");

module.exports = Server = cls.Class.extend({
    init:function () {

        this.onPlayerConnect(function (player) {
            log.warn('player connect');
        })
    },

    onPlayerConnect:function (callback) {
        this.connectCallback = callback;
    },


});