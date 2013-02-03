/**
 * Node Application Server
 */
var App = require('http').createServer(handler),
    IO = require('socket.io').listen(App),
    Static = require('node-static'); // for serving files

// This will make all the files in the current folder accessible from the web
var fileServer = new Static.Server('./Client');
// This is the port for our web server. You will need to go to http://localhost:8080 to see it
App.listen(8080);

// If the URL of the socket server is opened in a browser
function handler(request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}

function main() {
    console.log("Start Server...");
}

main();
