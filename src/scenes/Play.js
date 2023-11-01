class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('clouds','./assets/clouds.png');
        this.load.image('sky','./assets/sky.png');
        this.load.image('mountains','./assets/mountains.png');
        this.load.image('gCloud','./assets/cloud.png');
        this.load.image('groundScroll','./assets/groundScroll.png');
        this.load.image('fog','./assets/fog.png');
        this.load.image('spike','./assets/spike.png');
        this.load.image('platform','./assets/platform.png');
        this.load.spritesheet('playerWalk','./assets/spritesheet.png',{frameWidth:32 , frameHeight: 64});
    }

    create(){
        this.physics.world.gravity.y = 1000;
        this.gameOver = false;

        this.ground = this.add.group();
        this.spikesG = this.add.group({runChildUpdate:true});
        this.spikesG = this.add.group();
        this.sky = this.add.tileSprite(0,0,0,0,'sky').setOrigin(0,0);
        this.mountains = this.add.tileSprite(0,0,0,0,'mountains').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0,0,0,0,'clouds').setOrigin(0,0);
        this.fog = this.add.tileSprite(0,480-128,0,0,'fog').setOrigin(0,0);
        
        //Sprites
        /*keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);*/

        for(let i = 0; i < game.config.width; i += tileSize){
            let groundTile = this.physics.add.sprite(i+1,game.config.height - tileSize,'gCloud').setOrigin(0,0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundScroll').setOrigin(0);

        //setting up player
        this.anims.generateFrameNumbers('playerWalk',{start:0 , end: 4});
        this.player = new Player(this,120,game.config.height/2-tileSize,'playerWalk',0);
        this.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
        }, [this, this.player]);
        this.anims.create({ 
            key: 'walk', 
            frames: this.anims.generateFrameNames('playerWalk', {      
                prefix: '',
                start: 0,
                end: 4,
            }), 
            frameRate: 30,
            repeat: -1 
        })

        this.keys = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player,this.ground);
        this.physics.add.collider(this.player,this.spikesG,(player1,gspike)=>{
            this.player.destroy();
            this.gameOver = true;
            this.scene.start('gameOverScene')
        });
        
        //spawn a new set of spikes every second
        this.sTimer = this.time.addEvent({
            callback: this.addSpikes,
            callbackScope: this,
            delay: 1000, // 1000 = 1 second
            loop: true,
        });

        this.sTimer = this.time.addEvent({
            callback: this.addPlatforms,
            callbackScope: this,
            startAt: 500,
            delay: 1000, // 1000 = 1 second
            loop: true,
        });
    }

    update(){
        if(!this.gameOver){
            //Moving the background tiles
            this.sky.tilePositionX +=1;
            this.mountains.tilePositionX += 2;
            this.clouds.tilePositionX += 4;
            this.fog.tilePositionX += 4;
            this.groundScroll.tilePositionX += 10;
            this.playerFSM.step();
        }
        else{
            this.spikesG.clear(true,true);
        }
    }

    addSpikes(){
        let height = Phaser.Math.Between(164,(480-64));
        let num = Phaser.Math.Between(1,3);
            for(let i = 0; i < num; i++){
                let spike = new Platform(this,640+(i*32),height,'spike',0,-300);
                this.spikesG.add(spike);
            }
    }
    
    addPlatforms(){
        let height = Phaser.Math.Between(164,(480-64));
        let num = Phaser.Math.Between(1,3);
            for(let i = 0; i < num; i++){
                let spike = new Platform(this,640+(i*32),height,'platform',0,-300);
                //this.spikesG.add(spike);
            }
    }
}