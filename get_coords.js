var th = require('through');
var split = require('split');
var http = require('http');
var ws = require('websocket-stream')

var port = 8099;

var server = http.createServer();
var wss = ws.createServer({server:server}, pipe_coords);

server.listen(port);

function pipe_coords(stream){
	process.stdin.pipe(split()).pipe(th(write)).pipe(stream);
	
	
	function write(data){
		
		var coordObj = {};
		var coord = data.toString().split(',');
		coordObj.x= coord[0].split('=')[1];
		coordObj.y= coord[1].split('=')[1];
		coordObj.generatedOn = coord[2].split('=')[1];
		
		this.queue(JSON.stringify(coordObj)+'\n');
		
	}
}



