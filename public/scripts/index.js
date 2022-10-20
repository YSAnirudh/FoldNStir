import GameSession from "./core/GameSession.js";
import Skeleton from "./game/Skeleton.js";
import Circle from "./game/Circle.js"
import MainPose from "./game/MainPose.js"
import MainBody from "./game/MainBody.js";
import StirCircle from "./game/StirCircle.js";
/**TODOS:

*/

//Instantiate our Game Session - this will be our parent for all game data.
let gameSession = new GameSession();

//Instantiate MediaPipe before proceeding
const videoElement = document.getElementsByClassName('input_video')[0];
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

const camera = new Camera(videoElement, {
	onFrame: async () => {
		await pose.send({image: videoElement});
	},
	width: 1280,
	height: 720
});

camera.start();


//Define how our P5 sketch will look. Treat this as the "Main".
var foldnstir = function (p) {
	let imgCreate, benderCharacter, benderBodyParts, stirCircle;
	//Executed before beginning setup
	p.preload = function() {
		imgCreate = p.loadImage("assets/images/ChargePackEffectComplete.gif")
		
		benderBodyParts = []
		benderBodyParts.push(p.loadImage("assets/images/HeadTest.png"))
		benderBodyParts.push(p.loadImage("assets/images/LShoulder.png"))
		benderBodyParts.push(p.loadImage("assets/images/LArm.png"))
		benderBodyParts.push(p.loadImage("assets/images/LLeg.png"))
		benderBodyParts.push(p.loadImage("assets/images/LShin.png"))
		benderBodyParts.push(p.loadImage("assets/images/RShoulder.png"))
		benderBodyParts.push(p.loadImage("assets/images/RArm.png"))
		benderBodyParts.push(p.loadImage("assets/images/RLeg.png"))
		benderBodyParts.push(p.loadImage("assets/images/RShin.png"))
		benderBodyParts.push(p.loadImage("assets/images/Torso.png"))
		benderBodyParts.push(p.loadImage("assets/images/LWrist.png"))
		benderBodyParts.push(p.loadImage("assets/images/LFeet.png"))
		benderBodyParts.push(p.loadImage("assets/images/RWrist.png"))
		benderBodyParts.push(p.loadImage("assets/images/RFeet.png"))
	}

	//Executed before draw
	p.setup = function () {
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

		//instantiate skeleton
		gameSession.skeleton = new Skeleton();
		gameSession.skeleton.update();

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
		gameSession.skeleton.update();

		//Renders last and from back to front. Clear before going.
		p.clear();
		p.angleMode(p.DEGREES);
		p.background(p.color(gameSession.backgroundColor)); 
		gameSession.particleManager.render();

		let greenColor = p.color('green');
		let redColor = p.color('red');

		if(gameSession.poseLandmarks.length >= 1){
			stirCircle.addBodyPartInfo(gameSession.skeleton.leftWrist, gameSession);
			stirCircle.update();
			p.imageMode(p.CENTER);
			gameSession.benderCharacter.render(gameSession);
			p.strokeWeight(0);
			for(let i = 0; i < gameSession.poseLandmarks.length; i++){
				if ((i >= 11 && i <= 16) || (i >= 23 && i <= 28) || (i == 0)) {
					p.fill(greenColor);
					p.ellipse(gameSession.poseLandmarks[i].x * gameSession.canvasWidth, gameSession.poseLandmarks[i].y * gameSession.canvasHeight, 50,50, 0);//gameSession.poseLandmarks[i].z*100, gameSession.poseLandmarks[i].z*100);
					
				}
			}
			// Assigning bodyParts to each circle
			// gameSession.mainPose.poseCircles[0].addBodyPartInfo(
			// 	gameSession.skeleton.leftWrist, 
			// 	gameSession
			// );

			// gameSession.mainPose.poseCircles[1].addBodyPartInfo(
			// 	gameSession.skeleton.rightWrist, 
			// 	gameSession
			// );

			// gameSession.mainPose.poseCircles[2].addBodyPartInfo(
			// 	gameSession.skeleton.rightAnkle, 
			// 	gameSession
			// );

			// gameSession.mainPose.poseCircles[3].addBodyPartInfo(
			// 	gameSession.skeleton.rightKnee, 
			// 	gameSession
			// );
			// Rendering body parts.
			// gameSession.mainPose.update()

		}
		// gameSession.skeleton.render();
		
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

