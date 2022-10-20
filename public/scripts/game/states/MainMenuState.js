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

        
    }

    setup(){
        super.setup();
        this.mainMenuImg = this.gameSession.spriteManager.getSprite("mainMenuImg");
        this.p5.image(this.mainMenuImg, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight/2, this.gameSession.canvasWidth, this.gameSession.canvasHeight);

    }

    render(){
        super.render();
        this.p5.image(this.mainMenuImg, this.gameSession.canvasWidth/2, this.gameSession.canvasHeight/2, this.gameSession.canvasWidth, this.gameSession.canvasHeight);

    }

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
}