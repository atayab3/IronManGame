//set context
let c = document.querySelector("canvas");
     c.width =  600;
     c.height = 600;
     let ctx = c.getContext("2d");

	const drawBorder = () =>{
		ctx.beginPath();
		ctx.rect(0, 30, c.width, 570);
		ctx.stroke();
	}
	//global variables
	let curScore = 0;
	let livesLeft = 3;
	let levelNum = 0;
	const addInfo = () =>{
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.font = "20px serif";
		ctx.rect(0, 0, 200, 30); // left corner is at 0,0 - width of 170 and height of 20
		let scoreStatement = "SCORE  : " + curScore;
		ctx.fillText(scoreStatement, 50, 20);
		
		ctx.rect(200, 0, 200, 30);
		let livesStatement = "LIVES  : " + livesLeft;
		ctx.fillText(livesStatement, 250, 20);
		
		
		ctx.rect(400, 0, 200, 30);
		let levelStatement = "LEVEL : " + levelNum;
		ctx.fillText(levelStatement, 450, 20);
		
		ctx.stroke();
	}
	
	const OpeningScreen = () =>{
		drawBorder();
		ctx.font = "20px  Palatino";
		ctx.fillText("Instructions: ", c.width/2 - 60, 50);
		ctx.fillText("Iron Man, The World Needs Your Help!", c.width/2 - 170, 90);
		ctx.fillText("As Earth's Best Defender",  c.width/2 - 170, 130);
		ctx.fillText("You need to fly through space while",  c.width/2 - 170, 170);
		ctx.fillText("avoiding asteroids that hurt your armor,",  c.width/2 - 170, 210);
		ctx.fillText("and collecting infinity stones to stop Thanos.",  c.width/2 - 170, 250);
		ctx.fillText("Every 50 points results in a level increase",  c.width/2 - 170, 290);
		ctx.fillText("and objects in the orbit will come at you faster.",  c.width/2 - 170, 330);
		ctx.fillText("Press 'Enter' to Begin.",  c.width/2 - 100, 370);
		document.addEventListener("keydown", (e)=> {
			if(e.key == "Enter"){
				   moveMainGuy();
					startGame();
				
// 				  GameOverScreen();
			}
		})
	}
	

	const EndScreen = () =>{
		ctx.clearRect(0, 0, c.width, c.height);
		drawBorder();
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.font = "40px  Palatino";
// 		ctx.fillText("GAME OVER",  c.width/2 - 170, 20);
		ctx.fillText("You have lost",  c.width/2 - 140, 70);
		ctx.fillText("We're in the EndGame now, Tony",  c.width/2 - 140, 150);
		ctx.endPath() ;

	}
	 let ironManImage = "https://i.pinimg.com/originals/38/93/cd/3893cd8d215b3ee643d05960613d4213.png";
	 let imgObject = new Image();
	 imgObject.src = ironManImage;
	
	let spaceImage = "https://i.pinimg.com/originals/e5/da/3c/e5da3cb3fbe9af8f2198f3459e72424a.png";
	let spaceObj = new Image();
	spaceObj.src = spaceImage;
	


		
	let mPlayer = {
		mainX:c.width/2, 
		mainY:540, 
		mainRad: 30
	};

	
	const moveMainGuy = () =>{
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
// 			 console.log(mPlayer);
		})

				
		
	}


	let harmObject = {
		harmX : c.width/2, 
		harmY:50, 
		hRad:20,
		hColor:"grey"
	};
	let benObject = {
		benX : c.width/5, 
		benY:50, 
		benRad:10,
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
		addInfo();
		drawBorder();
		let ObjectSpeed = Math.floor(curScore / 50)/3 + 1;
// 		console.log(ObjectSpeed);
		harmObject["harmY"] = harmObject["harmY"]+ObjectSpeed;
		benObject["benY"] = benObject["benY"]+ObjectSpeed;
		//edge case for harm object
		if(harmObject["harmY"]  > c.height-10+harmObject["hRad"]){
            harmObject["harmY"] = 30 + harmObject["hRad"];
			harmObject["harmX"] = Math.floor((Math.random() * 490) + 25) ;
			curScore = curScore + 10;
			levelNum = Math.floor(curScore / 50);
// 			console.log("current score" + curScore);
          }
		//edge case for benefit object
		if(benObject["benY"]  > c.height+benObject["benRad"]){
            benObject["benY"] = 30 + benObject["benRad"];
			benObject["benX"] = Math.floor((Math.random() * 490) + 25) ;
          }
		//handle collision between main Player and benefit Object

		if(Math.sqrt( Math.pow((benObject["benY"]-(mPlayer["mainY"]+25) ),2) + Math.pow((benObject["benX"]-(mPlayer["mainX"] +15),2 ) )> benObject["benRad"]+mPlayer["mainRad"]+5 {
			curScore= curScore + 10;
			benObject["benX"] = c.width/4;
			benObject["benY"] =50;
		}
// 		collisions between harm object and Player
		if(Math.sqrt( Math.pow((harmObject["harmY"]-(mPlayer["mainY"]+25) ),2) + Math.pow((harmObject["harmX"]-(mPlayer["mainX"]+15),2) ) <= harmObject["hRad"]+mPlayer["mainRad"]+5){
			livesLeft--;
			mPlayer["mainX"] = c.width/2;
			mPlayer["mainX"] = 540;
			harmObject["harmX"] = c.width/2;
			harmObject["harmY"] =50;
		}
		
		if(livesLeft <= 0){
			EndScreen();
		}

		ctx.drawImage(spaceObj, 0, 30, 600, 570);
		console.log(imgObject.width*.05);
		console.log(imgObject.height*.05);
		ctx.drawImage(imgObject, mPlayer["mainX"], mPlayer["mainY"], imgObject.width*.05, imgObject.height*.05 );

		createObject(harmObject["harmX"], harmObject["harmY"], harmObject["hRad"], harmObject["hColor"] );
		createObject(benObject["benX"], benObject["benY"], benObject["benRad"], benObject["bColor"] );
		window.requestAnimationFrame(startGame);
		
	}
	
OpeningScreen();





