import GameObject from "../core/GameObject.js";

export default class Circle extends GameObject {

    //constructor for building bones by using raw data from Offsete landmarks
    constructor(xOffset, yOffset, diameter, timeToHold, uiCircle, charge, text) {
        super(0, 0, 0, 0, 0, 0);
        this.__xOffset = xOffset;
        this.__yOffset = yOffset;
        this.__diameter = diameter;
        this.__timeToHold = timeToHold;
        this.__currentHoldTime = 0;
        this.__currentTime = this.p5.millis();
        this.__holdComplete = false;
        this.__isHolding = false;
        this.__uiCircle = uiCircle;
        this.__charge = charge;
        this.__bodyPart = {}
        this.__bodyPartColor = {};
        this.__gameSesh = {}
        this.__angle = (Math.random() * 180 / Math.PI)
        this.__text = text
    }

    // only add if poseLandmarks are present
    addBodyPartInfo(bodyPart, gameSesh, bodyPartColor, text) {
        this.bodyPart = bodyPart;
        this.gameSesh = gameSesh;
        this.bodyPartColor = bodyPartColor;
        this.__text = text
    }

    update(){
        this.p5.textSize(36)
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
        if (this.holdComplete == false) {
            this.p5.push()
            this.p5.translate((this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth) + this.xOffset, 
                (this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight) + this.yOffset);
            this.p5.rotate(this.__angle);
            this.p5.image(this.charge, 0, 0, this.diameter * 2, this.diameter * 2);
            this.p5.pop()
        }

        if (!this.checkInCircle(
                this.bodyPart.x * this.gameSesh.canvasWidth, 
                this.bodyPart.y * this.gameSesh.canvasHeight, 
                this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth, 
                this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight)) {
            this.p5.fill(this.bodyPartColor);
            this.p5.ellipse(this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth + this.__xOffset, this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight + this.yOffset, 50, 50, 0);
            this.p5.fill(this.p5.color("black"))
            this.p5.text(this.__text, this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth + this.__xOffset, this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight + this.yOffset)
        }

        this.p5.image(this.uiCircle, 
            (this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth) + this.xOffset, 
            (this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight) + this.yOffset, 
            this.diameter, this.diameter
        );
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

    get uiCircle() {
        return this.__uiCircle;
    }

    get charge() {
        return this.__charge;
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

    get bodyPartColor() {
        return this.__bodyPartColor;
    }

    get gameSesh() {
        return this.__gameSesh;
    }

    set uiCircle(uiCircle) {
        this.__uiCircle = uiCircle
    }

    set charge(charge) {
        this.__charge = charge
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

    set bodyPartColor(bodyPartColor) {
        this.__bodyPartColor = bodyPartColor;
    }

    set gameSesh(gameSesh) {
        this.__gameSesh = gameSesh;
    }
}