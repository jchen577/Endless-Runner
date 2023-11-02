class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    preload(){
        this.load.image('menu','./assets/menu.png');
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
            this.scene.start('playScene');
        });
    }
}