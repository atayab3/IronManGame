     let c = document.querySelector("canvas");
     c.width =  500;
     c.height = 500;
     let ctx = c.getContext("2d");


	// draw Border of the game 
	const drawBorder = () =>{
		ctx.beginPath();
		ctx.rect(0, 0, c.width, c.height);
		
		ctx.stroke();
		
	}
	const OpeningScreen = () =>{
		drawBorder();
		
		ctx.fillText("Instructions: As Iron Man, you are flying through space, ", (c.width/4), 50);
		ctx.fillText("avoiding damaging asteroids that hurt your armor,", (c.width/4), 80);
		ctx.fillText("and collecting boosting infinity stones.", (c.width/4), 110);	
		ctx.fillText("Press 'Enter' to Start the Game.", (c.width/4), 140);
	}
	
	
		document.addEventListener("keydown", (e)=> {
			if(e.key == "Enter"){
				  ctx.clearRect(0, 0, c.width, c.height);
				  mainCharacter();
				  makeAsteroid();
			}
		})
 
     let radii = [5,10];

//      let mainPlayer = {x:100, y:100, radius: 10};
//      
//      
     const drawFilledCircle = (initX, initY, color, mainRadius) => {
       drawBorder();
		 
	   ctx.beginPath();
       ctx.arc(initX, initY, mainRadius, 0, Math.PI*2);
       ctx.fillStyle = color;
       ctx.closePath();
       ctx.fill();
	   ctx.stroke();
 
     }
	 let mPlayer = {mainX:c.width/2, mainY:485, mainColor:"red" , mainRad: 10};
     const mainCharacter = () => {
		 		
		 drawFilledCircle(mPlayer["mainX"], mPlayer["mainY"], mPlayer["mainColor"], mPlayer["mainRad"]); 
		 
		 document.addEventListener("keydown", (e)=> {
			if(e.key == "ArrowRight"){
				mPlayer["mainX"] = mPlayer["mainX"] + 20;
				ctx.clearRect(mPlayer["mainX"]-(mPlayer["mainRad"]*3+1), mPlayer["mainY"]-(mPlayer["mainRad"]+2), 23, 23);
			}
			else if(e.key == "ArrowLeft"){
				mPlayer["mainX"] = mPlayer["mainX"] - 20;
				ctx.clearRect(mPlayer["mainX"]+mPlayer["mainRad"], mPlayer["mainY"]-(mPlayer["mainRad"]+1), 22, 22);
			}
			if(mPlayer["mainX"]  > c.width){
            mPlayer["mainX"] = mPlayer["mainRad"];
// 			asteroid["x"] = Math.floor((Math.random() * 490) + 25) ;
          }
		    if(mPlayer["mainX"]  < mPlayer["mainRad"]){
            mPlayer["mainX"] = c.width-mPlayer["mainRad"];
// 			asteroid["x"] = Math.floor((Math.random() * 490) + 25) ;
          }
			 console.log("x: " + mPlayer["mainX"] + ", y: " + mPlayer["mainX"]);
			 drawFilledCircle(mPlayer["mainX"], mPlayer["mainY"], mPlayer["mainColor"], mPlayer["mainRad"] );
		})
		 
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
	 
	 
	 let asteroid = {x:250, y:125, radius: 10};

	 const makeAsteroid = () => {
		 asteroid["y"] += 1;
		 if(asteroid["y"]  > c.height+asteroid["radius"]){
            asteroid["y"] = -asteroid["radius"];
			asteroid["x"] = Math.floor((Math.random() * 490) + 25) ;
          }
		 ctx.clearRect(asteroid["x"]-15, asteroid["y"]-15, 28, 28);

// 		 drawBorder();
		 drawFilledCircle(asteroid["x"], asteroid["y"], "grey", 10);
		 
		 window.requestAnimationFrame(makeAsteroid);
	 }
	 
	 
	 
	 OpeningScreen();
 



		



     
