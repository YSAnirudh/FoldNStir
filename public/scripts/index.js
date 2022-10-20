import GameSession from "./core/GameSession.js";
import Skeleton from "./game/Skeleton.js";
import Circle from "./game/Circle.js"
import MainPose from "./game/MainPose.js"
import LoadingState from "./game/states/LoadingState.js";
import MainBody from "./game/MainBody.js";
import StirCircle from "./game/StirCircle.js";
import MainMenuState from "./game/states/MainMenuState.js";
/**TODOS:
 Move Camera instantiation to separate file and load with loading state
 Have game start in loading state
 On finishing loading, move to Calibrate State
*/

//Instantiate our Game Session - this will be our parent for all game data.
let gameSession = new GameSession();

//Instantiate MediaPipe before proceeding





//Define how our P5 sketch will look. Treat this as the "Main".
var foldnstir = function (p) {
	let imgCreate, benderCharacter, benderBodyParts, stirCircle, loadingBackgroundImg, 
	mainMenuImg, startGameBtnImg, startGameBtnHoverImg, startGameBtnPressImg;
	//Executed before beginning setup
	p.preload = function() {
		//TODO: Put references to preloaded assets in game session for retrieval in later states.
		//Add to sprite manager?

		imgCreate = p.loadImage("assets/images/ChargePackEffectComplete.gif");
		
		benderBodyParts = [];
		benderBodyParts.push(p.loadImage("assets/images/HeadTest.png"));
		benderBodyParts.push(p.loadImage("assets/images/LShoulder.png"));
		benderBodyParts.push(p.loadImage("assets/images/LArm.png"));
		benderBodyParts.push(p.loadImage("assets/images/LLeg.png"));
		benderBodyParts.push(p.loadImage("assets/images/LShin.png"));
		benderBodyParts.push(p.loadImage("assets/images/RShoulder.png"));
		benderBodyParts.push(p.loadImage("assets/images/RArm.png"));
		benderBodyParts.push(p.loadImage("assets/images/RLeg.png"));
		benderBodyParts.push(p.loadImage("assets/images/RShin.png"));
		benderBodyParts.push(p.loadImage("assets/images/Torso.png"));
		benderBodyParts.push(p.loadImage("assets/images/LWrist.png"));
		benderBodyParts.push(p.loadImage("assets/images/LFeet.png"));
		benderBodyParts.push(p.loadImage("assets/images/RWrist.png"));
		benderBodyParts.push(p.loadImage("assets/images/RFeet.png"));

		//Load background image
		//TODO: file URLs and keys should be turned into a constants file section.
		loadingBackgroundImg = p.loadImage("assets/images/ui_loading.png");
		gameSession.spriteManager.addSprite("loadingBackgroundImg", loadingBackgroundImg);

		//Main menu image
		mainMenuImg = p.loadImage("assets/images/ui_start_screen.png");
		gameSession.spriteManager.addSprite("mainMenuImg", mainMenuImg);

		//Button image
		startGameBtnImg = p.loadImage("assets/images/ui_start_button.png");
		gameSession.spriteManager.addSprite("startGameBtnImg", startGameBtnImg);

		//Button hover
		startGameBtnHoverImg = p.loadImage("assets/images/ui_start_button_hover.png");
		gameSession.spriteManager.addSprite("startGameBtnHoverImg", startGameBtnHoverImg);

		//button pressed
		startGameBtnPressImg = p.loadImage("assets/images/ui_start_button_selected.png");
		gameSession.spriteManager.addSprite("startGameBtnPressImg", startGameBtnPressImg);


	}

	//Executed before draw
	p.setup = function () {

		//Instantiate all relevant game states and add them to the session.
		let loadingState = new LoadingState();
		let mainMenuState = new MainMenuState();
		gameSession.addStateToGame(loadingState);
		gameSession.addStateToGame(mainMenuState);

		//Set initial game state as loading, call setup method
		gameSession.setCurrentState(loadingState);

		gameSession.canvasWidth = window.innerWidth;
		gameSession.canvasHeight = window.innerHeight;

		var canvas = p.createCanvas(window.innerWidth, window.innerHeight);
		canvas.parent("canvas");

		//save canvas reference to gameSession
		gameSession.canvas = canvas;
		
		//Time scale management
		gameSession.timeManager.timeScale = 1;
		gameSession.timeManager.frameRate = 60;
		gameSession.timeManager.start();

		p.frameRate(60);
		p.imageMode(p.CENTER);

		//Move to game state setup

		stirCircle = new StirCircle(300, 0, 150, 5, 0, 100);

		// Adding circles for the pose.
		let circle = new Circle(25, -200, 125, 4);
		let circle2 = new Circle(-25, -200, 125, 4);
		let circle3 = new Circle(-25, 400, 125, 4);
		let circle4 = new Circle(-175, 300, 125, 4);
		gameSession.mainPose = new MainPose(4)
		gameSession.mainPose.addCircle(circle);
		gameSession.mainPose.addCircle(circle2);
		gameSession.mainPose.addCircle(circle3);
		gameSession.mainPose.addCircle(circle4);

		gameSession.benderCharacter = new MainBody(benderBodyParts);
	}

	//core update function of the game
	p.draw = function(){

		//System updates first
		gameSession.timeManager.update();
		//gameSession.skeleton.update();
		gameSession.currentState.update();

		//Renders last and from back to front. Clear before going.
		p.clear();
		p.angleMode(p.DEGREES);

		//TODO: Move to individual classes and use an image
		p.background(p.color(gameSession.backgroundColor)); 
		gameSession.particleManager.render();

		//Render current state of game
		gameSession.currentState.render();

		// //TODO: Move to game state
		// if(gameSession.poseLandmarks.length >= 1){
		// 	stirCircle.addBodyPartInfo(gameSession.skeleton.leftWrist, gameSession);
		// 	stirCircle.update();
		// 	p.imageMode(p.CENTER);
		// 	gameSession.benderCharacter.render(gameSession);
		// 	p.strokeWeight(0);
		// 	for(let i = 0; i < gameSession.poseLandmarks.length; i++){
		// 		if ((i >= 11 && i <= 16) || (i >= 23 && i <= 28) || (i == 0)) {
		// 			p.fill(greenColor);
		// 			p.ellipse(gameSession.poseLandmarks[i].x * gameSession.canvasWidth, gameSession.poseLandmarks[i].y * gameSession.canvasHeight, 50,50, 0);//gameSession.poseLandmarks[i].z*100, gameSession.poseLandmarks[i].z*100);
					
		// 		}
		// 	}

		// }
		
	}

	//implement your controls inside of your specific state.
	p.mousePressed = function(){
		//call gameState code here as needed.
	}

    p.keyPressed = function(){
		//call gameState code here as needed.
	}

    p.keyReleased = function(){
		//call gameState code here as needed.
	}

    p.keyTyped = function(){
		//call gameState code here as needed.
	}

    p.keyIsDown = function(){
		//call gameState code here as needed.
	}

    p.mouseMoved = function(){
		//call gameState code here as needed.
	}

    p.mouseDragged = function(){
		//call gameState code here as needed.
	}

    p.mousePressed = function(){
		//call gameState code here as needed.
	}

    p.mouseReleased = function(){
		if(gameSession.currentState.mouseReleased){
			gameSession.currentState.mouseReleased();
		}
	}

    p.mouseClicked = function(){
		//call gameState code here as needed.
	}

    p.doubleClicked = function(){
		//call gameState code here as needed.
	}

    p.mouseWheel = function(){
		//call gameState code here as needed.
	}

    p.requestPointerLock = function(){
		//call gameState code here as needed.
	}

    p.exitPointerLock = function(){
		//call gameState code here as needed.
	}


	function getAngle(x1, y1, x2, y2) {
		let angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
		return angle;
	}

	// Manage game input.
	p.keyPressed = function () {
		
	}

	p.windowResized = function () {
		gameSession.canvasWidth = window.innerWidth;
		gameSession.canvasHeight = window.innerHeight;

		p.resizeCanvas(gameSession.canvasWidth, gameSession.canvasHeight);
	}

	function getDistance(posInfoX, posInfoY, circlePosX, circlePosY) {
		return Math.sqrt((posInfoX - circlePosX)*(posInfoX - circlePosX) + (posInfoY - circlePosY)*(posInfoY - circlePosY));
	}

	function checkInCircle(posInfoX, posInfoY, circlePosX, circlePosY, circleRadius) {
		let distance = ((posInfoX - circlePosX)*(posInfoX - circlePosX)) + ((posInfoY - circlePosY)*(posInfoY - circlePosY));
		if (distance <= (circleRadius * circleRadius)) {
			return true;
		}
		else {
			return false;
		}
	}
}

//Instantiate P5 and attach it to our gameSession instance
gameSession.p5 = new p5(foldnstir, 'canvas');

