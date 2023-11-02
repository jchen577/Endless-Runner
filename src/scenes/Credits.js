class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }
    
    preload(){
        this.load.image('credit','./assets/credit.png');
    }
    
    create(){
        this.add.image(game.config.width/2,game.config.height/2,'credit');
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        this.input.keyboard.on('keydown', (event) => {
            this.sound.play('click');
            this.scene.start('menuScene');
        });
    }
}