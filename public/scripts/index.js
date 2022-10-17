import GameSession from "./core/GameSession.js";
import Skeleton from "./game/Skeleton.js";

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
	
	//Executed before beginning setup
	p.preload = function() {
	
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

		


	}

	//core update function of the game
	p.draw = function(){
		//System updates first
		gameSession.timeManager.update();
		gameSession.skeleton.update();

		//Renders last and from back to front. Clear before going.
		p.clear();
		p.background(p.color(gameSession.backgroundColor)); 
		gameSession.particleManager.render();

		if(gameSession.poseLandmarks.length >= 1){
			for(let i = 0; i < gameSession.poseLandmarks.length; i++){
				p.ellipse(gameSession.poseLandmarks[i].x * gameSession.canvasWidth, gameSession.poseLandmarks[i].y * gameSession.canvasHeight, gameSession.poseLandmarks[i].z*100, gameSession.poseLandmarks[i].z*100);
			}

		}

		gameSession.skeleton.render();
		
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

