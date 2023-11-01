class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload(){
        this.load.image('gameOver','./assets/gameover.png');
    }

    create(){
        this.add.image(game.config.width/2,game.config.height/2,'gameOver');

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start('playScene');
        }
    }
}