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
        this.load.image('spike2','./assets/spike2.png');
        this.load.image('platform','./assets/platform.png');
        this.load.spritesheet('playerWalk','./assets/spritesheet.png',{frameWidth:32 , frameHeight: 64});
    }

    create(){
        this.physics.world.gravity.y = 1000;
        this.gameOver = false;
        this.score = 0;
        this.speed = -300;
        this.mult = 1;


        this.ground = this.add.group();
        this.spikesG = this.add.group({runChildUpdate:true});
        this.cloudsG = this.add.group({runChildUpdate:true});
        this.platformG = this.add.group({runChildUpdate:true});
        this.sky = this.add.tileSprite(0,0,0,0,'sky').setOrigin(0,0);
        this.mountains = this.add.tileSprite(0,0,0,0,'mountains').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0,0,0,0,'clouds').setOrigin(0,0);
        this.fog = this.add.tileSprite(0,480-128,0,0,'fog').setOrigin(0,0);
        

        this.bgm = this.sound.add('backgroundM', { 
            mute: false,
            volume: 0.1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

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

        //set things that the player can collide with
        this.physics.add.collider(this.player,this.ground);
        this.physics.add.collider(this.player,this.platformG);
        this.physics.add.collider(this.player,this.cloudsG);
        this.physics.add.collider(this.player,this.spikesG,(player1,gspike)=>{//If player collides with spike, die
            this.player.destroy();
            this.gameOver = true;
            this.sound.play('splat');
            this.scene.start('gameOverScene');
        });

        
        //spawn a new set of obejcts every second
        this.sTimer = this.time.addEvent({
            callback: this.addObject,
            callbackScope: this,
            delay: 500, // 1000 = 1 second
            loop: true,
        });

        this.sTimer2 = this.time.addEvent({
            callback: this.addScore,
            callbackScope: this,
            startAt: 500,
            delay: 1000, // 1000 = 1 second
            loop: true,
        });

        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            backgroundColor: '#ADD8E6',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:0,
        }
        this.scoreT = this.add.text(60, 20, `Score: ${this.score}`,this.scoreConfig).setOrigin(0.5);

    }

    update(){
        if(!this.gameOver){//Do only if the character is still alive
            //Moving the background tiles
            this.sky.tilePositionX +=1;
            this.mountains.tilePositionX += 2;
            this.clouds.tilePositionX += 4;
            this.fog.tilePositionX += 4;
            this.groundScroll.tilePositionX += 10;
            this.playerFSM.step();

            this.scoreT.setText(`Score: ${this.score}`);
            if(this.player.x < 0){
                this.player.destroy();
                this.gameOver = true;
                this.scene.start('gameOverScene');
                this.sound.play('splat');
            }
        }
        else{
            this.spikesG.clear(true,true);
        }
    }

    addSpikes(){
        let height = Phaser.Math.Between(164,(480-64));
        let num = Phaser.Math.Between(1,3);
            for(let i = 0; i < num; i++){
                let spike = new Platform(this,640+(i*32),height,'spike',0,this.speed*this.mult);
                this.spikesG.add(spike);
            }
    }
    
    addClouds(){
        let height = Phaser.Math.Between(164,(480-64));
        let num = Phaser.Math.Between(1,3);
            for(let i = 0; i < num; i++){
                let spike = new Platform(this,640+(i*32),height,'gCloud',0,this.speed*this.mult);
                this.cloudsG.add(spike);
            }
    }

    addPlatforms(){
        let height = Phaser.Math.Between(164,(480-64));
        let num = Phaser.Math.Between(1,3);
            for(let i = 0; i < num; i++){
                let spike = new Platform(this,640+(i*32),height,'platform',0,this.speed*this.mult);
                spike.body.checkCollision.down = false;
                spike.body.checkCollision.left = false;
                spike.body.checkCollision.right = false;
                this.platformG.add(spike);
            }
    }

    addObject(){
        let randNum = Math.round(Math.random()*3);
        if(randNum == 1){
            this.addPlatforms();
        }
        else if(randNum == 2){
            this.addSpikes();
        }
        else if(randNum ==3){
            this.addClouds();
        }
    }

    addScore(){
        this.score += 10;
        if(this.score%100 == 0 && this.score > 100){
            this.mult += 0.25;
        }
    }
}