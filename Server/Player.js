/**
 * Player class.
 **/
var cls = require("./lib/class"),
    Entity = require("./Entity");

module.exports = Player = Entity.extend({
    init:function (id, x, y) {
        this._super(id, x, y);
    },


});