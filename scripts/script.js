//
// Available modules include (this is not a complete list):
// var Scene = require('Scene');
// var Textures = require('Textures');
// var Materials = require('Materials');
// var FaceTracking = require('FaceTracking');
// var Animation = require('Animation');
// var Reactive = require('Reactive');
//
// Example script
//
// Loading required modules
// var Scene = require('Scene');
// var FaceTracking = require('FaceTracking');
//
// Binding an object's property to a value provided by the face tracker
// Scene.root.child('object0').transform.rotationY = FaceTracking.face(0).transform.rotationX;
//
// If you want to log objects, use the Diagnostics module.
// var Diagnostics = require('Diagnostics');
// Diagnostics.log(Scene.root);

const D = require('Diagnostics');
const Reactive = require('Reactive');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const Animation = require('Animation');
const FaceTracking = require('FaceTracking');
const Audio = require('Audio');

class BaseState {

    constructor() {
        this.world = Scene.root
            .child("Device")
            .child("Camera")
            .child("Focal Distance")
        this.faceTracker = this.world
            .child("facetracker0");
        this.canvas2d = this.world
            .child("2DCanvas0")

        // Disposable pool.
        this.disposables = [];
    }

    enter() {
        // DUMMY IMPL.
    }

    exit() {
        // Dispose the disposables.
        this.disposables.forEach((d) => {
            D.log(d)
            d.unsubscribe();
        });
    }

    next(next) {
        this.next = next;
        return this;
    }

    gotoNext() {
        this.exit();
        if (this.next instanceof BaseState) {
            this.next.enter();
        }
    }
}

class IdleState extends BaseState {

    enter() {
        D.log("enter: IdleState")
        
        this.btnStart = this.canvas2d.child("btn_start")
        this.btnStart.hidden = false

        this.objCountdown = this.canvas2d.child("img_countdown")
        this.objCountdown.hidden = true
        
        // FIXME: CompositeDisposables???
        this.disposables.push(TouchGestures
            .onTap(this.btnStart)
            .subscribe((event) => { 
                this.btnStart.hidden = true
                // Start the game.
                this.gotoNext()
            }))
    }

    exit() {
        D.log("exit: IdleState")
        super.exit();
    }
}

class GamingState extends BaseState {

    enter() {
        D.log("enter: GamingState")
        
        // Play BGM.
        Audio.play(Scene.root
            .child("Device")
            .child("Camera")
            .child("Focal Distance")
            .child("bgm"))

        // this.faceTracker.face(0).mouth.openness
    }

    exit() {
        D.log("exit: GamingState")
    }
}

new IdleState()
    .next(new GamingState())
    //     .next(GameOverState()))
    .enter()

