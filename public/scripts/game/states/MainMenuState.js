import GameSession from "../../core/GameSession.js";
import State from "../../core/State.js";
/** Displays options before continuing. For now just has start game.
 * 
 * 1. On click - if in a button, activate button.
 * 
 * TODO: I need to write an interface module for this.
 * 
 */

export default class MainMenuState extends State {

    constructor(){
        super("MainMenu");

        this.__mainMenuImg = {};
        this.__startGameBtnImg = {};
        this.__startGameBtnHoverImg = {};
        this.__startGameBtnPressImg = {};
        
        //button normal
        //button hover
        //button clickdown

        
    }

    setup(){
        super.setup();
        this.mainMenuImg = this.gameSession.spriteManager.getSprite("mainMenuImg");
        this.p5.image(this.mainMenuImg, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight/2, this.gameSession.canvasWidth, this.gameSession.canvasHeight);
        this.startGameBtnImg = this.gameSession.spriteManager.getSprite("startGameBtnImg");
        this.startGameBtnHoverImg = this.gameSession.spriteManager.getSprite("startGameBtnHoverImg");
        this.startGameBtnPressImg = this.gameSession.spriteManager.getSprite("startGameBtnPressImg");

       
    }

    render(){
        super.render();
        //background
        this.renderBackground();
        this.renderButton();

        //check for mouse cursor, render appropriate button state
        //TODO: Really need to just build a UI library.
        let mouseX = this.p5.mouseX;
        let mouseY = this.p5.mouseY;
        if(this.pointInStartButtonBounds(mouseX, mouseY)){
            if(!this.p5.mouseIsPressed){
                this.renderButtonHover();
            } else {
                this.renderButtonPress();
            }
        } else {
            this.renderButton();
        }

        //see if it is in button area


        
    }

    pointInStartButtonBounds(x, y){
        let minX = this.gameSession.canvasWidth/2 - this.gameSession.canvasWidth/6; 
        let minY = this.gameSession.canvasHeight*7/10 - this.gameSession.canvasHeight/16;
        let maxX = this.gameSession.canvasWidth/2 + this.gameSession.canvasWidth/6; 
        let maxY = this.gameSession.canvasHeight*7/10 + this.gameSession.canvasHeight/16;
        let withinX = x >= minX && x <= maxX;
        let withinY = y >= minY && y <= maxY;
        return withinX && withinY; 
    }

    renderBackground(){
        this.p5.push();
        this.p5.image(this.mainMenuImg, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight/2, this.gameSession.canvasWidth, this.gameSession.canvasHeight);
        this.p5.pop();
    }

    //render button
    renderButton(){
        this.p5.push();
        this.p5.image(this.startGameBtnImg, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight*7/10, this.gameSession.canvasWidth/3, this.gameSession.canvasHeight/8);
        this.p5.pop();
    }

    renderButtonHover(){
        this.p5.push();
        this.p5.image(this.startGameBtnHoverImg, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight*7/10,  this.gameSession.canvasWidth/3, this.gameSession.canvasHeight/8);
        this.p5.pop();
    }

    renderButtonPress(){
        this.p5.push();
        this.p5.image(this.startGameBtnPressImg, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight*7/10,  this.gameSession.canvasWidth/3, this.gameSession.canvasHeight/8);
        this.p5.pop();
    }

    mouseReleased(){
        super.mouseReleased();
        let mouseX = this.p5.mouseX;
        let mouseY = this.p5.mouseY;
        if(this.pointInStartButtonBounds(mouseX, mouseY)){
            this.gameSession.setCurrentStateByName("Game");
        }
    }

    //on click down: move button/replace button

    //on click up: start game state

    update(){
        super.update();
    }

    cleanup(){
        super.update();
    }

    get mainMenuImg(){
        return this.__mainMenuImg;
    }

    set mainMenuImg(mainMenuImg){
        this.__mainMenuImg = mainMenuImg;
    }

    get startGameBtnImg(){
        return this.__startGameBtnImg;
    }

    set startGameBtnImg(startGameBtnImg){
        this.__startGameBtnImg = startGameBtnImg;
    }

    get startGameBtnHoverImg(){
        return this.__startGameBtnHoverImg;
    }

    set startGameBtnHoverImg(startGameBtnHoverImg){
        this.__startGameBtnHoverImg = startGameBtnHoverImg;
    }
}