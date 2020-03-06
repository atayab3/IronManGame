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
	
	 let ironManImage = 'flyIronman.PNG';
	 let imgObject = new Image();
	 imgObject.src = ironManImage;
	
	let spaceImage = "https://lh5.googleusercontent.com/proxy/VORBfXRU0IdYcXKBzi6dQ6M4pDE3DUZN1USbdYVHDmg70Q7CXPDmRxk6zVJMNoe8GS6GBNk__zaqk5P8_w3xirs-5Q";
	let spaceObj = new Image();
	spaceObj.src = spaceImage;
	


		
	let mPlayer = {
		mainX:c.width/2, 
		mainY:500, 
		mainRad: Math.floor((imgObject.width*.25)/2)
	};

	
	const moveMainGuy = () =>{
		 document.addEventListener("keydown", (e)=> {
			if(e.key == "ArrowRight"){
				mPlayer["mainX"] = mPlayer["mainX"] + 5;
			}
			else if(e.key == "ArrowLeft"){
				mPlayer["mainX"] = mPlayer["mainX"] - 5;
			}
			if(mPlayer["mainX"]  >= 595){
				mPlayer["mainX"] = 5;
          }
		    if(mPlayer["mainX"]  < 0){
				mPlayer["mainX"] = c.width-20-mPlayer["mainRad"];
          }
			 console.log(mPlayer);
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
		let ObjectSpeed = Math.floor(curScore / 50) + .5;
		console.log(ObjectSpeed);
		harmObject["harmY"] = harmObject["harmY"]+ObjectSpeed;
		benObject["benY"] = benObject["benY"]+ObjectSpeed;
		//edge case for harm object
		if(harmObject["harmY"]  > 590+harmObject["hRad"]){
            harmObject["harmY"] = 30 + harmObject["hRad"];
			harmObject["harmX"] = Math.floor((Math.random() * 490) + 25) ;
			curScore = curScore + 10;
			levelNum = Math.floor(curScore / 50);
			console.log("current score" + curScore);
          }
		//edge case for benefit object
		if(benObject["benY"]  > 600+benObject["benRad"]){
            benObject["benY"] = 30 + benObject["benRad"];
			benObject["benX"] = Math.floor((Math.random() * 490) + 25) ;
          }
		//handle collision between main Player and harm Object
		
		
		

		ctx.drawImage(spaceObj, 0, 30, spaceObj.width *1.2 , spaceObj.height*3);

		ctx.drawImage(imgObject, mPlayer["mainX"], mPlayer["mainY"], imgObject.width*.25, imgObject.height*.25 );

		createObject(harmObject["harmX"], harmObject["harmY"], harmObject["hRad"], harmObject["hColor"] );
		createObject(benObject["benX"], benObject["benY"], benObject["benRad"], benObject["bColor"] );
		window.requestAnimationFrame(startGame);
		
	}
	

 moveMainGuy();
	startGame();


