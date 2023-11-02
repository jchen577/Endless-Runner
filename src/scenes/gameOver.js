class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload(){
        this.load.image('gameOver','./assets/gameover.png');
    }

    create(){
        this.add.image(game.config.width/2,game.config.height/2,'gameOver');

        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keyR)){
            this.sound.play('click');
            this.scene.start('playScene');
        }

        /*if(Phaser.Input.Keyboard.JustDown(this.keyM)){
            this.sound.play('click');
            this.scene.start('menuScene');
        }*/
    }
}