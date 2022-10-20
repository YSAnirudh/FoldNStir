/* 
 * State Class 
 * 
 * The state class allows us to group different rendering and update functions of relevant gameobjects
 * into a single object to be loaded at the top-level of the application. These can be thought of as
 * "scenes" in other engines, though a bit more integration is needed in the entry point of the application.
 * 
 * A State should essentially encapsulate a discrete "form" of your game. For example, a simple game might
 * have a loading state, game state, pause state... the boundaries of this definition is fairly porous.
 * 
 * States can be nested - meaning you can embed a state engine within another. Adding a switch in the 
 * update and render functions with the appropriate state checking accomplishes this.
 * 
 * The top-level state should be maintained in the Game Session. 
 * 
*/

import GameSession from "./GameSession.js";

export default class State {

    constructor(name){
        
        this.__name = name;

        //link to gameSession
        this.__gameSession = new GameSession();
        this.__gameSession.addStateToGame(this);

    }

    //call before first update to perform first time setup
    setup(){
        console.log("Setting up " + this.name) + " state.";
    }

    //make updates to any relevant model/data
    update(){

    }

    //make updates to display
    render(){

    }

    //call after leaving main context for the engine. Manage memory and state appropriately
    cleanup(){
        console.log("Cleaning up " + this.name) + " state.";
    }

    get name(){
        return this.__name;
    }

    set name(name){
        this.__name = name;
    }

    get gameSession(){
        return this.__gameSession;
    }

    set gameSession(gameSession){
        this.__gameSession = gameSession;
    }
}