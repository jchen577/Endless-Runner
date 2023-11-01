class Platform extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, frame,velocity) {
        super(scene, x, y, texture, frame);
        //Add the object to the existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //Set object values
        this.setVelocityX(velocity);
        this.body.allowGravity = false;
        this.body.setImmovable(true);
    }
    update(){
        if(this.x <= 0 -this.width){//If object leaves the screen, destroy it
            this.reset();
        }
    }
    reset(){
        this.destroy();
    }
}