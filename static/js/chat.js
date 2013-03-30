$(function (){

	var $login = $("#login"),
	    $chat = $("#chat"),
	    $messages = $("#messages");
	var socket= io.connect('/');
	
	socket.on('connect', function(){
		console.log('Connected whit socket');
		
		init();
	});
	
	var init = function(){
	
		$("#nickname").keyup(function(e){
			var code = e.which || e.keycode;
		
			if (code == 13){
				setNickname($(this).val());
			}
		});
		
		$chat.hide();
	};	

	var setNickname = function (nickname){
		socket.emit('set_nickname', nickname, function (is_available){
			if (is_available){
			console.log('Nickname' + nickname + 'is avaible');
			setUpChat(nickname);
			}else {
			console.log('Nickname' + nickname + 'is NOT avaible');	
			}	
		});
		//console.log(nickname);
	};
	
	var setUpChat = function (nickname){
		$login.hide();
		$chat.show();
		
		$("#submit-message").click(function(){
			sendMessage($("#message").val());	
		});
		
		socket.on('message', function (nickname, message){
			addMessage(nickname, message);
		});
		
	};
	
	var sendMessage = function(msg){
		socket.emit('message', msg);
	};
	
	var addMessage = function (nickname,message){
		$messages.append($("<li>@"+ nickname + ": "+ message + "</li>"));
	};
});
