function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register',({username,channels}) => {
			socket.emit('welcomeMessage',`Welcome ${username} !!`);
			if(channels.length >0){
				channels.forEach(channel => {
					socket.join(`${channel}`);
					socket.emit('addedToChannel',`${channel}`);
				});
			}

			socket.on('joinChannel',({channel})=>{
				socket.join(`${channel}`,() =>{
					socket.emit('addedToChannel',`${channel}`);
				});
			});

			socket.on('leaveChannel',({channel})=>{				
				socket.leave(`${channel}`,() =>{
					socket.emit('removedFromChannel',`${channel}`);
				});
			});

			socket.on('message',({username,channel,message})=>{				
				// socket.broadcast.emit('newMessage',`${username}`,`${channel}`,`${message}`);
				socket.broadcast.emit('newMessage',{username},{channel},{message});
			});


		});

	});
}

module.exports = bootstrapSocketServer;
