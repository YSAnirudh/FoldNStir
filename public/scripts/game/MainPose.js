import GameObject from "../core/GameObject.js";

export default class MainPose extends GameObject {

    //constructor for building bones by using raw data from Offsete landmarks
    constructor(timeToHold, sweatEffect) {
        super(0, 0, 0, 0, 0, 0);

        this.__poseCircles = [];

        this.__timeToHold = timeToHold;
        this.__currentHoldTime = 0;
        this.__currentTime = this.p5.millis();
        this.__holdComplete = false;
        this.__allHolding = false;
        this.__holdCount = 0;
        this.__sweatEffect = sweatEffect;
    }

    addCircle(circle) {
        this.__poseCircles.push(circle);
    }

    //updates any model attributes of the bone
    update(gameSession){
        for (let i = 0; i < this.poseCircles.length; i++) {
            this.poseCircles[i].update()
        }

        this.p5.textSize(48)
        this.__currentHoldTime = (this.p5.millis() - this.__currentTime)/1000;

        let time = "Time: " + this.p5.floor(this.__currentHoldTime);
        let tohold = "To Hold: " + this.timeToHold;
        this.p5.fill(255);
        this.p5.text(time, 50, 50);
        this.p5.text(tohold, 50, 150);
        
        this.holdCount = 0;
        for (let i = 0; i < this.poseCircles.length; i++) {
            if (this.poseCircles[i].isHolding) {
                this.holdCount++;
            }
        }

        if (this.holdCount == this.poseCircles.length) {
            this.allHolding = true;
        } else {
            this.allHolding = false;
        }

        if (this.__allHolding) {
            
            if (this.__currentHoldTime >= this.__timeToHold) {
                this.holdComplete = true;
                for (let i = 0; i < this.poseCircles.length; i++) {
                    this.poseCircles[i].holdComplete = true;
                }
                this.__allHolding = false;
            }
        } else {
            this.__currentTime = this.p5.millis();
        }

        if (this.__allHolding && !this.holdComplete) {
            let centerX, centerY;
            centerX = (gameSession.skeleton.leftShoulder.x * gameSession.canvasWidth + gameSession.skeleton.rightShoulder.x * gameSession.canvasWidth) / 2;
            centerY = (gameSession.skeleton.leftShoulder.y * gameSession.canvasHeight + gameSession.skeleton.rightShoulder.y * gameSession.canvasHeight) / 2;
            let drawSweatDistance = this.getDistance(centerX, centerY, gameSession.skeleton.nose.x * gameSession.canvasWidth, gameSession.skeleton.nose.y * gameSession.canvasHeight)
            this.p5.image(this.sweatEffect, gameSession.skeleton.nose.x * gameSession.canvasWidth, gameSession.skeleton.nose.y * gameSession.canvasHeight, drawSweatDistance * 4, drawSweatDistance * 4)
        }

        if (this.holdComplete) {
            this.__currentTime = this.p5.millis();
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

    get poseCircles() {
        return this.__poseCircles;
    }

    get sweatEffect() {
        return this.__sweatEffect;
    }

    get timeToHold() {
        return this.__timeToHold;
    }

    get currentHoldTime() {
        return this.__currentHoldTime;
    }
    
    get currentTime() {
        return this.__currentTime;
    }
    
    get holdComplete() {
        return this.__holdComplete;
    }

    get allHolding() {
        return this.__allHolding;
    }

    get holdCount() {
        return this.__holdCount;
    }

    set poseCircles(poseCircles) {
        this.__poseCircles = poseCircles;
    }
    
    set sweatEffect(sweatEffect) {
        this.__sweatEffect = sweatEffect;
    }

    set timeToHold(timeToHold) {
        this.__timeToHold = timeToHold;
    }

    set currentHoldTime(currentHoldTime) {
        this.__currentHoldTime = currentHoldTime;
    }

    set currentTime(currentTime) {
        this.__currentTime = currentTime;
    }

    set holdComplete(holdComplete) {
        this.__holdComplete = holdComplete;
    }

    set allHolding(allHolding) {
        this.__allHolding = allHolding;
    }

    set holdCount(holdCount) {
        this.__holdCount = holdCount;
    }
}