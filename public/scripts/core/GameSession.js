
import SoundManager from "./Managers/SoundManager.js";
import TimeManager from "./Managers/TimeManager.js";
import ParticleManager from "./Managers/ParticleManager.js";
import SpriteManager from "./Managers/SpriteManager.js";
import ParticleSystemDefinitions from "./Effects/ParticleEffects/ParticleSystemDefinitions.js";

export default class GameSession{
	
	constructor() {
		if(GameSession.__instance){
			return GameSession.__instance;
		}
		GameSession.__instance = this;
		this.__instance = this;
		//Browser Information
		this.__canvasHeight = 0;
		this.__canvasWidth = 0;

		//Instance Variables
		this.__p5 = {}; //P5 instance
		this.__canvas = {}; //P5 Canvas
		this.__poseLandmarks = {}; //Pose landmarks 
		this.__skeleton = {}; //player skeleton
		this.__circle = {};
		this.__mainPoses = [];
		this.__stirPoses = [];
		this.__orderOfPoses = [];
		this.__currentPoseIndex = 0;
		this.__emptyPose = {};
		this.__benderCharacter = {};

		//Important Globals
		this.__backgroundColor = 0;
		this.__flashColor = 0;

		//SoundManager
		this.__soundManager = new SoundManager();

		//TimeManager
		this.__timeManager = new TimeManager();

		//Particle Manager
		this.__particleManager = new ParticleManager();

		//Sprite Manager
		this.__spriteManager = new SpriteManager();

		//Object stores particle system definitions
		this.__particleSystemDefinitions = new ParticleSystemDefinitions();
 
		console.log("Session Created Successfully.");
	}

	get skeleton(){
		return this.__skeleton;
	}

	set skeleton(skeleton){
		this.__skeleton = skeleton;
	}

	get circle(){
		return this.__circle;
	}

	set circle(circle){
		this.__circle = circle;
	}

	get mainPoses(){
		return this.__mainPoses;
	}

	set mainPoses(mainPoses){
		this.__mainPoses = mainPoses;
	}

	get emptyPose(){
		return this.__emptyPose;
	}

	set emptyPose(emptyPose){
		this.__emptyPose = emptyPose;
	}

	get stirPoses(){
		return this.__stirPoses;
	}

	set stirPoses(stirPoses){
		this.__stirPoses = stirPoses;
	}

	get orderOfPoses(){
		return this.__orderOfPoses;
	}

	set orderOfPoses(orderOfPoses){
		this.__orderOfPoses = orderOfPoses;
	}

	get currentPoseIndex(){
		return this.__currentPoseIndex;
	}

	set currentPoseIndex(currentPoseIndex){
		this.__currentPoseIndex = currentPoseIndex;
	}

	get benderCharacter(){
		return this.__benderCharacter;
	}

	set benderCharacter(benderCharacter){
		this.__benderCharacter = benderCharacter;
	}

	get poseLandmarks(){
		return this.__poseLandmarks;
	}

	set poseLandmarks(poseLandmarks){
		this.__poseLandmarks = poseLandmarks;
	}

	get instance(){
		return this.__instance;
	}

	set instance(instance){
		this.__instance = instance;
	}

	get p5(){
		return this.__p5;
	}
	set p5(p5){
		this.__p5 = p5;
	}

	get canvas(){
		return this.__canvas;
	}
	set canvas(canvas){
		this.__canvas = canvas;
	}

	get backgroundColor() {
		return this.__backgroundColor;
	}

	set backgroundColor(backgroundColor) {
		this.__backgroundColor = backgroundColor;
	}

	get flashColor() {
		return this.__flashColor;
	}

	set flashColor( flashColor ) {
		this.__flashColor = flashColor;
	}

	get soundManager(){
		return this.__soundManager;
	}

	set soundManager(soundManager){
		this.__soundManager = soundManager;
	}

	get timeManager() {
		return this.__timeManager;
	}

	set timeManager(timeManager) {
		this.__timeManager = timeManager;
	}

	get screenShakeManager() {
		return this.__screenShakeManager;
	}

	set screenShakeManager(screenShakeManager) {
		this.__screenShakeManager = screenShakeManager;
	}

	get particleManager() {
		return this.__particleManager;
	}

	set particleManager(particleManager) {
		this.__particleManager = particleManager;
	}

	get canvasHeight(){
		return this.__canvasHeight;
	}

	set canvasHeight(canvasHeight){
		this.__canvasHeight = canvasHeight;
	}

	get canvasWidth(){
		return this.__canvasWidth;
	}

	set canvasWidth(canvasWidth){
		this.__canvasWidth = canvasWidth;
	}
		
	get spriteManager() {
		return this.__spriteManager;
	}

	set spriteManager(spriteManager) {
		this.__spriteManager = spriteManager;
	}

	get particleSystemDefinitions() {
		return this.__particleSystemDefinitions;
	}

}
