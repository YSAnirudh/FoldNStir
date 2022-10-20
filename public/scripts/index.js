import GameSession from "./core/GameSession.js";
import Skeleton from "./game/Skeleton.js";
import Circle from "./game/Circle.js"
import MainPose from "./game/MainPose.js"
import LoadingState from "./game/states/LoadingState.js";
import MainBody from "./game/MainBody.js";
import StirCircle from "./game/StirCircle.js";
import StirPose from "./game/StirPose.js";
import EmptyPose from "./game/EmptyPose.js";
import MainMenuState from "./game/states/MainMenuState.js";
import GameState from "./game/states/GameState.js";
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
	let imgCreate, benderCharacter, stirCircle, loadingBackgroundImg, 
	mainMenuImg, startGameBtnImg, startGameBtnHoverImg, startGameBtnPressImg, 
	chargeEffectBefore, sweatEffect, circleUI, benderBodyParts, gameBackground;
	//Executed before beginning setup
	p.preload = function() {
		chargeEffectBefore = p.loadImage("assets/images/ChargePackEffectComplete.gif")
		gameSession.spriteManager.addSprite("chargeEffectBefore", chargeEffectBefore);
		
		sweatEffect = p.loadImage("assets/images/SweatEffectComplete.gif")
		gameSession.spriteManager.addSprite("sweatEffect", sweatEffect);

		
		circleUI = p.loadImage("assets/images/ui_circle.png")
		gameSession.spriteManager.addSprite("circleUI", circleUI);

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

		gameSession.benderBodyParts = benderBodyParts;
		
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

		//game background
		gameBackground = p.loadImage("assets/images/game_background.png");
		gameSession.spriteManager.addSprite("gameBackground", gameBackground);

	}

	//Executed before draw
	p.setup = function () {

		//Instantiate all relevant game states and add them to the session.
		let loadingState = new LoadingState();
		let mainMenuState = new MainMenuState();
		let gameState = new GameState();
		gameSession.addStateToGame(loadingState);
		gameSession.addStateToGame(mainMenuState);
		gameSession.addStateToGame(gameState);

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

		gameSession.skeleton = new Skeleton();

		p.frameRate(60);
		p.imageMode(p.CENTER);

		
	}

	//core update function of the game
	p.draw = function(){

		//System updates first
		gameSession.timeManager.update();
		gameSession.currentState.update();
		gameSession.skeleton.update();
		//Renders last and from back to front. Clear before going.
		p.clear();
		p.angleMode(p.DEGREES);

		//TODO: Move to individual classes and use an image
		p.background(p.color(gameSession.backgroundColor)); 
		gameSession.particleManager.render();
		gameSession.currentState.render();
		
		// gameSession.skeleton.render();
		
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
}

//Instantiate P5 and attach it to our gameSession instance
gameSession.p5 = new p5(foldnstir, 'canvas');

