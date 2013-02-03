/**
 * Entity class.
 **/
var cls = require("./lib/class");

module.exports = Entity = cls.Class.extend({
    init:function (id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    },

    getPosition:function () {
        return [
            this.x,
            this.y
        ];
    }


});