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
let enemies;
let fastEnemies;
let player1Timer = 25;
let player2Timer = 25;
let gameTimer = 0;
let shipHealth = 10;
let gameStart = 1;


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
    this.load.image("myship", "assets/myship.png");
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
    this.load.spritesheet("shiphealth", "assets/shiphealth.png", 
        { frameWidth: 20, frameHeight: 100 });
        
}




function create() {
    
    //for movement - adds cursors and keys so it works when you press buttons
    cursors = this.input.keyboard.createCursorKeys();
    console.log(cursors)
    keys = this.input.keyboard.addKeys({'A':65, 'D':68, 'W':87, 'S':83, 'Space':32, 'ctrl':17});
    
    
    
    this.add.image(400, 300, "sky").setScale(0.5).setTint(0x4f4f6f);
    
    
    platforms = this.physics.add.staticGroup();
    ship = this.physics.add.staticGroup();
    enemies = this.physics.add.group({allowGravity: false, immovable: true, key:"enemy"});
    fastEnemies = this.physics.add.group({allowGravity: false, immovable: true, key:"fastEnemy"});
    fireballs1 = this.physics.add.group({allowGravity: false, immovable: true});
    fireballs2 = this.physics.add.group({allowGravity: false, immovable: true});
    fireball1 = fireballs1.create(-100, -100, "fireball")
    fireball2 = fireballs2.create(-100, -100, "fireball")
    shiphealth = platforms.create(200, 200, "shiphealth")
    myship = ship.create(793, 300, "myship")









    //ground
    //platforms.create(600, 568, "ground").setScale(2).refreshBody();

    player1 = this.physics.add.sprite(700, 150, "lemon", {allowGravity: false});
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



    this.anims.create({
        key: "shiphealth10",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 0, end: 0}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth9",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 1, end: 1}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth8",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 2, end: 2}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth7",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 3, end: 3}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth6",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 4, end: 4}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth5",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 5, end: 5}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth4",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 6, end: 6}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth3",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 7, end: 7}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth2",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 8, end: 8}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth1",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 9, end: 9}),
        repeat: 0
    });
    this.anims.create({
        key: "shiphealth0",
        frames: this.anims.generateFrameNumbers("shiphealth", {start: 10, end: 10}),
        repeat: 0
    });


    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player1, enemies);
    this.physics.add.collider(player2, enemies);
    this.physics.add.collider(player1, fastEnemies);
    this.physics.add.collider(player2, fastEnemies);

    this.physics.add.overlap(fireballs1, enemies, hitCronala_fireball1, null, this);
    this.physics.add.overlap(fireballs1, fastEnemies, hitCronala2_fireball1, null, this);
    this.physics.add.overlap(fireballs2, enemies, hitCronala_fireball2, null, this);
    this.physics.add.overlap(fireballs2, fastEnemies, hitCronala2_fireball2, null, this);
    this.physics.add.overlap(enemies, ship, enemyHitShip, null, this);
    this.physics.add.overlap(fastEnemies, ship, fastEnemyHitShip, null, this);


    



};




function update() {
    if (gameStart == 3) { // 1 for stop, 2 for controls, 3 for start
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

    // FIRE!!!! 
    if (keys.Space.isDown && (player1Timer < 0)) {
        makePlayer1Fire()
        player1Timer = 25
    }
    if (keys.ctrl.isDown && (player2Timer < 0)) {
        makePlayer2Fire()
        player2Timer = 25
    }


    //makes it so the cronalas  animate
    if(true) {
        reply.anims.play("moveCronala")
        reply2.anims.play("moveCronala2")
        fireball1.setVelocityX(-300)
        fireball2.setVelocityX(-300)
        cameraSetup += cameraChange;
        enemies.setVelocityX(40);
        fastEnemies.setVelocityX(90);
        player1Timer -= 1;
        player2Timer -= 1;
        gameTimer += 1;
    }
    } else {
        makeButton()
    }



};

function makeButton() {
    gameStart 
}

function makeEnemy(x, y) {
    reply = enemies.create(x, y, "cronala");
}
function makeFastEnemy(x, y) {
    reply2 = fastEnemies.create(x, y, "cronala2");
}


function spawnEnemy() {
    makeEnemy(0, getEnemyY())
}

function getEnemyY() {
    return(Phaser.Math.Between(0, 600));
}

function spawnFastEnemy() {
    makeFastEnemy(0, getEnemyY(), "cronala2")
}

function getEnemyY() {
    return(Phaser.Math.Between(25, 575));
}

function makePlayer1Fire() {
    fireball1 = fireballs1.create(player1.x, player1.y, "fireball")
}
function makePlayer2Fire() {
    fireball2 = fireballs2.create(player2.x, player2.y, "fireball")
}

function hitCronala_fireball1(fireball, enemy) {
    enemy.disableBody(true, true)
    fireball.disableBody(true, true)
    changeTextIncrament1()

}

function hitCronala2_fireball1(fireball, fastEnemy) {
    fastEnemy.disableBody(true, true)
    fireball.disableBody(true, true)
    changeTextIncrament1()

}
function hitCronala_fireball2(fireball, enemy) {
    enemy.disableBody(true, true)
    fireball.disableBody(true, true)
    changeTextIncrament2()

}

function hitCronala2_fireball2(fireball, fastEnemy) {
    fastEnemy.disableBody(true, true)
    fireball.disableBody(true, true)

    changeTextIncrament2()
}
function enemyHitShip(enemy, myship) {
    if (shipHealth == 10) {
        shiphealth.anims.play("shiphealth9")
    } else if (shipHealth ==9) {
        shiphealth.anims.play("shiphealth8")
    } else if (shipHealth == 8) {
        shiphealth.anims.play("shiphealth7")
    } else if (shipHealth == 7) {
        shiphealth.anims.play("shiphealth6")
    } else if (shipHealth == 6) {
        shiphealth.anims.play("shiphealth5")
    } else if (shipHealth == 5) {
        shiphealth.anims.play("shiphealth4")
    } else if (shipHealth == 4) {
        shiphealth.anims.play("shiphealth3")
    } else if (shipHealth == 3) {
        shiphealth.anims.play("shiphealth2")
    } else if (shipHealth == 2) {
        shiphealth.anims.play("shiphealth1")
    } else if (shipHealth == 1) {
        shiphealth.anims.play("shiphealth0")
    } else if (shipHealth == 0) {
        physics.stop()
    }
    enemy.disableBody(true, true)
    shipHealth--;
    
}
function fastEnemyHitShip(enemy, myship) {
    if (shipHealth == 10) {
        shiphealth.anims.play("shiphealth9")
    } else if (shipHealth ==9) {
        shiphealth.anims.play("shiphealth8")
    } else if (shipHealth == 8) {
        shiphealth.anims.play("shiphealth7")
    } else if (shipHealth == 7) {
        shiphealth.anims.play("shiphealth6")
    } else if (shipHealth == 6) {
        shiphealth.anims.play("shiphealth5")
    } else if (shipHealth == 5) {
        shiphealth.anims.play("shiphealth4")
    } else if (shipHealth == 4) {
        shiphealth.anims.play("shiphealth3")
    } else if (shipHealth == 3) {
        shiphealth.anims.play("shiphealth2")
    } else if (shipHealth == 2) {
        shiphealth.anims.play("shiphealth1")
    } else if (shipHealth == 1) {
        shiphealth.anims.play("shiphealth0")
    } else if (shipHealth == 0) {
        physics.stop()
    }
    enemy.disableBody(true, true)
    shipHealth--;

}