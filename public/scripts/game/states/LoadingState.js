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

    constructor(name){
        super(name);

        this.__cameraLoaded = false;

        //indicates if we have finished all of our loading tasks.
        this.__loaded = false;


    }

    setup(){
        super.setup();
        //Show Gif
        //Show Text: Accept Camera Permissions
        //Load Camera

    }

    render(){
        //TODO: render loading gif here



    }

    
    update(){

        //first attempt to load camera
        if(!this.cameraLoaded){
            console.log("Loading camera...");
            this.loadCamera();
        }
    }

    cleanup(){


    }

    loadCamera(){
        const mpPose = window;
        const videoElement = document.getElementsByClassName('input_video')[0];

        //Attach results to gamesession whenever available
        function onResults(results) {
            let gameSession = new GameSession();
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

        this.__cameraLoaded = true;
        console.log("Camera Loaded");
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
}