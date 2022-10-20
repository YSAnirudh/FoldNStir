import GameSession from "./core/GameSession.js";
import Skeleton from "./game/Skeleton.js";
import Circle from "./game/Circle.js"
import MainPose from "./game/MainPose.js"
import LoadingState from "./game/states/LoadingState.js";
/**TODOS:
 Move Camera instantiation to separate file and load with loading state
 Have game start in loading state
 On finishing loading, move to Calibrate State
*/

//Instantiate our Game Session - this will be our parent for all game data.
let gameSession = new GameSession();

//Instantiate MediaPipe before proceeding

const mpPose = window;

//Attach results to gamesession whenever available
function onResults(results) {
	gameSession.poseLandmarks = (results.poseLandmarks);
}

//Instantiate Pose
const pose = new mpPose.Pose(
	{locateFile: (file) => {
		return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
	}
});

//Options
pose.setOptions({
	modelComplexity: 1,
	smoothLandmarks: true,
	enableSegmentation: false,
	smoothSegmentation: false,
	minDetectionConfidence: 0.5,
	minTrackingConfidence: 0.5
});

pose.onResults(onResults);

//Define how our P5 sketch will look. Treat this as the "Main".
var foldnstir = function (p) {
	let imgCreate, benderCharacter;
	//Executed before beginning setup
	p.preload = function() {
		imgCreate = p.loadImage("assets/images/ChargePackEffectComplete.gif")
		benderCharacter = p.loadImage("assets/images/BenderTPose.png")
	}

	//Executed before draw
	p.setup = function () {

		//Instantiate all relevant game states and add them to the session.
		let loadingState = new LoadingState("Loading");
		gameSession.addStateToGame(loadingState);

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

		// //instantiate skeleton
		// gameSession.skeleton = new Skeleton();
		// gameSession.skeleton.update();

		// // Adding circles for the pose.
		// let circle = new Circle(300, -100, 300, 4);
		// let circle2 = new Circle(-300, 300, 300, 4);
		// gameSession.mainPose = new MainPose(4)
		// gameSession.mainPose.addCircle(circle);
		// gameSession.mainPose.addCircle(circle2);
	}

	//core update function of the game
	p.draw = function(){

		//TODO: STATE MANAGEMENT
		//gameSession.currentState.update();
		//gameSession.currentState.render();

		//System updates first
		gameSession.timeManager.update();
		//gameSession.skeleton.update();
		gameSession.currentState.update();

		//Renders last and from back to front. Clear before going.
		p.clear();
		p.background(p.color(gameSession.backgroundColor)); 
		gameSession.particleManager.render();

		//Render current state of game
		gameSession.currentState.render();

		// let greenColor = p.color('green');
		// let redColor = p.color('red');

		// if(gameSession.poseLandmarks.length >= 1){
		// 	p.strokeWeight(0);
		// 	for(let i = 0; i < gameSession.poseLandmarks.length; i++){
		// 		if ((i >= 11 && i <= 16) || (i >= 23 && i <= 28) || (i == 0)) {
		// 			p.fill(greenColor);
		// 			p.ellipse(gameSession.poseLandmarks[i].x * gameSession.canvasWidth, gameSession.poseLandmarks[i].y * gameSession.canvasHeight, 50,50, 0);//gameSession.poseLandmarks[i].z*100, gameSession.poseLandmarks[i].z*100);
					
		// 		}
		// 	}
		// 	if (gameSession.skeleton.leftWrist && gameSession.skeleton.nose) {
				
		// 		// Assigning bodyParts to each circle
		// 		gameSession.mainPose.poseCircles[0].addBodyPartInfo(
		// 			gameSession.skeleton.leftWrist, 
		// 			gameSession
		// 		);

		// 		gameSession.mainPose.poseCircles[1].addBodyPartInfo(
		// 			gameSession.skeleton.rightKnee, 
		// 			gameSession
		// 		);
		// 		// Rendering body parts.
		// 		gameSession.mainPose.update()
		// 	}

		// }
		//gameSession.skeleton.render();
		
	}


	// Manage game input.
	p.keyPressed = function () {
		
	}

	p.windowResized = function () {
		gameSession.canvasWidth = window.innerWidth;
		gameSession.canvasHeight = window.innerHeight;

		p.resizeCanvas(gameSession.canvasWidth, gameSession.canvasHeight);
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

