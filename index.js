var io = require('socket.io');

function runsocket(){
	 	var socket =io.connect();
	 	var $messageForm = $('#messageForm');
	 	var $message = $('#message');
	 	var $chat = $('#chat');
	 	var $users = $('#users');

	 	$messageForm.submit(function(e){
	 		e.preventDefault();
	 		socket.emit('send message',$message.val());
	 		$message.val('');
	 	});
	 	socket.on('new message',function(data){
	 		$chat.append('<div class="well">'+data.msg+'</div>');
	 	});
	 }