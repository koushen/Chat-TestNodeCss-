var express = require("express");
//var app = express();
//var io = require("socket.io");
//io = io.listen(app);

var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var PORT = process.env.PORT || 8080;
server.listen(PORT, function (){
	console.log("listening on port " + PORT)
});


//app.listen(PORT, function (){
//	console.log("listening on port " + PORT)
//});

app.configure (function () {
	app.set('view options', {
		layout: false
	});	
	app.use(express.static(__dirname + '/static'));
});



app.get('/', function (request,response){
	response.render('main.jade');
	
});

require ('./io')(io);

