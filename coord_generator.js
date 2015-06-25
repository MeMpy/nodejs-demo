var coord = {};
coord.x = 0;
coord.y = 0;

setInterval(function (){
	
	coord.x = Math.floor((Math.random() * 100) + 1);
	coord.y = Math.floor((Math.random() * 100) + 1);
	coord.generetadOn = new Date().toISOString();
	console.log("x="+coord.x+",y="+coord.y, ",generetadOn="+coord.generetadOn);
},1000);
	
