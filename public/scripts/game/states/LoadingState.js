import GameSession from "../../core/GameSession.js";
import State from "../../core/State.js";
/** Performs platform setup of the game before continuing:
 * 
 * 1. Setup Camera
 * 2. Wait for all assets to be loaded
 * 3. Wait for player permissions
 * 
 * Currently requires a video 
 */


export default class LoadingState extends State {

    constructor(){
        super("Loading");

        this.__cameraLoaded = false;

        //indicates if we have finished all of our loading tasks.
        this.__loaded = false;

        //local references to assets for cleaner code
        this.__loadingBackgroundImg = {};


    }

    setup(){
        super.setup();
        this.loadingBackgroundImg = this.gameSession.spriteManager.getSprite("loadingBackgroundImg");
        this.p5.image(this.loadingBackgroundImg, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight/2, this.gameSession.canvasWidth, this.gameSession.canvasHeight);

        //Show Gif
        //Show Text: Accept Camera Permissions
        //Load Camera

    }

    render(){
        super.render();
        //Background - using image for more flexibility
        this.p5.image(this.loadingBackgroundImg, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight/2, this.gameSession.canvasWidth, this.gameSession.canvasHeight);
        


    }

    
    update(){

        //Attempt to load camera. If successful, callback transitions session to main menu.
        if(!this.cameraLoaded){
            console.log("Loading camera...");
            this.loadCamera();
        } 

        
    }

    cleanup(){
        super.cleanup();

    }

    loadCamera(){
        const mpPose = window;
        const videoElement = document.getElementsByClassName('input_video')[0];

        //Attach results to gamesession whenever available
        function onResults(results) {
            let gameSession = new GameSession();
            gameSession.poseLandmarks = (results.poseLandmarks);
            gameSession.setCurrentStateByName("MainMenu");
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

        this.cameraLoaded = true;

    }

    get loaded(){
        return this.__loaded;
    }

    set loaded(loaded){
        this.__loaded = loaded;
    }

    get cameraLoaded(){
        return this.__cameraLoaded;
    }

    set cameraLoaded(cameraLoaded){
        this.__cameraLoaded = cameraLoaded;
    }

    get loadingBackgroundImg(){
        return this.__loadingBackgroundImg;
    }

    set loadingBackgroundImg(loadingBackgroundImg){
        this.__loadingBackgroundImg = loadingBackgroundImg;
    }
}