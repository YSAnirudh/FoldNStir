import GameObject from "../core/GameObject.js";

export default class Circle extends GameObject {

    //constructor for building bones by using raw data from Offsete landmarks
    constructor(xOffset, yOffset, diameter, timeToHold) {
        super(0, 0, 0, 0, 0, 0);
        this.__xOffset = xOffset;
        this.__yOffset = yOffset;
        this.__diameter = diameter;
        this.__timeToHold = timeToHold;
        this.__currentHoldTime = 0;
        this.__currentTime = this.p5.millis();
        this.__holdComplete = false;
        this.__isHolding = false;
        this.__bodyPart = {}
        this.__gameSesh = {}
    }

    // only add if poseLandmarks are present
    addBodyPartInfo(bodyPart, gameSesh) {
        this.bodyPart = bodyPart;
        this.gameSesh = gameSesh;
    }

    update(){
        //look for collisions
        if (this.holdComplete == false) {
            if (this.checkInCircle(
                this.bodyPart.x * this.gameSesh.canvasWidth, 
                this.bodyPart.y * this.gameSesh.canvasHeight, 
                this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth, 
                this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight)) {
                this.__isHolding = true;
                this.p5.fill(this.p5.color('yellow'))
            } else {
                this.__isHolding = false;
                this.p5.fill(this.p5.color('red'))
            }
        } else {
            this.p5.fill(this.p5.color('green'))
        }

        this.p5.ellipse(this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth + this.__xOffset, this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight + this.yOffset, this.__diameter, this.__diameter, 0);
    }

    checkInCircle(posInfoX, posInfoY, noseX, noseY) {
        let xPos = noseX + this.__xOffset;
        let yPos = noseY + this.__yOffset;

		let distance = ((posInfoX - xPos)*(posInfoX - xPos)) + ((posInfoY - yPos)*(posInfoY - yPos));
		if (distance <= (this.diameter/2 * this.diameter/2)) {
			return true;
		}
		else {
			return false;
		}
	}

    //Adds bone to the canvas
    render(){
        this.p5.stroke(0);
        this.p5.strokeWeight(0);
        this.p5.line(this.startX, this.startY, this.endX, this.endY);
    }

    get xOffset() {
        return this.__xOffset;
    }

    get yOffset() {
        return this.__yOffset;
    }

    get diameter() {
        return this.__diameter;
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

    get isHolding() {
        return this.__isHolding;
    }

    get bodyPart() {
        return this.__bodyPart;
    }

    get gameSesh() {
        return this.__gameSesh;
    }

    set xOffset(xOffset) {
        this.__xOffset = xOffset
    }

    set yOffset(yOffset) {
        this.__yOffset = yOffset;
    }

    set diameter(diameter) {
        this.__diameter = diameter;
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

    set isHolding(isHolding) {
        this.__isHolding = isHolding;
    }

    set bodyPart(bodyPart) {
        this.__bodyPart = bodyPart;
    }

    set gameSesh(gameSesh) {
        this.__gameSesh = gameSesh;
    }
}