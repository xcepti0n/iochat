var express =require("express");
var app =express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users =[];
connections =[];
var port =process.env.PORT || 3000;
server.listen(port);
// try variable app too
app.get('/',(req,res)=>{
	res.sendFile(__dirname +'/index.html');
}) ;
console.log('server started on port '+port);
io.sockets.on('connection',(socket)=>{
	connections.push(socket);
	console.log("connected: "+connections.length +' sockets connected') ;

	//disconnected
	socket.on('disconnect',function(data){
		
		connections.splice(connections.indexOf(socket),1);
		console.log("Disconnected: "+connections.length +' sockets connected') ;	
		if(!socket.username) return;
		users.splice(users.indexOf(socket.username),1);
		updateUsernames();
	});
	//new user
	socket.on('new user',function(data,callback){
		callback(true);
		socket.username=data;
		users.push(socket.username);
		updateUsernames();
			});
	function updateUsernames(){
		io.sockets.emit('get users',users);
	}
	//send message
	socket.on('send message',function(data){
		console.log(data);
		io.sockets.emit('new message',{
			user:users[users.indexOf(socket.username)]
			,msg:data});
	});
	
})