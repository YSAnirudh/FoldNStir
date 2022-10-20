import GameSession from "../../core/GameSession.js";
import State from "../../core/State.js";
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

        
    }

    setup(){
        super.setup();
    }

    render(){
        super.render();
    }

    update(){
        super.update();
    }

    cleanup(){
        super.update();
    }
}