import GameSession from "./core/GameSession.js";
import Skeleton from "./game/Skeleton.js";
import Circle from "./game/Circle.js"
import MainPose from "./game/MainPose.js"
import MainBody from "./game/MainBody.js";
import StirCircle from "./game/StirCircle.js";
import StirPose from "./game/StirPose.js";
import EmptyPose from "./game/EmptyPose.js";
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
	let chargeEffectBefore, sweatEffect, circleUI, benderBodyParts;
	//Executed before beginning setup
	p.preload = function() {
		chargeEffectBefore = p.loadImage("assets/images/ChargePackEffectComplete.gif")
		sweatEffect = p.loadImage("assets/images/SweatEffectComplete.gif")
		circleUI = p.loadImage("assets/images/ui_circle.png")

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

		// Adding circles for the pose.
		
		// -----------------------BENDING POSE----------------------------------
		//------------------------MAIN POSE 1--------------------------------
		let circle11 = new Circle(gameSession.canvasWidth * (15/100), gameSession.canvasHeight * (50/100), gameSession.canvasHeight * (13/100), 4, circleUI, chargeEffectBefore);
		let circle12 = new Circle(-gameSession.canvasWidth * (15/100), gameSession.canvasHeight * (50/100), gameSession.canvasHeight * (13/100), 4, circleUI, chargeEffectBefore);
		let circle13 = new Circle(gameSession.canvasWidth * (7/100), gameSession.canvasHeight * (46/100), gameSession.canvasHeight * (13/100), 4, circleUI, chargeEffectBefore);
		let circle14 = new Circle(-gameSession.canvasWidth * (7/100), gameSession.canvasHeight * (46/100), gameSession.canvasHeight * (13/100), 4, circleUI, chargeEffectBefore);
		gameSession.mainPoses.push(new MainPose(10, sweatEffect));
		gameSession.mainPoses[0].addCircle(circle11);
		gameSession.mainPoses[0].addCircle(circle12);
		gameSession.mainPoses[0].addCircle(circle13);
		gameSession.mainPoses[0].addCircle(circle14);
		
		// -----------------------TREE POSE----------------------------------
		//------------------------MAIN POSE 2--------------------------------
		let circle01 = new Circle(gameSession.canvasWidth * (1.5/100), -gameSession.canvasHeight * (20/100), gameSession.canvasHeight * (13/100), 4, circleUI, chargeEffectBefore);
		let circle02 = new Circle(-gameSession.canvasWidth * (1.5/100), -gameSession.canvasHeight * (20/100), gameSession.canvasHeight * (13/100), 4, circleUI, chargeEffectBefore);
		let circle03 = new Circle(-gameSession.canvasWidth * (1.5/100), gameSession.canvasHeight * (40/100), gameSession.canvasHeight * (14/100), 4, circleUI, chargeEffectBefore);
		let circle04 = new Circle(-gameSession.canvasWidth * (9/100), gameSession.canvasHeight * (33/100), gameSession.canvasHeight * (14/100), 4, circleUI, chargeEffectBefore);
		gameSession.mainPoses.push(new MainPose(4, sweatEffect));
		gameSession.mainPoses[1].addCircle(circle01);
		gameSession.mainPoses[1].addCircle(circle02);
		gameSession.mainPoses[1].addCircle(circle03);
		gameSession.mainPoses[1].addCircle(circle04);

		// -----------------------BASIC STIR POSE----------------------------------
		//------------------------STIR POSE 1--------------------------------
		let stirCircle01 = new StirCircle(gameSession.canvasWidth * (20/100), -gameSession.canvasHeight * (10/100), gameSession.canvasHeight * (13/100), 5, gameSession.canvasWidth * (0/100), gameSession.canvasHeight * (20/100), circleUI, chargeEffectBefore);
		let stirCircle02 = new StirCircle(-gameSession.canvasWidth * (20/100), -gameSession.canvasHeight * (0/100), gameSession.canvasHeight * (13/100), 5, gameSession.canvasWidth * (1/100), gameSession.canvasHeight * (20/100), circleUI, chargeEffectBefore);
		gameSession.stirPoses.push(new StirPose(sweatEffect));
		gameSession.stirPoses[0].addStirCircle(stirCircle01)
		gameSession.stirPoses[0].addStirCircle(stirCircle02)

		// -----------------------HANDS AND LEGS STIR POSE----------------------------------
		//------------------------STIR POSE 2--------------------------------
		let stirCircle11 = new StirCircle(gameSession.canvasWidth * (20/100), -gameSession.canvasHeight * (0/100), gameSession.canvasHeight * (13/100), 10, gameSession.canvasWidth * (-1/100), gameSession.canvasHeight * (20/100), circleUI, chargeEffectBefore);
		let stirCircle12 = new StirCircle(-gameSession.canvasWidth * (20/100), -gameSession.canvasHeight * (10/100), gameSession.canvasHeight * (13/100), 30, gameSession.canvasWidth * (0/100), gameSession.canvasHeight * (20/100), circleUI, chargeEffectBefore);
		let stirCircle13 = new StirCircle(gameSession.canvasWidth * (9/100), gameSession.canvasHeight * (45/100), gameSession.canvasHeight * (13/100), 10, gameSession.canvasWidth * (-8/100), gameSession.canvasHeight * (0/100), circleUI, chargeEffectBefore);
		let stirCircle14 = new StirCircle(-gameSession.canvasWidth * (12/100), gameSession.canvasHeight * (43/100), gameSession.canvasHeight * (13/100), 10, gameSession.canvasWidth * (8/100), gameSession.canvasHeight * (2/100), circleUI, chargeEffectBefore);
		gameSession.stirPoses.push(new StirPose(sweatEffect));
		gameSession.stirPoses[1].addStirCircle(stirCircle11)
		gameSession.stirPoses[1].addStirCircle(stirCircle12)
		gameSession.stirPoses[1].addStirCircle(stirCircle13)
		gameSession.stirPoses[1].addStirCircle(stirCircle14)
		
		// -----------------------EMPTY POSE---------------------------------
		gameSession.emptyPose = new EmptyPose(5);

		gameSession.benderCharacter = new MainBody(benderBodyParts);

		gameSession.orderOfPoses = []
		gameSession.orderOfPoses.push(gameSession.mainPoses[0]);
		gameSession.orderOfPoses.push(gameSession.emptyPose);
		gameSession.orderOfPoses.push(gameSession.stirPoses[0]);
		gameSession.orderOfPoses.push(gameSession.emptyPose);
		gameSession.orderOfPoses.push(gameSession.mainPoses[1]);
		gameSession.orderOfPoses.push(gameSession.emptyPose);
		gameSession.orderOfPoses.push(gameSession.stirPoses[1]);

		gameSession.currentPoseIndex = 0;
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
		
		if(gameSession.poseLandmarks.length >= 1){
			p.imageMode(p.CENTER);
			p.strokeWeight(0);
			//------------------------POSE LOGIC READY BELOW--------------------------------
			gameSession.benderCharacter.render(gameSession);
			
			
			//------------------------MAIN POSE 1--------------------------------
			gameSession.mainPoses[0].poseCircles[0].addBodyPartInfo(gameSession.skeleton.leftAnkle, gameSession,gameSession.skeleton.leftAnkleC,"L");

			gameSession.mainPoses[0].poseCircles[1].addBodyPartInfo(gameSession.skeleton.rightAnkle, gameSession, gameSession.skeleton.rightAnkleC, "R");

			gameSession.mainPoses[0].poseCircles[2].addBodyPartInfo(gameSession.skeleton.leftWrist, gameSession,gameSession.skeleton.leftWristC,"L");

			gameSession.mainPoses[0].poseCircles[3].addBodyPartInfo(gameSession.skeleton.rightWrist, gameSession,gameSession.skeleton.rightWristC,"R");
			
			//------------------------MAIN POSE 2--------------------------------
			gameSession.mainPoses[1].poseCircles[0].addBodyPartInfo(gameSession.skeleton.leftWrist, gameSession,gameSession.skeleton.leftWristC,"L");

			gameSession.mainPoses[1].poseCircles[1].addBodyPartInfo(gameSession.skeleton.rightWrist, gameSession, gameSession.skeleton.rightWristC, "R");

			gameSession.mainPoses[1].poseCircles[2].addBodyPartInfo(gameSession.skeleton.rightAnkle, gameSession,gameSession.skeleton.rightAnkleC,"R");

			gameSession.mainPoses[1].poseCircles[3].addBodyPartInfo(gameSession.skeleton.rightKnee, gameSession,gameSession.skeleton.rightKneeC,"R");
			
			//------------------------STIR POSE 1--------------------------------
			gameSession.stirPoses[0].stirCircles[0].addBodyPartInfo(gameSession.skeleton.leftWrist,gameSession,gameSession.skeleton.leftWristC,"L")

			gameSession.stirPoses[0].stirCircles[1].addBodyPartInfo(gameSession.skeleton.rightWrist,gameSession,gameSession.skeleton.rightWristC,"R")

			//------------------------STIR POSE 2--------------------------------
			gameSession.stirPoses[1].stirCircles[0].addBodyPartInfo(gameSession.skeleton.leftWrist,gameSession,gameSession.skeleton.leftWristC,"L")

			gameSession.stirPoses[1].stirCircles[1].addBodyPartInfo(gameSession.skeleton.rightWrist,gameSession,gameSession.skeleton.rightWristC,"R")

			gameSession.stirPoses[1].stirCircles[2].addBodyPartInfo(gameSession.skeleton.leftAnkle,gameSession,gameSession.skeleton.leftAnkleC,"L")

			gameSession.stirPoses[1].stirCircles[3].addBodyPartInfo(gameSession.skeleton.rightAnkle,gameSession,gameSession.skeleton.rightAnkleC,"R")

			while (gameSession.currentPoseIndex < gameSession.orderOfPoses.length) {
				gameSession.orderOfPoses[gameSession.currentPoseIndex].update(gameSession);

				if (gameSession.orderOfPoses[gameSession.currentPoseIndex].holdComplete) {
					gameSession.currentPoseIndex++;
					gameSession.orderOfPoses[gameSession.currentPoseIndex].updateTime();
				} else {
					break;
				}
			}

			//------------------------COLOR CODING JOINTS BELOW--------------------------------
			
			// Should be done at the end
			for(let i = 0; i < gameSession.poseLandmarks.length; i++){
				p.fill(gameSession.skeleton.noseC);
				p.ellipse(gameSession.skeleton.nose.x * gameSession.canvasWidth, gameSession.skeleton.nose.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.leftShoulderC);
				p.ellipse(gameSession.skeleton.leftShoulder.x * gameSession.canvasWidth, gameSession.skeleton.leftShoulder.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.rightShoulderC);
				p.ellipse(gameSession.skeleton.rightShoulder.x * gameSession.canvasWidth, gameSession.skeleton.rightShoulder.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.leftElbowC);
				p.ellipse(gameSession.skeleton.leftElbow.x * gameSession.canvasWidth, gameSession.skeleton.leftElbow.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.rightElbowC);
				p.ellipse(gameSession.skeleton.rightElbow.x * gameSession.canvasWidth, gameSession.skeleton.rightElbow.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.leftWristC);
				p.ellipse(gameSession.skeleton.leftWrist.x * gameSession.canvasWidth, gameSession.skeleton.leftWrist.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.rightWristC);
				p.ellipse(gameSession.skeleton.rightWrist.x * gameSession.canvasWidth, gameSession.skeleton.rightWrist.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.leftHipC);
				p.ellipse(gameSession.skeleton.leftHip.x * gameSession.canvasWidth, gameSession.skeleton.leftHip.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.rightHipC);
				p.ellipse(gameSession.skeleton.rightHip.x * gameSession.canvasWidth, gameSession.skeleton.rightHip.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.leftKneeC);
				p.ellipse(gameSession.skeleton.leftKnee.x * gameSession.canvasWidth, gameSession.skeleton.leftKnee.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.rightKneeC);
				p.ellipse(gameSession.skeleton.rightKnee.x * gameSession.canvasWidth, gameSession.skeleton.rightKnee.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.leftAnkleC);
				p.ellipse(gameSession.skeleton.leftAnkle.x * gameSession.canvasWidth, gameSession.skeleton.leftAnkle.y * gameSession.canvasHeight, 50,50, 0);
				p.fill(gameSession.skeleton.rightAnkleC);
				p.ellipse(gameSession.skeleton.rightAnkle.x * gameSession.canvasWidth, gameSession.skeleton.rightAnkle.y * gameSession.canvasHeight, 50,50, 0);
			}
		}
		// gameSession.skeleton.render();
		
	}

	// setupBodyPartInfo = function(gameSession) {
	// 	//------------------------MAIN POSE 1--------------------------------
	// 	gameSession.mainPoses[0].poseCircles[0].addBodyPartInfo(gameSession.skeleton.leftWrist, gameSession,gameSession.skeleton.leftWristC,"L");

	// 	gameSession.mainPoses[0].poseCircles[1].addBodyPartInfo(gameSession.skeleton.rightWrist, gameSession, gameSession.skeleton.rightWristC, "R");

	// 	gameSession.mainPoses[0].poseCircles[2].addBodyPartInfo(gameSession.skeleton.rightAnkle, gameSession,gameSession.skeleton.rightAnkleC,"R");

	// 	gameSession.mainPoses[0].poseCircles[3].addBodyPartInfo(gameSession.skeleton.rightKnee, gameSession,gameSession.skeleton.rightKneeC,"R");
		
	// 	//------------------------MAIN POSE 2--------------------------------
	// 	gameSession.mainPoses[1].poseCircles[0].addBodyPartInfo(gameSession.skeleton.leftWrist, gameSession,gameSession.skeleton.leftWristC,"L");

	// 	gameSession.mainPoses[1].poseCircles[1].addBodyPartInfo(gameSession.skeleton.rightWrist, gameSession, gameSession.skeleton.rightWristC, "R");

	// 	gameSession.mainPoses[1].poseCircles[2].addBodyPartInfo(gameSession.skeleton.rightAnkle, gameSession,gameSession.skeleton.rightAnkleC,"R");

	// 	gameSession.mainPoses[1].poseCircles[3].addBodyPartInfo(gameSession.skeleton.rightKnee, gameSession,gameSession.skeleton.rightKneeC,"R");
		
	// 	//------------------------STIR POSE 1--------------------------------
	// 	gameSession.stirPoses[0].stirCircles[0].addBodyPartInfo(gameSession.skeleton.leftWrist,gameSession,gameSession.skeleton.leftWristC,"L")

	// 	gameSession.stirPoses[0].stirCircles[1].addBodyPartInfo(gameSession.skeleton.rightWrist,gameSession,gameSession.skeleton.rightWristC,"R")

	// 	//------------------------STIR POSE 2--------------------------------
	// 	gameSession.stirPoses[1].stirCircles[0].addBodyPartInfo(gameSession.skeleton.leftWrist,gameSession,gameSession.skeleton.leftWristC,"L")

	// 	gameSession.stirPoses[1].stirCircles[1].addBodyPartInfo(gameSession.skeleton.rightWrist,gameSession,gameSession.skeleton.rightWristC,"R")

	// 	gameSession.stirPoses[1].stirCircles[3].addBodyPartInfo(gameSession.skeleton.leftWrist,gameSession,gameSession.skeleton.leftWristC,"L")

	// 	gameSession.stirPoses[1].stirCircles[4].addBodyPartInfo(gameSession.skeleton.rightWrist,gameSession,gameSession.skeleton.rightWristC,"R")
	// }

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

