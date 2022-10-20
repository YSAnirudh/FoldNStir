import GameObject from "../core/GameObject.js";

export default class StirPose extends GameObject {

    //constructor for building bones by using raw data from Offsete landmarks
    constructor(sweatEffect) {
        super(0, 0, 0, 0, 0, 0);

        this.__stirCircles = [];
        this.__stirCount = 0;
        this.__holdComplete = false;
        this.__allStirred = false;
        this.__sweatEffect = sweatEffect;
    }

    addStirCircle(stirCircle) {
        this.__stirCircles.push(stirCircle);
    }

    //updates any model attributes of the bone
    update(gameSession){
        for (let i = 0; i < this.stirCircles.length; i++) {
            this.stirCircles[i].update()
        }
        
        this.stirCount = 0;
        for (let i = 0; i < this.stirCircles.length; i++) {
            if (this.stirCircles[i].stirComplete) {
                this.stirCount++;
            }
        }

        if (this.stirCount == this.stirCircles.length) {
            this.allStirred = true;
            this.__holdComplete = true;
        } else {
            this.allStirred = false;
            this.__holdComplete = false;
        }

        if (!this.allStirred) {
            let centerX, centerY;
            centerX = (gameSession.skeleton.leftShoulder.x * gameSession.canvasWidth + gameSession.skeleton.rightShoulder.x * gameSession.canvasWidth) / 2;
            centerY = (gameSession.skeleton.leftShoulder.y * gameSession.canvasHeight + gameSession.skeleton.rightShoulder.y * gameSession.canvasHeight) / 2;
            let drawSweatDistance = this.getDistance(centerX, centerY, gameSession.skeleton.nose.x * gameSession.canvasWidth, gameSession.skeleton.nose.y * gameSession.canvasHeight)
            this.p5.image(this.sweatEffect, gameSession.skeleton.nose.x * gameSession.canvasWidth, gameSession.skeleton.nose.y * gameSession.canvasHeight, drawSweatDistance * 4, drawSweatDistance * 4)
        }
    }

    getDistance(posInfoX, posInfoY, circlePosX, circlePosY) {
		return Math.sqrt((posInfoX - circlePosX)*(posInfoX - circlePosX) + (posInfoY - circlePosY)*(posInfoY - circlePosY));
	}

    updateTime() {
        
    }

    //Adds bone to the canvas
    render(){

    }

    get sweatEffect() {
        return this.__sweatEffect;
    }

    get stirCircles() {
        return this.__stirCircles;
    }

    get stirCount() {
        return this.__stirCount;
    }
    
    get holdComplete() {
        return this.__holdComplete;
    }

    get allStirred() {
        return this.__allStirred;
    }

    set sweatEffect(sweatEffect) {
        this.__sweatEffect = sweatEffect;
    }

    set stirCircles(stirCircles) {
        this.__stirCircles = stirCircles
    }

    set stirCount(stirCount) {
        this.__stirCount = stirCount
    }

    set holdComplete(holdComplete) {
        this.__holdComplete = holdComplete;
    }

    set allStirred(allStirred) {
        this.__allStirred = allStirred;
    }
}