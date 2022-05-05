let canvasWidth = 800;

let config = {
    type: Phaser.AUTO,
    parent: 'game-box',
    width: canvasWidth,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


//better idea: teamwork game like space invaders


let game = new Phaser.Game(config);
let platforms;
let player;
let cursors;
let stars;
var cameraSetup = 0;
cameraChange = 1;

let bombs;

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("tree", "assets/tree.png");
    this.load.image("treetopper", "assets/treetopper.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", 
        { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet("guy", "assets/guy.png", 
        { frameWidth: 32, frameHeight: 48 });
}

function create() {

    
    this.add.image(400, 300, "sky").setScale(0.5).setTint(0x4f4f3f);

    
    platforms = this.physics.add.staticGroup();
    enemies = this.physics.add.staticGroup();

    //ground
    platforms.create(600, 568, "ground").setScale(2).refreshBody();


    player1 = this.physics.add.sprite(100, 450, "dude");
    player2 = this.physics.add.sprite(700, 450, "dude");

    player1.setBounce(0.2);
    player1.setCollideWorldBounds(true)
    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true)

    this.anims.create({
        key: "left",
    
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3}),
    
        frameRate: 10,
    
        repeat: -1
    });
    
    this.anims.create({
        key: "turn",
    
        frames: [{key: "dude", frame: 4}],
    
        frameRate: 20,
    });
    
    this.anims.create({
        key: "right",
    
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8}),
    
        frameRate: 10,
    
        repeat: -1
    });

    this.anims.create({
        key: "left2",
    
        frames: this.anims.generateFrameNumbers("guy", { start: 0, end: 3}),
    
        frameRate: 10,
    
        repeat: -1
    });
    
    this.anims.create({
        key: "turn2",
    
        frames: [{key: "guy", frame: 4}],
    
        frameRate: 20,
    });
    
    this.anims.create({
        key: "right2",
    
        frames: this.anims.generateFrameNumbers("guy", { start: 5, end: 8}),
    
        frameRate: 10,
    
        repeat: -1
    });

    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);


    cursors = this.input.keyboard.createCursorKeys();
    console.log(cursors)
    keys = this.input.keyboard.addKeys({'A':65, 'D':68, 'W':87, 'S':83, 'Space':32});



    this.physics.add.overlap(player1, stars, collectStar1, null, this);
    this.physics.add.overlap(player2, stars, collectStar2, null, this);


};




function update() {
    if(cameraSetup >= 100) { 
        spawnEnemy();
    }

    if(cameraSetup <= 0) { 
        spawnEnemy();
        cameraChange = 1
        
    }
    if cameraSetup {
        cameraSetup += cameraChange;
    }

    if (keys.A.isDown) {
        player1.setVelocityX(-160);

        player1.anims.play("left", true);
    } else if (keys.D.isDown) {
        player1.setVelocityX(160);

        player1.anims.play("right", true);
    } else {
        player1.setVelocityX(0);

        player1.anims.play("turn");
    }

    if (keys.W.isDown && player1.body.touching.down) {
        player1.setVelocityY(-330);
    }


    
    if (cursors.left.isDown) {
        player2.setVelocityX(-160);

        player2.anims.play("left", true);
    } else if (cursors.right.isDown) {
        player2.setVelocityX(160);

        player2.anims.play("right", true);
    } else {
        player2.setVelocityX(0);

        player2.anims.play("turn");
    }

    if (cursors.up.isDown && player2.body.touching.down) {
        player2.setVelocityY(-330);
    }

};

function collectStar1(player, star) {
    star.disableBody(true, true)

    changeTextIncrament1()

}

function collectStar2(player, star) {
    star.disableBody(true, true)
    changeTextIncrament2()
}

function spawnEnemy() {
        enemies.create(Phaser.Math.Between(0, 200), Phaser.Math.Between(0, 600), "platform")

}