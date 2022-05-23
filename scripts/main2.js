let canvasWidth = 800;


let config = {
    type: Phaser.AUTO,
    parent: 'game-box',
    width: canvasWidth,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: -10 },
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
    this.load.spritesheet("lemon", "assets/lemon.png", 
        { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet("guy", "assets/guy.png", 
        { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet("cronala", "assets/cronala.png", 
        { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet("cronala2", "assets/cronala2.png", 
        { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet("fireball", "assets/fireball.png", 
        { frameWidth: 18, frameHeight: 10 });
        
}


function makeEnemy() {}
function makeFastEnemy() {}
function create() {
    
    //for movement - adds cursors and keys so it works when you press buttons
    cursors = this.input.keyboard.createCursorKeys();
    console.log(cursors)
    keys = this.input.keyboard.addKeys({'A':65, 'D':68, 'W':87, 'S':83, 'Space':32, 'ctrl':17});
    
    
    
    this.add.image(400, 300, "sky").setScale(0.5).setTint(0x4f4f6f);
    
    
    platforms = this.physics.add.staticGroup();
    enemies = this.physics.add.group({allowGravity: false, immovable: true});
    fastEnemies = this.physics.add.group({allowGravity: false, immovable: true});
    fireballs = this.physics.add.group({allowGravity: false, immovable: true});
    
    fireball = fireballs.create(200, 200, "fireball")


    makeEnemy.prototype.make = function(x, y, image) {
        reply = enemies.create(x, y, image);
    }
    makeFastEnemy.prototype.make = function(x, y, image) {
        reply2 = fastEnemies.create(x, y, image);
    }




    //ground
    platforms.create(600, 568, "ground").setScale(2).refreshBody();

    

    player1shadow = this.physics.add.sprite(100, 450, "lemon", {allowGravity: false}).setTint(0);
    player1 = this.physics.add.sprite(100, 450, "lemon", {allowGravity: false});
    player2shadow = this.physics.add.sprite(700, 450, "lemon", {allowGravity: false}).setTint(0);
    player2 = this.physics.add.sprite(700, 450, "lemon", {allowGravity: false});

    player1.setBounce(0.2);
    player1.setCollideWorldBounds(true)
    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true)

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("lemon", { start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: "turn",
        frames: [{key: "lemon", frame: 4}],
        frameRate: 20,
    });
    
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("lemon", { start: 2, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("lemon", { start: 7, end: 8}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("lemon", { start: 4, end: 5}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "moveCronala",
        frames: this.anims.generateFrameNumbers("cronala", {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: "moveCronala2",
        frames: this.anims.generateFrameNumbers("cronala2", {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "animateFire",
        frames: this.anims.generateFrameNumbers("fireball", {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });


    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player1, enemies);
    this.physics.add.collider(player2, enemies);

    this.physics.add.overlap(player1, stars, collectStar1, null, this);
    this.physics.add.overlap(player2, stars, collectStar2, null, this);


};




function update() {
    if(cameraSetup >= 100) { 
        spawnEnemy();
        spawnFastEnemy();
        cameraChange = -1
    }

    if(cameraSetup <= 0) { 
        spawnEnemy();
        spawnFastEnemy();
        cameraChange = 1
        
    }
    if (true) {
        cameraSetup += cameraChange;
        enemies.setVelocityX(10);
        fastEnemies.setVelocityX(30);

    }

    if (keys.W.isDown && keys.A.isDown) { //up left
        player1.setVelocityX(-160);
        player1.setVelocityY(-160);
        player1.anims.play("left", true);

    } else if (keys.S.isDown && keys.A.isDown) { //down left
        player1.setVelocityX(-160);
        player1.setVelocityY(160);
        player1.anims.play("left", true);

    } else if (keys.W.isDown && keys.D.isDown) { //up right
        player1.setVelocityX(160);
        player1.setVelocityY(-160);
        player1.anims.play("right", true);

    } else if (keys.S.isDown && keys.D.isDown) { //down right
        player1.setVelocityX(160);
        player1.setVelocityY(160);
        player1.anims.play("right", true);

    } else if (keys.A.isDown) { //left
        player1.setVelocityY(0);
        player1.setVelocityX(-160);
        player1.anims.play("left", true);

    } else if (keys.D.isDown) { //right
        player1.setVelocityY(0);
        player1.setVelocityX(160);
        player1.anims.play("right", true);

    } else if (keys.W.isDown) { //up
        player1.setVelocityX(0);
        player1.setVelocityY(-160);
        player1.anims.play("up", true);

    } else if (keys.S.isDown) { //down
        player1.setVelocityX(0);
        player1.setVelocityY(160);
        player1.anims.play("down", true);

    }  else { 
        player1.setVelocityX(0);
        player1.setVelocityY(0);
        player1.anims.play("turn");
    }




    
    if (cursors.up.isDown && cursors.left.isDown) { //up left
        player2.setVelocityX(-160);
        player2.setVelocityY(-160);
        player2.anims.play("left", true);
        fireball.anims.play("animateFire")


    } else if (cursors.down.isDown && cursors.left.isDown) { //down left
        player2.setVelocityX(-160);
        player2.setVelocityY(160);
        player2.anims.play("left", true);

    } else if (cursors.up.isDown && cursors.right.isDown) { //up right
        player2.setVelocityX(160);
        player2.setVelocityY(-160);
        player2.anims.play("right", true);

    } else if (cursors.down.isDown && cursors.right.isDown) { //down right
        player2.setVelocityX(160);
        player2.setVelocityY(160);
        player2.anims.play("right", true);

    } else if (cursors.left.isDown) { //left
        player2.setVelocityY(0);
        player2.setVelocityX(-160);
        player2.anims.play("left", true);

    } else if (cursors.right.isDown) { //right
        player2.setVelocityY(0);
        player2.setVelocityX(160);
        player2.anims.play("right", true);

    } else if (cursors.up.isDown) { //up
        player2.setVelocityX(0);
        player2.setVelocityY(-160);
        player2.anims.play("up", true);

    } else if (cursors.down.isDown) { //down
        player2.setVelocityX(0);
        player2.setVelocityY(160);
        player2.anims.play("down", true);

    }  else { 
        player2.setVelocityX(0);
        player2.setVelocityY(0);
        player2.anims.play("turn");
    }


    //makes it so the cronalas  animate
    if(true) {
        reply.anims.play("moveCronala")
        reply2.anims.play("moveCronala2")
    }
    if(true) {
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
    makeEnemy.prototype.make(0, getEnemyY(), "cronala")
}

function getEnemyY() {
    return(Phaser.Math.Between(0, 600));
}

function spawnFastEnemy() {
    makeFastEnemy.prototype.make(0, getEnemyY(), "cronala2")
}

function getEnemyY() {
    return(Phaser.Math.Between(25, 575));
}