import GameObject from "../core/GameObject.js";

export default class StirCircle extends GameObject {

    //constructor for building bones by using raw data from Offsete landmarks
    constructor(xOffset, yOffset, diameter, timesToStir, nextCircleOffsetX, nextCircleOffsetY, uiCircle, charge) {
        super(0, 0, 0, 0, 0, 0);
        this.__xOffset = xOffset;
        this.__yOffset = yOffset;
        this.__diameter = diameter;
        this.__timesToStir = timesToStir;
        this.__currentStirTimes = 0;
        this.__stirComplete = false;
        this.__nextCircleOffsetX = nextCircleOffsetX;
        this.__nextCircleOffsetY = nextCircleOffsetY;
        this.__bodyPart = {}
        this.__gameSesh = {}
        this.__nextStir = false;
        this.__uiCircle = uiCircle;
        this.__charge = charge;
        this.__bodyPartColor = {};
        this.__angle = (Math.random() * 180 / Math.PI)
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
        if (this.stirComplete == false) {
            if (!this.nextStir) {
                this.p5.push()
                this.p5.translate((this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth) + this.xOffset, 
                    (this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight) + this.yOffset);
                this.p5.rotate(this.__angle);
                this.p5.image(this.charge,  0,0, this.diameter * 2, this.diameter * 2);
                this.p5.pop()

                if (this.checkInCircle(
                    this.bodyPart.x * this.gameSesh.canvasWidth, 
                    this.bodyPart.y * this.gameSesh.canvasHeight, 
                    this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth, 
                    this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight, false)) {
                    this.nextStir = true;
                } else {
                    this.p5.fill(this.p5.color('red'))
                }
            } else {
                this.p5.push()
                this.p5.translate((this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth) + this.xOffset + this.nextCircleOffsetX, 
                    (this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight) + this.yOffset + this.nextCircleOffsetY);
                this.p5.rotate(this.__angle);
                this.p5.image(this.charge, 0,0, this.diameter * 2, this.diameter * 2);
                this.p5.pop()

                if (this.checkInCircle(
                    this.bodyPart.x * this.gameSesh.canvasWidth, 
                    this.bodyPart.y * this.gameSesh.canvasHeight, 
                    this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth, 
                    this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight, true)) {
                    this.nextStir = false;
                    this.timesToStir--;
                    if (this.timesToStir == 0) {
                        this.stirComplete = true;
                    }
                } else {
                    this.p5.fill(this.p5.color('red'))
                }
            }
        } else {
            this.p5.fill(this.p5.color('green'))
        }

        if (!this.nextStir) {
            this.p5.ellipse(this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth + this.__xOffset, this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight + this.yOffset, this.__diameter, this.__diameter, 0);
            
            if (!this.checkInCircle(
                this.bodyPart.x * this.gameSesh.canvasWidth, 
                this.bodyPart.y * this.gameSesh.canvasHeight, 
                this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth, 
                this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight, false)) {
                this.p5.fill(this.bodyPartColor);
                this.p5.ellipse(this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth + this.__xOffset, this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight + this.yOffset, 50, 50, 0);
            }
            this.p5.image(this.uiCircle, 
                (this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth) + this.xOffset, 
                (this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight) + this.yOffset, 
                this.diameter, this.diameter);
            
            this.p5.fill(this.p5.color("black"))
            this.p5.text(this.__text, this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth + this.__xOffset, this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight + this.yOffset)
        } else {
            this.p5.ellipse(
                this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth + this.__xOffset + this.nextCircleOffsetX, 
                this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight + this.yOffset + this.nextCircleOffsetY, 
                this.__diameter, this.__diameter, 0
            );

            if (!this.checkInCircle(
                this.bodyPart.x * this.gameSesh.canvasWidth, 
                this.bodyPart.y * this.gameSesh.canvasHeight, 
                this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth, 
                this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight, true)) {
                this.p5.fill(this.bodyPartColor);
                this.p5.ellipse(
                    this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth + this.__xOffset + this.nextCircleOffsetX, 
                    this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight + this.yOffset + this.nextCircleOffsetY, 
                    50, 50, 0
                );
            }
            this.p5.image(this.uiCircle, 
                (this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth) + this.xOffset + this.nextCircleOffsetX, 
                (this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight) + this.yOffset + this.nextCircleOffsetY, 
                this.diameter, this.diameter);

            this.p5.fill(this.p5.color("black"))
            this.p5.text(this.__text, this.gameSesh.skeleton.nose.x * this.gameSesh.canvasWidth + this.__xOffset + this.nextCircleOffsetX, this.gameSesh.skeleton.nose.y * this.gameSesh.canvasHeight + this.yOffset + this.nextCircleOffsetY)
        }
    }

    checkInCircle(posInfoX, posInfoY, noseX, noseY, nextStir) {
        let xPos, yPos;
        if (nextStir) {
            xPos = noseX + this.__xOffset + this.nextCircleOffsetX;
            yPos = noseY + this.__yOffset + this.nextCircleOffsetY;
        } else {
            xPos = noseX + this.__xOffset;
            yPos = noseY + this.__yOffset;
        }

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

    get timesToStir() {
        return this.__timesToStir;
    }
    
    get currentStirTimes() {
        return this.__currentStirTimes;
    }

    get currentTime() {
        return this.__currentTime;
    }

    get stirComplete() {
        return this.__stirComplete;
    }

    get nextCircleOffsetX() {
        return this.__nextCircleOffsetX;
    }


    get nextCircleOffsetY() {
        return this.__nextCircleOffsetY;
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

    get nextStir() {
        return this.__nextStir;
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

    set timesToStir(timesToStir) {
        this.__timesToStir = timesToStir;
    }

    set currentHoldTime(currentHoldTime) {
        this.__currentHoldTime = currentHoldTime;
    }

    set currentStirTimes(currentStirTimes) {
        this.__currentStirTimes = currentStirTimes;
    }

    set stirComplete(stirComplete) {
        this.__stirComplete = stirComplete;
    }

    set nextCircleOffsetX(nextCircleOffsetX) {
        this.__nextCircleOffsetX = nextCircleOffsetX;
    }
    
    set nextCircleOffsetY(nextCircleOffsetY) {
        this.__nextCircleOffsetY = nextCircleOffsetY;
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

    set nextStir(nextStir) {
        this.__nextStir = nextStir;
    }
}