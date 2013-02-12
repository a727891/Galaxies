/**
 * Renderer class
 **/
define(['SimplexNoise'], function (Simplex) {
    var Renderer = Class.extend({
        init:function () {
            this.Canvas = document.getElementById('TestCanvas');
            this.Context = this.Canvas.getContext('2d');
            this.Simplex = new Simplex(this.Canvas);

        },


    });

    return Renderer
});

