
//set canvas and context
let c = document.querySelector("canvas");
     c.width =  document.documentElement.clientWidth * 0.9;
     c.height = document.documentElement.clientHeight * 0.9;
     let ctx = c.getContext("2d");
	
	//draw rectangular border where game is played
	const drawBorder = () =>{
		ctx.beginPath();
		ctx.rect(0, 0, c.width, c.height);
		ctx.stroke();
	}
	
	 // Set images for iron man, space background, moon object etc.
	 let imgObject = new Image();
	 imgObject.src = "https://i.pinimg.com/originals/38/93/cd/3893cd8d215b3ee643d05960613d4213.png";

	 let spaceObj = new Image();
	 spaceObj.src = "https://i.pinimg.com/originals/e5/da/3c/e5da3cb3fbe9af8f2198f3459e72424a.png";
	
	 let moonObj = new Image();
	 moonObj.src = "https://i.redd.it/pvipb16mkliz.png";

	//global variables
	let curScore = 0;
	let livesLeft = 3;
	let levelNum = 0;

	// Opening Screen with instructions, Press Enter to call game functions
	const OpeningScreen = () =>{
		moveMainGuy();
		startGame(); 
// 		drawBorder();
// 		document.addEventListener("keydown", (e)=> {
			
// 			// FIX ME : pressing enter repeatedly causes the game to increase in speed wayy to much 
// 			if(e.key == "Enter"){
// 				   moveMainGuy();
// 					startGame(); 
// 			}
// 		}, { once: true }  // FIX was found in this link https://medium.com/beginners-guide-to-mobile-web-development/one-off-event-listeners-in-javascript-92e19c4c0336
// 		)
	
	
	}
	
	//Screen that comes up when user has lost all three lives
	const EndScreen = () =>{
		ctx.clearRect(0, 0, c.width, c.height);
		drawBorder();
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.font = "40px  Palatino";
		ctx.fillText("You have lost",  c.width/2 - 120, 160);
		ctx.endPath() ;
	}
	
const handleOrientation = (e) => {
    var z = e.alpha;
    var y = e.beta;
    var x = e.gamma;
    mPlayer["mainX"] += x;
    mPlayer["mainY"] += y;
}
	
	const moveMainGuy = () =>{
		if(window.DeviceOrientationEvent){
			console.log("Device orientation supported");
			window.addEventListener("deviceorientation", this.handleOrientation, true);
		}
		else{
			console.log("device orient not supported");
		}
 
		 document.addEventListener("keydown", (e)=> {
			if(e.key == "ArrowRight"){
				mPlayer["mainX"] = mPlayer["mainX"] + 5;
			}
			else if(e.key == "ArrowLeft"){
				mPlayer["mainX"] = mPlayer["mainX"] - 5;
			}
			else if(e.key == "ArrowUp"){
				mPlayer["mainY"] = mPlayer["mainY"] - 5;
			}
			else if(e.key == "ArrowDown"){
				mPlayer["mainY"] = mPlayer["mainY"] + 5;
			}
			 //edge cases for mainPlayer
			if(mPlayer["mainX"]  >= 595){
				mPlayer["mainX"] = 5;
          }
		    if(mPlayer["mainX"]  < 0){
				mPlayer["mainX"] = c.width-20-mPlayer["mainRad"];
          }
			if(mPlayer["mainY"] >=540){
				mPlayer["mainY"] = 540;
			}
			if(mPlayer["mainY"] <= 40){
				mPlayer["mainY"] = 40;
			}
 		})			
	}
	
	//Objects 
	let mPlayer = {
		mainX: c.width/2, 
		mainY:   c.height-100, 
		mainRad: 25,
	};

	let harmObject = {
		harmX : c.width/2, 
		harmY:50, 
		hRad:40,
		hColor:"grey"
	};

	let benObject = {
		benX : c.width/5, 
		benY: 50, 
		benRad: 10,
		bColor:"green"
	};

	const createObject = (valX, valY, rad, color ) =>{
	   ctx.beginPath();
       ctx.arc(valX, valY, rad, 0, Math.PI*2);
       ctx.fillStyle = color;
       ctx.closePath();
       ctx.fill();
	   ctx.stroke();
		
	}
	const startGame = () =>{
		ctx.clearRect(0, 0, c.width, c.height) ;
		drawBorder();
		let ObjectSpeed = Math.floor(curScore / 50)/3 + 1;

		harmObject["harmY"] = harmObject["harmY"]+ObjectSpeed;
		benObject["benY"] = benObject["benY"]+ObjectSpeed;
		
		//edge case for harm object
		if(harmObject["harmY"]  > c.height-10+harmObject["hRad"]){
            harmObject["harmY"] = 30 + harmObject["hRad"];
			harmObject["harmX"] = Math.floor((Math.random() * 490) + 25) ;
			curScore = curScore + 10;
			levelNum = Math.floor(curScore / 50);
          }
		
		//edge case for benefit object
		if(benObject["benY"]  > c.height+benObject["benRad"]){
            benObject["benY"] = 30 + benObject["benRad"];
			benObject["benX"] = Math.floor((Math.random() * 490) + 25) ;
        }
		
		
// 		//handle collision between main Player and benefit Object
		if(Math.sqrt( Math.pow((benObject["benY"]-mPlayer["mainY"]),2) + Math.pow((benObject["benX"]-mPlayer["mainX"]),2 ) )<= benObject["benRad"]+mPlayer["mainRad"]){
			curScore= curScore + 10;
			benObject["benX"] = Math.floor((Math.random() * 490) + 25) ;
			benObject["benY"] = 50;
		 }

// 		// 		collisions between harm object and Player
		if(Math.sqrt( Math.pow((harmObject["harmY"]-mPlayer["mainY"]),2) + Math.pow((harmObject["harmX"]-mPlayer["mainX"]),2) ) <= harmObject["hRad"]+mPlayer["mainRad"]){
			livesLeft--;
			mPlayer["mainX"] = c.width/2;
			mPlayer["mainX"] = 540;
			harmObject["harmX"] = Math.floor((Math.random() * 490) + 25);
			harmObject["harmY"] =50;
		 } 
		
		if(livesLeft <= 0){
			EndScreen();
		}

		ctx.drawImage(spaceObj, 0, 0, c.width, c.height);
		
		ctx.drawImage(imgObject, mPlayer["mainX"], mPlayer["mainY"], imgObject.width*.05, imgObject.height*.05 );
		ctx.drawImage(moonObj, harmObject["harmX"], harmObject["harmY"], moonObj.width*.15, moonObj.height*.15)	;
  
		createObject(benObject["benX"], benObject["benY"], benObject["benRad"], benObject["bColor"] );
		window.requestAnimationFrame(startGame);
		
	}

console.log("Iron man width", imgObject.width*.05);
console.log("Iron man height",imgObject.height*.05);
console.log("moon width", moonObj.width*.15);
console.log("moon height", moonObj.height*.15);

OpeningScreen();
