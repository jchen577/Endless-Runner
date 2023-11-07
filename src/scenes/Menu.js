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
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keyC)){
            cTrack = true;
            this.scene.start('creditScene');
        }else{

        this.input.keyboard.on('keydown', (event) => {
            if(cTrack == true){
                this.sound.play('click');
                this.scene.start('playScene');
            }
            this.clock = this.time.delayedCall(100,()=>{
                cTrack = true;
            });

        });
    }
    }
}