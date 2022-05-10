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

    
    this.add.image(400, -300, "sky")
    this.add.image(400, 300, "sky").rotation = 3.1415926;

    
    platforms = this.physics.add.staticGroup();

    //ground
    platforms.create(600, 568, "ground").setScale(2).refreshBody();
    platforms.create(200, 568, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground"); //platform 1
    platforms.create(50, 250, "ground"); //left 1
    platforms.create(250, 250, "ground"); //left 2
    platforms.create(750, 250, "ground");  //right 1
    
    platforms.create(150, 100, "ground"); //left 3
    platforms.create(225, -15, "tree"); //left tree 1
    platforms.create(225, -120, "treetopper"); //left treetopper 1
    platforms.create(150, -50, "ground"); //left 4
    
    platforms.create(550, 50, "ground"); //right 3
    platforms.create(850, 150, "ground"); //right 3
    platforms.create(475, -65, "tree"); //right tree 1
    platforms.create(475, -170, "treetopper"); //right treetopper 1
    platforms.create(550, -50, "ground"); //right 4

    player1 = this.physics.add.sprite(100, 450, "dude");
    player2 = this.physics.add.sprite(700, 450, "guy");
    cameraSetup = this.add.image(-900, 300, "star");

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
    keys = this.input.keyboard.addKeys({'A':65, 'D':68, 'W':87, 'S':83});

    stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: {x: 12, y: 0, stepX: 70}
    })
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player1, stars, collectStar1, null, this);
    this.physics.add.overlap(player2, stars, collectStar2, null, this);


    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);    
    this.physics.add.collider(player1, bombs, hitBomb, null, this);    
    this.physics.add.collider(player2, bombs, hitBomb, null, this);   
    
    this.cameras.main.setBounds(00, -600, 800, 1200)
    this.cameras.main.startFollow(cameraSetup)
};

function stopgame() {
    gygeyjhwiu.pause()
}




function update() {
    if(cameraSetup) {

        //cameraSetup.y -= 0.3;
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


function hitBomb(player, playerDeath) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");

    gameOver = true;
}

function offscreen() {
    this.physics.pause()
}