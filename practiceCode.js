//set context
let c = document.querySelector("canvas");
     c.width =  600;
     c.height = 600;
     let ctx = c.getContext("2d");

	const drawBorder = () =>{
		ctx.beginPath();
		ctx.rect(0, 30, c.width, 560);
		ctx.stroke();
		
	}
	//global variables
	let curScore = 0;
	let livesLeft = 3;
	let levelNum = 0;
	const addInfo = () =>{
		ctx.beginPath();
		
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
	// Opening Screen with Instructions
	
	
	const GameOverScreen = () =>{
		console.log(livesLeft);
			if(livesLeft == 0 ){
			drawBorder();
			ctx.font = "50px serif";
			ctx.fillText("G A M E  O V E R ", 200, 250);
			}
	}
	
      
     const drawFilledCircle = (initX, initY, color, mainRadius) => {
       drawBorder();
// 	   addInfo();
	   ctx.beginPath();
       ctx.arc(initX, initY, mainRadius, 0, Math.PI*2);
       ctx.fillStyle = color;
       ctx.closePath();
       ctx.fill();
	   ctx.stroke();

     }
	 
	 let mPlayer = {mainX:c.width/2, mainY:480, mainColor:"red" , mainRad: 10};
     const mainCharacter = () => {
		 		
		 drawFilledCircle(mPlayer["mainX"], mPlayer["mainY"], mPlayer["mainColor"], mPlayer["mainRad"]); 
		 

		 
		 //working on edge cases
// 		 if(mainX > c.width){
// 			   mainX = 50 ;
// 		  }
// 		 else if(mainX == 0){
// 			 mainX = c.width - 50;
// 		 }
// 		 ctx.clearRect(0, 0, c.width, c.height);
// 		 drawFilledCircle(mainX, mainY, color, mainRadius);
		 
     }
	 
	 //Harm object
	 let asteroid = {x:250, y:125, radius: 10};
	 let numAsteroidsPassed = 0;
	 const makeAsteroid = () => {
		 asteroid["y"] += 1;
		 // condition if reaches/passes bottom of the screen
		 // 
		 if(asteroid["y"]  > c.height+asteroid["radius"]){
            asteroid["y"] = 30 + asteroid["radius"] ;
			asteroid["x"] = Math.floor((Math.random() * 490) + 25) ;
			numAsteroidsPassed++;
			curScore = curScore + 10;
			console.log("current score" + curScore);
			console.log(asteroid);
          }
		 
		 ctx.clearRect(asteroid["x"]-15, asteroid["y"]-15, 28, 28);
		 drawFilledCircle(asteroid["x"], asteroid["y"], "grey", 10);
		 
		 window.requestAnimationFrame(makeAsteroid);
	 }
	 
	 
	 
	 OpeningScreen();