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
        this.load.spritesheet('playerWalk','./assets/spritesheet.png',{frameWidth:32 , frameHeight: 64});
    }

    create(){
        this.physics.world.gravity.y = 1000;
        this.MAX_VELOCITY = 300;
        this.DRAG = 200;
        this.ACCELERATION = 500;
        this.MAX_JUMPS = 1;
        this.JUMP_VELOCITY = -400;
        this.spikeAdd = false;

        this.ground = this.add.group();
        this.spikes = this.add.group();
        this.sky = this.add.tileSprite(0,0,0,0,'sky').setOrigin(0,0);
        this.mountains = this.add.tileSprite(0,0,0,0,'mountains').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0,0,0,0,'clouds').setOrigin(0,0);
        this.fog = this.add.tileSprite(0,480-128,0,0,'fog').setOrigin(0,0);
        
        //Sprites
        /*this.spike = this.physics.add.sprite(640,Phaser.Math.Between((480-64),32),'spike');
        this.spike.body.allowGravity = false;
        this.spike.body.setImmovable(true);
        this.spike.setVelocityX(-300);*/
        
        this.cursors = this.input.keyboard.createCursorKeys();

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        for(let i = 0; i < game.config.width; i += tileSize){
            let groundTile = this.physics.add.sprite(i+1,game.config.height - tileSize,'gCloud').setOrigin(0,0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundScroll').setOrigin(0);
        this.anims.generateFrameNumbers('playerWalk',{start:0 , end: 4});
        this.player = this.physics.add.sprite(120,game.config.height/2-tileSize,'playerWalk',0);
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
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player,this.ground);
        this.physics.add.collider(this.player,this.spikes);
    }

    update(){
        this.sky.tilePositionX +=1;
        this.mountains.tilePositionX += 2;
        this.clouds.tilePositionX += 4;
        this.fog.tilePositionX += 4;
        this.groundScroll.tilePositionX += 10;

        if(Phaser.Math.Between(0,100) == 2 && this.spikeAdd == false){
            let height = Phaser.Math.Between(32,(480-164));
            let num = Phaser.Math.Between(1,3);
            for(let i = 0; i < num; i++){
                let spike = this.spike = this.physics.add.sprite(640+(i*32),height,'spike');
                this.spike.body.allowGravity = false;
                this.spike.body.setImmovable(true);
                this.spike.setVelocityX(-300);
                this.spikes.add(spike)
            }
        }

        this.player.isGrounded = this.player.body.touching.down;
	    if(this.player.isGrounded) {
            this.player.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } //else {
	    	//this.alien.anims.play('jump')
	    //}

        if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(this.cursors.up, 150)) {
	        this.player.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    }

        if(this.jumping && Phaser.Input.Keyboard.UpDuration(this.cursors.up)) {
	    	this.jumps--
	    	this.jumping = false
	    }

        if(this.cursors.left.isDown) {
            this.player.body.setAccelerationX(-this.ACCELERATION);
            this.player.setFlip(true, false);
            this.player.anims.play('walk', true);
        } else if(this.cursors.right.isDown) {
            this.player.body.setAccelerationX(this.ACCELERATION);
            this.player.resetFlip();
            this.player.anims.play('walk', true);
        } else {
            this.player.body.setAccelerationX(0);
            this.player.body.setDragX(this.DRAG);
            this.player.anims.play('walk',true);
        }
        if(this.player.body.velocity.x >= this.MAX_VELOCITY){
            this.player.body.velocity.x = this.MAX_VELOCITY;
        }
        if(this.player.body.velocity.x <= -this.MAX_VELOCITY){
            this.player.body.velocity.x = -this.MAX_VELOCITY;
        }
    }
}