/**
 * Node Application Server
 */
var App = require('http').createServer(handler),
    Log = require('./Server/lib/Logger').Logger,
    IO = require('socket.io').listen(App),
    Static = require('node-static'),
    Server = require('./Server/Server'),
    Player = require('./Server/Player'),
    version = 0.1;

IO.set('log level', 1);  //Reduce SocketIO output
var fileServer = new Static.Server('./Client');
App.listen(8080);// This is the port for our web server. You will need to go to http://localhost:8080 to see it

// If the URL of the socket server is opened in a browser
function handler(request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}

function main() {
    var log = new Log();
    log.DebugEnable(process.env.LogDebug);
    log.info('Starting Server...');

    var server = new Server(log);

    IO.sockets.on('connection', function (socket) {
        server.connectCallback(new Player(0, 0, 0));
        socket.emit('1', '');

        socket.on('disconnect', function () {
            console.log('Socket died');
        });
    });
}

main();
