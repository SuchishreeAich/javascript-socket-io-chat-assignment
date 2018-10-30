function sendMessage(event,socket) {

	event.preventDefault();

	let username = document.getElementById('username').value;
	let channel = document.getElementById('channel').value;
	let message = document.getElementById('message').value;

	if(channel ==='')
	{
		return;
	}

	let chatElem = document.getElementById('chatContainer');

	let messageDisp = 'Me : '+message;

	let chatChild1 = document.createElement('div');
	chatChild1.className = 'col-12';

	let chatChild2 = document.createElement('div');

	chatChild2.classList.add('card');
	chatChild2.classList.add('sent-message');

	let chatChild3 = document.createElement('div');
	chatChild3.className = 'card-body';

	let chatChild4 = document.createElement('p');
	chatChild4.className = 'card-text';
	chatChild4.innerHTML = messageDisp;

	chatChild3.appendChild(chatChild4);
	chatChild2.appendChild(chatChild3);
	chatChild1.appendChild(chatChild2);

	chatElem.insertBefore(chatChild1,chatElem.childNodes[0]);

	socket.emit('message',{username,channel,message});

}

function joinChannel(event,socket) {
	
	let channel = document.getElementById('newchannel').value;

	socket.emit('joinChannel',{channel});

	return channel;
}

function leaveChannel(event,socket) {
	let channel = document.getElementById('newchannel').value;

	socket.emit('leaveChannel',{channel});
}

function onWelcomeMessageReceived(welcomeMessage) {
	
	let chatElem = document.getElementById('chatContainer');

	let messageDisp = 'System : '+welcomeMessage;

	let chatChild1 = document.createElement('div');
	chatChild1.className = 'col-12';

	let chatChild2 = document.createElement('div');

	chatChild2.classList.add('card');
	chatChild2.classList.add('received-message');

	let chatChild3 = document.createElement('div');
	chatChild3.className = 'card-body';

	let chatChild4 = document.createElement('p');
	chatChild4.className = 'card-text';
	chatChild4.innerHTML = messageDisp;

	chatChild3.appendChild(chatChild4);
	chatChild2.appendChild(chatChild3);
	chatChild1.appendChild(chatChild2);

	chatElem.appendChild(chatChild1);

}

function onNewMessageReceived(username,channel,message) {
	
	let usernameCurrent = document.getElementById('username').value;
	let userNameTemp = username;

	let userNameNew = '';
	
	let messageNew = '';

	for(let usernameVal in userNameTemp)
	{		
		if(userNameTemp.hasOwnProperty(usernameVal))
		{
			if(usernameVal === 'username')
			{
				userNameNew = userNameTemp[usernameVal];
			}
			if(usernameVal === 'message')
			{
				messageNew = userNameTemp[usernameVal];
			}
		}
	}
	
	if(userNameNew!==usernameCurrent)
	{
		let chatElem = document.getElementById('chatContainer');	

		let messageDisp = userNameNew+' : '+messageNew;

		let chatChild1 = document.createElement('div');
		chatChild1.className = 'col-12';

		let chatChild2 = document.createElement('div');

		chatChild2.classList.add('card');
		chatChild2.classList.add('received-message');

		let chatChild3 = document.createElement('div');
		chatChild3.className = 'card-body';

		let chatChild4 = document.createElement('p');
		chatChild4.className = 'card-text';
		chatChild4.innerHTML = messageDisp;

		chatChild3.appendChild(chatChild4);
		chatChild2.appendChild(chatChild3);
		chatChild1.appendChild(chatChild2);

		//chatElem.appendChild(chatChild1);
		chatElem.insertBefore(chatChild1,chatElem.childNodes[1]);
	}

}

function onAddedToNewChannelReceived(channel) {	
	
	let channelNew = '';

	for(let channelVal in channel)
	{
		if(channel.hasOwnProperty(channelVal))
		{
			channelNew = channel[channelVal];
		}
	}

	let channelListElem = document.getElementById('channelsList');

	let channelOption = document.createElement('option');
	
	channelOption.innerHTML = channelNew;

	if(channelListElem!==null)
	{
		channelListElem.appendChild(channelOption);
	}	
	
	
	let alertMessage = `You are added to <strong>${channelNew}</strong> successfully!`;
	let alertElem = document.getElementById('alertContainer');

	let alertChild1 = document.createElement('div');
	alertChild1.classList.add('alert');
	alertChild1.classList.add('alert-success');
	alertChild1.classList.add('alert-dismissible');
	alertChild1.classList.add('fade');
	alertChild1.classList.add('show');

	alertChild1.role = 'alert';
	alertChild1.innerHTML = alertMessage;

	if(alertElem!==null)
	{
		alertElem.appendChild(alertChild1);
	}

}

function onRemovedFromChannelReceived(channel) {

	let channelListElem = document.getElementById('channelsList');

	if(channelListElem!==null)
	{
		channelListElem.remove(channel);
	}	

	let alertMessage = `You are removed from <strong>${channel}</strong> successfully!`;
	let alertElem = document.getElementById('alertContainer');

	let alertChild1 = document.createElement('div');
	alertChild1.classList.add('alert');
	alertChild1.classList.add('alert-success');
	alertChild1.classList.add('alert-dismissible');
	alertChild1.classList.add('fade');
	alertChild1.classList.add('show');

	alertChild1.role = 'alert';
	alertChild1.innerHTML = alertMessage;

	if(alertElem!==null)
	{
		alertElem.appendChild(alertChild1);
	}
	
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

