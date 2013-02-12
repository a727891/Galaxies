/**
 * main class
 **/
var galaxies;
define(['jquery', 'lib/class', 'Renderer'], function ($, Class, Renderer) {
    var app;

    var initApp = function () {

        $(document).ready(function () {
            render = new Renderer();
            galaxies = render;
        });

    };


    initApp();
});

