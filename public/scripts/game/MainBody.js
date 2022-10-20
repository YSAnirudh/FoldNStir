import GameObject from "../core/GameObject.js";

export default class MainBody extends GameObject {

    //constructor for building bones by using raw data from Offsete landmarks
    constructor(bodyParts) {
        super(0, 0, 0, 0, 0, 0);
        this.__bodyParts = bodyParts;
    }

    // only add if poseLandmarks are present
    drawBodyPart(index, bodyPart1X, bodyPart1Y, bodyPart2X, bodyPart2Y, imageSizeMultiplier, angleOffset, horizontalImage, heightMult, widthMult) {
        let angle = this.getAngle(bodyPart1X, bodyPart1Y, bodyPart2X, bodyPart2Y) + angleOffset;
        
        let midPointX = (bodyPart1X + bodyPart2X) / 2;
        let midPointY = (bodyPart1Y + bodyPart2Y) / 2;

        this.p5.push()
        this.p5.translate(midPointX, midPointY)
        this.p5.rotate(angle)
        let imageHeight = this.getDistance(bodyPart1X, bodyPart1Y, bodyPart2X, bodyPart2Y)
        if (horizontalImage) {
            this.p5.image(this.bodyParts[index], 0, 0, imageHeight * heightMult, imageHeight * imageSizeMultiplier * widthMult)
        } else {
            this.p5.image(this.bodyParts[index], 0, 0, imageHeight * imageSizeMultiplier * heightMult, imageHeight * widthMult)
        }
        this.p5.pop()
    }

    update(gameSession){
        
    }

    getAngle(x1, y1, x2, y2) {
		let angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
		return angle;
	}

    getDistance(posInfoX, posInfoY, circlePosX, circlePosY) {
		return Math.sqrt((posInfoX - circlePosX)*(posInfoX - circlePosX) + (posInfoY - circlePosY)*(posInfoY - circlePosY));
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

    drawHead(bottomNeckX, bottomNeckY, noseX, noseY) {
        let angle = this.getAngle(bottomNeckX, bottomNeckY, noseX, noseY) + 90;
        
        this.p5.push()
        this.p5.translate(noseX, noseY)
        this.p5.rotate(angle)
        let imageHeight = this.getDistance(bottomNeckX, bottomNeckY, noseX, noseY)
        this.p5.image(this.bodyParts[0], 0, 0, imageHeight * 1.5, imageHeight * 2)
        this.p5.pop()
    }

    drawTorso(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
        let centerX, centerY, centerHipX, centerHipY;

        centerX = (((p1x + p2x) / 2) + ((p3x + p4x) / 2)) / 2;
        centerY = (((p1y + p2y) / 2) + ((p3y + p4y) / 2)) / 2;

        centerHipX = (p3x + p4x) / 2;
        centerHipY = (p3y + p4y) / 2;

        let angle = this.getAngle(centerHipX, centerHipY, centerX, centerY) + 90;
        
        this.p5.push()
        this.p5.translate(centerX, centerY)
        this.p5.rotate(angle)
        let imageHeight = this.getDistance(centerHipX, centerHipY, centerX, centerY)
        this.p5.image(this.bodyParts[9], 0, 0, (imageHeight * 2) * (6/7) * 1.1, imageHeight * 2 * 1.1)
        this.p5.pop()
    }

    //Adds bone to the canvas
    render(gameSession){
        let centerX, centerY;
        centerX = (gameSession.skeleton.leftShoulder.x * gameSession.canvasWidth + gameSession.skeleton.rightShoulder.x * gameSession.canvasWidth) / 2;
        centerY = (gameSession.skeleton.leftShoulder.y * gameSession.canvasHeight + gameSession.skeleton.rightShoulder.y * gameSession.canvasHeight) / 2;

        this.drawHead(centerX, centerY, gameSession.skeleton.nose.x * gameSession.canvasWidth, gameSession.skeleton.nose.y * gameSession.canvasHeight)

        this.drawTorso(
            gameSession.skeleton.rightShoulder.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightShoulder.y * gameSession.canvasHeight, 
            gameSession.skeleton.leftShoulder.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftShoulder.y * gameSession.canvasHeight,
            gameSession.skeleton.leftHip.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftHip.y * gameSession.canvasHeight, 
            gameSession.skeleton.rightHip.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightHip.y * gameSession.canvasHeight)

        this.drawBodyPart(1, 
            gameSession.skeleton.leftShoulder.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftShoulder.y * gameSession.canvasHeight, 
            gameSession.skeleton.leftElbow.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftElbow.y * gameSession.canvasHeight,
            0.666,
            0,
            true,
            1.2,
            1.1
        );

        this.drawBodyPart(2, 
            gameSession.skeleton.leftElbow.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftElbow.y * gameSession.canvasHeight, 
            gameSession.skeleton.leftWrist.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftWrist.y * gameSession.canvasHeight,
            (122/220),
            0,
            true,
            1.1,
            1.7
        )

        this.drawBodyPart(10, 
            gameSession.skeleton.leftWrist.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftWrist.y * gameSession.canvasHeight, 
            gameSession.skeleton.leftIndex.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftIndex.y * gameSession.canvasHeight,
            91/149,
            0,
            true,
            2.5,3
        )

        this.drawBodyPart(3, 
            gameSession.skeleton.leftHip.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftHip.y * gameSession.canvasHeight, 
            gameSession.skeleton.leftKnee.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftKnee.y * gameSession.canvasHeight,
            0.5,
            -90,
            false,
            1,
            1.1
        )

        this.drawBodyPart(4, 
            gameSession.skeleton.leftKnee.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftKnee.y * gameSession.canvasHeight, 
            gameSession.skeleton.leftAnkle.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftAnkle.y * gameSession.canvasHeight,
            (162/170),
            -90,
            false,
            1,
            1.1
        )

        this.drawBodyPart(5, 
            gameSession.skeleton.rightElbow.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightElbow.y * gameSession.canvasHeight,
            gameSession.skeleton.rightShoulder.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightShoulder.y * gameSession.canvasHeight, 
            0.666,
            0,
            true,
            1.2,
            1.1
        );

        this.drawBodyPart(6, 
            gameSession.skeleton.rightWrist.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightWrist.y * gameSession.canvasHeight,
            gameSession.skeleton.rightElbow.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightElbow.y * gameSession.canvasHeight, 
            (87/210),
            0,
            true,
            1.1,
            1.7
        )

        this.drawBodyPart(12,  
            gameSession.skeleton.rightIndex.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightIndex.y * gameSession.canvasHeight,
            gameSession.skeleton.rightWrist.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightWrist.y * gameSession.canvasHeight,
            92/154,
            180,
            true,
            2.5,3
        )

        this.drawBodyPart(7, 
            gameSession.skeleton.rightKnee.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightKnee.y * gameSession.canvasHeight,
            gameSession.skeleton.rightHip.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightHip.y * gameSession.canvasHeight, 
            (109/197),
            90,
            false,
            1,
            1.1
        )

        this.drawBodyPart(8, 
            gameSession.skeleton.rightKnee.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightKnee.y * gameSession.canvasHeight, 
            gameSession.skeleton.rightAnkle.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightAnkle.y * gameSession.canvasHeight,
            168/150,
            -90,
            false,
            0.9,
            1.1
        )
        
        this.drawBodyPart(11, 
            gameSession.skeleton.leftHeel.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftHeel.y * gameSession.canvasHeight, 
            gameSession.skeleton.leftFootIndex.x * gameSession.canvasWidth, 
            gameSession.skeleton.leftFootIndex.y * gameSession.canvasHeight,
            124/190,
            -90,
            false,
            1,1
        )

        this.drawBodyPart(13, 
            gameSession.skeleton.rightFootIndex.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightFootIndex.y * gameSession.canvasHeight,
            gameSession.skeleton.rightHeel.x * gameSession.canvasWidth, 
            gameSession.skeleton.rightHeel.y * gameSession.canvasHeight,
            123/200,
            -90,
            false,
            1,1
        )

    }

    get bodyParts() {
        return this.__bodyParts;
    }

    set bodyParts(bodyParts) {
        this.__bodyParts = bodyParts;
    }
}