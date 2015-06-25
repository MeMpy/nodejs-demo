var game = new Phaser.Game(800,500, Phaser.AUTO, 'game_div', { preload: preload, create: create,update:update ,render:render});

var handle1 ;
var handle2;

var x ;
var y ;

function preload() 
{
    game.load.image('background', 'assets/soccer-field.jpg');
    game.load.image('player', 'assets/player.png');
}

function create() {

    game.add.sprite(0, 0, 'background');

    handle1 = game.add.sprite(100, 200, 'player', 0);
    handle1.anchor.set(0.5,0.5);
    

    handle2 = game.add.sprite(400, 300, 'player', 0);
    handle2.anchor.set(0.5,0.5);
    

	game.physics.arcade.enable(handle1);  
	game.physics.arcade.enable(handle2);   
	
    line1 = new Phaser.Line(handle1.x, handle1.y, handle2.x, handle2.y);
		
	websocket = new WebSocket('ws://10.10.16.217:8090'); 
	websocket.onopen = function(evt) { onOpen(evt) }; 
	websocket.onclose = function(evt) { onClose(evt) }; 
	websocket.onmessage = function(evt) { onMessage(evt) }; 
	websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt) { writeToScreen("CONNECTED"); } 

function onClose(evt) { writeToScreen("DISCONNECTED"); }  

function onMessage(evt) { 
		
		var reader = new FileReader();
		reader.readAsText(evt.data);
		reader.onload = function(event){
			var obj = JSON.parse(reader.result);
			x = obj.x;  
			y= obj.y;
			obj.now = new Date().toISOString();			
			var generatedOn = new Date(obj.generatedOn);			
			obj.delay = new Date().getTime() - generatedOn.getTime();
			console.log(JSON.stringify(obj));
			
		};	
}  

function onError(evt) { writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data); }  

function doSend(message) { writeToScreen("SENT: " + message);  websocket.send(message); } 

function writeToScreen(message) { console.log(message) }


function update() {

    line1.fromSprite(handle1, handle2, false);
	
	
	
}

function render() {

    game.debug.geom(line1);
    game.debug.lineInfo(line1, 32, 32);

    game.debug.text("Drag the handles", 32, 550);
	
	handle1.reset( x * 8,  y * 5) ;
	
	//console.log(handle1.body.x+" "+handle1.body.y);

}