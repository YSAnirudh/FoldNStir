import GameSession from "../../core/GameSession.js";
import State from "../../core/State.js";
import Circle from "../Circle.js";
import StirCircle from "../StirCircle.js";
import MainPose from "../MainPose.js";
import StirPose from "../StirPose.js";
import EmptyPose from "../EmptyPose.js";
import MainBody from "../MainBody.js";

/** Loads the main interaction of the game before continuing.
 * 
 *  1. Renders a background
 *  2. Takes poseLandmarks and renders a skeleton
 *  3. Loads relevant game items (charge pack, etc.)
 *  4. Goes through 4 poses
 *  5. Transition to game over
 * 
 * Alt: Game over on empty charge pack for 5 seconds
 */

export default class GameState extends State {

    constructor(){
        super("Game");

        this.__gameBackground = {};
        this.__chargeEffectBefore = {};
        this.__circleUI = {};
        this.__sweatEffect = {};

        this.__benderBodyParts = {};

    }

    setup(){
        super.setup();
        this.gameBackground = this.gameSession.spriteManager.getSprite("gameBackground");
        this.p5.image(this.gameBackground, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight/2, this.gameSession.canvasWidth, this.gameSession.canvasHeight);

        this.circleUI = this.gameSession.spriteManager.getSprite("circleUI");
        this.sweatEffect = this.gameSession.spriteManager.getSprite("sweatEffect");
        this.chargeEffectBefore = this.gameSession.spriteManager.getSprite("chargeEffectBefore");
        this.benderBodyParts = this.gameSession.benderBodyParts;

        // -----------------------BENDING POSE----------------------------------
		//------------------------MAIN POSE 1--------------------------------
		let circle11 = new Circle(this.gameSession.canvasWidth * (15/100), this.gameSession.canvasHeight * (50/100), this.gameSession.canvasHeight * (13/100), 4, this.circleUI, this.chargeEffectBefore);
		let circle12 = new Circle(-this.gameSession.canvasWidth * (15/100), this.gameSession.canvasHeight * (50/100), this.gameSession.canvasHeight * (13/100), 4, this.circleUI, this.chargeEffectBefore);
		let circle13 = new Circle(this.gameSession.canvasWidth * (7/100), this.gameSession.canvasHeight * (46/100), this.gameSession.canvasHeight * (13/100), 4, this.circleUI, this.chargeEffectBefore);
		let circle14 = new Circle(-this.gameSession.canvasWidth * (7/100), this.gameSession.canvasHeight * (46/100), this.gameSession.canvasHeight * (13/100), 4, this.circleUI, this.chargeEffectBefore);
		this.gameSession.mainPoses.push(new MainPose(10, this.sweatEffect));
		this.gameSession.mainPoses[0].addCircle(circle11);
		this.gameSession.mainPoses[0].addCircle(circle12);
		this.gameSession.mainPoses[0].addCircle(circle13);
		this.gameSession.mainPoses[0].addCircle(circle14);
		
		// -----------------------TREE POSE----------------------------------
		//------------------------MAIN POSE 2--------------------------------
		let circle01 = new Circle(this.gameSession.canvasWidth * (1.5/100), -this.gameSession.canvasHeight * (20/100), this.gameSession.canvasHeight * (13/100), 4, this.circleUI, this.chargeEffectBefore);
		let circle02 = new Circle(-this.gameSession.canvasWidth * (1.5/100), -this.gameSession.canvasHeight * (20/100), this.gameSession.canvasHeight * (13/100), 4, this.circleUI, this.chargeEffectBefore);
		let circle03 = new Circle(-this.gameSession.canvasWidth * (1.5/100), this.gameSession.canvasHeight * (40/100), this.gameSession.canvasHeight * (14/100), 4, this.circleUI, this.chargeEffectBefore);
		let circle04 = new Circle(-this.gameSession.canvasWidth * (9/100), this.gameSession.canvasHeight * (33/100), this.gameSession.canvasHeight * (14/100), 4, this.circleUI, this.chargeEffectBefore);
		this.gameSession.mainPoses.push(new MainPose(4, this.sweatEffect));
		this.gameSession.mainPoses[1].addCircle(circle01);
		this.gameSession.mainPoses[1].addCircle(circle02);
		this.gameSession.mainPoses[1].addCircle(circle03);
		this.gameSession.mainPoses[1].addCircle(circle04);

		// -----------------------BASIC STIR POSE----------------------------------
		//------------------------STIR POSE 1--------------------------------
		let stirCircle01 = new StirCircle(this.gameSession.canvasWidth * (20/100), -this.gameSession.canvasHeight * (10/100), this.gameSession.canvasHeight * (13/100), 5, this.gameSession.canvasWidth * (0/100), this.gameSession.canvasHeight * (20/100), this.circleUI, this.chargeEffectBefore);
		let stirCircle02 = new StirCircle(-this.gameSession.canvasWidth * (20/100), -this.gameSession.canvasHeight * (0/100), this.gameSession.canvasHeight * (13/100), 5, this.gameSession.canvasWidth * (1/100), this.gameSession.canvasHeight * (20/100), this.circleUI, this.chargeEffectBefore);
		this.gameSession.stirPoses.push(new StirPose(this.sweatEffect));
		this.gameSession.stirPoses[0].addStirCircle(stirCircle01)
		this.gameSession.stirPoses[0].addStirCircle(stirCircle02)

		// -----------------------HANDS AND LEGS STIR POSE----------------------------------
		//------------------------STIR POSE 2--------------------------------
		let stirCircle11 = new StirCircle(this.gameSession.canvasWidth * (20/100), -this.gameSession.canvasHeight * (0/100), this.gameSession.canvasHeight * (13/100), 10, this.gameSession.canvasWidth * (-1/100), this.gameSession.canvasHeight * (20/100), this.circleUI, this.chargeEffectBefore);
		let stirCircle12 = new StirCircle(-this.gameSession.canvasWidth * (20/100), -this.gameSession.canvasHeight * (10/100), this.gameSession.canvasHeight * (13/100), 30, this.gameSession.canvasWidth * (0/100), this.gameSession.canvasHeight * (20/100), this.circleUI, this.chargeEffectBefore);
		let stirCircle13 = new StirCircle(this.gameSession.canvasWidth * (9/100), this.gameSession.canvasHeight * (45/100), this.gameSession.canvasHeight * (13/100), 10, this.gameSession.canvasWidth * (-8/100), this.gameSession.canvasHeight * (0/100), this.circleUI, this.chargeEffectBefore);
		let stirCircle14 = new StirCircle(-this.gameSession.canvasWidth * (12/100), this.gameSession.canvasHeight * (43/100), this.gameSession.canvasHeight * (13/100), 10, this.gameSession.canvasWidth * (8/100), this.gameSession.canvasHeight * (2/100), this.circleUI, this.chargeEffectBefore);
		this.gameSession.stirPoses.push(new StirPose(this.sweatEffect));
		this.gameSession.stirPoses[1].addStirCircle(stirCircle11)
		this.gameSession.stirPoses[1].addStirCircle(stirCircle12)
		this.gameSession.stirPoses[1].addStirCircle(stirCircle13)
		this.gameSession.stirPoses[1].addStirCircle(stirCircle14)
		
		// -----------------------EMPTY POSE---------------------------------
		this.gameSession.emptyPose = new EmptyPose(5);

		this.gameSession.benderCharacter = new MainBody(this.gameSession.benderBodyParts);

		this.gameSession.orderOfPoses = []
		this.gameSession.orderOfPoses.push(this.gameSession.mainPoses[0]);
		this.gameSession.orderOfPoses.push(this.gameSession.emptyPose);
		this.gameSession.orderOfPoses.push(this.gameSession.stirPoses[0]);
		this.gameSession.orderOfPoses.push(this.gameSession.emptyPose);
		this.gameSession.orderOfPoses.push(this.gameSession.mainPoses[1]);
		this.gameSession.orderOfPoses.push(this.gameSession.emptyPose);
		this.gameSession.orderOfPoses.push(this.gameSession.stirPoses[1]);

		this.gameSession.currentPoseIndex = 0;

        
    }

    render(){
        super.render();
        //render background
        this.p5.image(this.gameBackground, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight/2, this.gameSession.canvasWidth, this.gameSession.canvasHeight);

        if(this.gameSession.poseLandmarks.length >= 1){
			this.p5.imageMode(this.p5.CENTER);
			this.p5.strokeWeight(0);
			//------------------------POSE LOGIC READY BELOW--------------------------------
			this.gameSession.benderCharacter.render(this.gameSession);
			
			
			//------------------------MAIN POSE 1--------------------------------
			this.gameSession.mainPoses[0].poseCircles[0].addBodyPartInfo(this.gameSession.skeleton.leftAnkle, this.gameSession,this.gameSession.skeleton.leftAnkleC,"L");

			this.gameSession.mainPoses[0].poseCircles[1].addBodyPartInfo(this.gameSession.skeleton.rightAnkle, this.gameSession, this.gameSession.skeleton.rightAnkleC, "R");

			this.gameSession.mainPoses[0].poseCircles[2].addBodyPartInfo(this.gameSession.skeleton.leftWrist, this.gameSession,this.gameSession.skeleton.leftWristC,"L");

			this.gameSession.mainPoses[0].poseCircles[3].addBodyPartInfo(this.gameSession.skeleton.rightWrist, this.gameSession,this.gameSession.skeleton.rightWristC,"R");
			
			//------------------------MAIN POSE 2--------------------------------
			this.gameSession.mainPoses[1].poseCircles[0].addBodyPartInfo(this.gameSession.skeleton.leftWrist, this.gameSession,this.gameSession.skeleton.leftWristC,"L");

			this.gameSession.mainPoses[1].poseCircles[1].addBodyPartInfo(this.gameSession.skeleton.rightWrist, this.gameSession, this.gameSession.skeleton.rightWristC, "R");

			this.gameSession.mainPoses[1].poseCircles[2].addBodyPartInfo(this.gameSession.skeleton.rightAnkle, this.gameSession,this.gameSession.skeleton.rightAnkleC,"R");

			this.gameSession.mainPoses[1].poseCircles[3].addBodyPartInfo(this.gameSession.skeleton.rightKnee, this.gameSession,this.gameSession.skeleton.rightKneeC,"R");
			
			//------------------------STIR POSE 1--------------------------------
			this.gameSession.stirPoses[0].stirCircles[0].addBodyPartInfo(this.gameSession.skeleton.leftWrist,this.gameSession,this.gameSession.skeleton.leftWristC,"L")

			this.gameSession.stirPoses[0].stirCircles[1].addBodyPartInfo(this.gameSession.skeleton.rightWrist,this.gameSession,this.gameSession.skeleton.rightWristC,"R")

			//------------------------STIR POSE 2--------------------------------
			this.gameSession.stirPoses[1].stirCircles[0].addBodyPartInfo(this.gameSession.skeleton.leftWrist,this.gameSession,this.gameSession.skeleton.leftWristC,"L")

			this.gameSession.stirPoses[1].stirCircles[1].addBodyPartInfo(this.gameSession.skeleton.rightWrist,this.gameSession,this.gameSession.skeleton.rightWristC,"R")

			this.gameSession.stirPoses[1].stirCircles[2].addBodyPartInfo(this.gameSession.skeleton.leftAnkle,this.gameSession,this.gameSession.skeleton.leftAnkleC,"L")

			this.gameSession.stirPoses[1].stirCircles[3].addBodyPartInfo(this.gameSession.skeleton.rightAnkle,this.gameSession,this.gameSession.skeleton.rightAnkleC,"R")

			while (this.gameSession.currentPoseIndex < this.gameSession.orderOfPoses.length) {
				this.gameSession.orderOfPoses[this.gameSession.currentPoseIndex].update(this.gameSession);

				if (this.gameSession.orderOfPoses[this.gameSession.currentPoseIndex].holdComplete) {
					this.gameSession.currentPoseIndex++;
					this.gameSession.orderOfPoses[this.gameSession.currentPoseIndex].updateTime();
				} else {
					break;
				}
			}

			//------------------------COLOR CODING JOINTS BELOW--------------------------------
			
			// Should be done at the end
			for(let i = 0; i < this.gameSession.poseLandmarks.length; i++){
				this.p5.fill(this.gameSession.skeleton.noseC);
				this.p5.ellipse(this.gameSession.skeleton.nose.x * this.gameSession.canvasWidth, this.gameSession.skeleton.nose.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.leftShoulderC);
				this.p5.ellipse(this.gameSession.skeleton.leftShoulder.x * this.gameSession.canvasWidth, this.gameSession.skeleton.leftShoulder.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.rightShoulderC);
				this.p5.ellipse(this.gameSession.skeleton.rightShoulder.x * this.gameSession.canvasWidth, this.gameSession.skeleton.rightShoulder.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.leftElbowC);
				this.p5.ellipse(this.gameSession.skeleton.leftElbow.x * this.gameSession.canvasWidth, this.gameSession.skeleton.leftElbow.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.rightElbowC);
				this.p5.ellipse(this.gameSession.skeleton.rightElbow.x * this.gameSession.canvasWidth, this.gameSession.skeleton.rightElbow.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.leftWristC);
				this.p5.ellipse(this.gameSession.skeleton.leftWrist.x * this.gameSession.canvasWidth, this.gameSession.skeleton.leftWrist.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.rightWristC);
				this.p5.ellipse(this.gameSession.skeleton.rightWrist.x * this.gameSession.canvasWidth, this.gameSession.skeleton.rightWrist.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.leftHipC);
				this.p5.ellipse(this.gameSession.skeleton.leftHip.x * this.gameSession.canvasWidth, this.gameSession.skeleton.leftHip.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.rightHipC);
				this.p5.ellipse(this.gameSession.skeleton.rightHip.x * this.gameSession.canvasWidth, this.gameSession.skeleton.rightHip.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.leftKneeC);
				this.p5.ellipse(this.gameSession.skeleton.leftKnee.x * this.gameSession.canvasWidth, this.gameSession.skeleton.leftKnee.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.rightKneeC);
				this.p5.ellipse(this.gameSession.skeleton.rightKnee.x * this.gameSession.canvasWidth, this.gameSession.skeleton.rightKnee.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.leftAnkleC);
				this.p5.ellipse(this.gameSession.skeleton.leftAnkle.x * this.gameSession.canvasWidth, this.gameSession.skeleton.leftAnkle.y * this.gameSession.canvasHeight, 50,50, 0);
				this.p5.fill(this.gameSession.skeleton.rightAnkleC);
				this.p5.ellipse(this.gameSession.skeleton.rightAnkle.x * this.gameSession.canvasWidth, this.gameSession.skeleton.rightAnkle.y * this.gameSession.canvasHeight, 50,50, 0);
			}
        }
    }

    update(){
        super.update();
    }

    cleanup(){
        super.update();
    }

    get gameBackground(){
        return this.__gameBackground;
    }

    set gameBackground(gameBackground){
        this.__gameBackground = gameBackground;
    }

    get sweatEffect(){
        return this.__sweatEffect;
    }

    set sweatEffect(sweatEffect){
        this.__sweatEffect = sweatEffect;
    }

    get circleUI(){
        return this.__circleUI;
    }

    set circleUI(circleUI){
        this.__circleUI = circleUI;
    }

    get chargeEffectBefore(){
        return this.__chargeEffectBefore;
    }

    set chargeEffectBefore(chargeEffectBefore){
        this.__chargeEffectBefore = chargeEffectBefore;
    }

    get benderBodyParts(){
        return this.__benderBodyParts;
    }

    set benderBodyParts(benderBodyParts){
        this.__benderBodyParts = benderBodyParts;
    }
}