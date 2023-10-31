class Spikes extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.parentScene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(-300);
        this.body.allowGravity = false;
        this.body.setImmovable(true);
    }
    update(){

        if(this.x <= 0 -this.width){
            this.reset();
        }
    }
    reset(){
        this.destroy();
    }
}