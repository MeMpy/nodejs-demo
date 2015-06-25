var tcp = require('net');

var client = new tcp.Socket();
client.connect(9876, '10.10.16.106', function(client){
	console.log('connected');
	client.write('hello from node');
	
});

client.on('close',function(){
	console.log('close');
})