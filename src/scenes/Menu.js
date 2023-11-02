class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    preload(){
        this.load.image('menu','./assets/menu.png');
        this.load.audio('backgroundM', './assets/backgroundM.mp3');
        this.load.audio('click', './assets/click.mp3');
        this.load.audio('fail', './assets/fail.mp3');
        this.load.audio('jump', './assets/jump.mp3');
        this.load.audio('splat', './assets/splat.mp3');
    }
    
    create(){
        this.add.image(game.config.width/2,game.config.height/2,'menu');
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        /*if(Phaser.Input.Keyboard.JustDown(cursors.C)){
            this.scene.start('creditScene');
        }*/

        this.input.keyboard.on('keydown', (event) => {
            this.sound.play('click');
            this.scene.start('playScene');
        });
    }
}