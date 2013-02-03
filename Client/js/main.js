/**
 * main class
 **/
var galaxies;
define(['jquery', 'lib/class', 'lib/socket.io', 'app'], function ($, Class, IO, APP) {
    var app;

    var initApp = function () {

        $(document).ready(function () {
            app = new APP(IO);
            galaxies = app;
        })

    };


    initApp();
});

