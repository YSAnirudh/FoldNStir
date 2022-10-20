import GameObject from "../core/GameObject.js";

export default class EmptyPose extends GameObject {

    //constructor for building bones by using raw data from Offsete landmarks
    constructor(loadingTime) {
        super(0, 0, 0, 0, 0, 0);

        this.__holdComplete = false;
        this.__currentHoldTime = 0;
        this.__loadingTime = loadingTime;
        this.__currentTime = this.p5.millis();
    }

    //updates any model attributes of the bone
    update(){
        this.currentHoldTime = (this.p5.millis() - this.currentTime)/1000;
        if (this.__currentHoldTime >= this.__loadingTime) {
            this.holdComplete = true;
        } else {
            this.holdComplete = false;
        }
    }

    updateTime() {
        this.__currentTime = this.p5.millis();
    }

    //Adds bone to the canvas
    render(){
        
    }

    get currentTime() {
        return this.__currentTime
    }

    get loadingTime() {
        return this.__loadingTime;
    }

    get currentHoldTime() {
        return this.__currentHoldTime;
    }

    get holdComplete() {
        return this.__holdComplete;
    }

    set currentTime(currentTime) {
        this.__currentTime = currentTime;
    }

    set loadingTime(loadingTime) {
        this.__loadingTime = loadingTime;
    }

    set currentHoldTime(currentHoldTime) {
        this.__currentHoldTime = currentHoldTime;
    }

    set holdComplete(holdComplete) {
        this.__holdComplete = holdComplete;
    }
}