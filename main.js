console.log("JS Connected")

// Create empty array for enemy, tower, bullet
const allEnemies = []
const allTowers = []
const allBullets = []

const yCordinate = [10, 110, 210]

const randomValue = (inputArray) => {
        return inputArray[Math.floor(Math.random() * inputArray.length)]
}

let gameScreen = document.getElementById("game-screen")

class GameObject {
        sprite;
        x;
        y;
        DOMElement; // so called variable that editable 'objective'ly

        constructor(sprite, x, y) {
                this.sprite = sprite
                this.x = x
                this.y = y
                // *Super useful = you can set the DOMElement in constructor
                this.DOMElement = document.createElement("img")
                this.DOMElement.setAttribute("src", this.sprite)
                this.DOMElement.style.position = "absolute"
                this.DOMElement.style.left = this.x + "px"
                this.DOMElement.style.top = this.y + "px"
        }

        getBounds() {
                return this.DOMElement.getBoundingClientRect()
        }

        // getter = create custom property ->  GameObject.width
        get width() {
                return this.getBounds().width
        }

        get height() {
                return this.getBounds().height
        }

        // coordinate each corner

        // 1. Top Left
        get xTopLeft() {
                return (this.getBounds().x - 0.5 * this.width)
        }
        get yTopLeft() {
                return (this.getBounds().y + 0.5 * this.height)
        }

        // 2. Bottom Left
        get xBottomLeft() {
                return (this.getBounds().x - 0.5 * this.width)
        }
        get yBottomLeft() {
                return (this.getBounds().y - 0.5 * this.height)
        }

        // 3. Top Right
        get xTopRight() {
                return (this.getBounds().x + 0.5 * this.width)
        }
        get yTopRight() {
                return (this.getBounds().y + 0.5 * this.height)
        }

        // 4. Bottom Right
        get xBottomRight() {
                return (this.getBounds().x + 0.5 * this.width)
        }
        get yBottomRight() {
                return (this.getBounds().y - 0.5 * this.height)
        }

}


class Enemy extends GameObject {
        speed;
        intervalSpeed = 500;
        health = 10
        className = "enemy-char"


        constructor(x, y, speed) {
                // to pull the constructor from parents
                super("./assets/job-seeker.gif", x, y)
                this.speed = speed;
                this.DOMElement.setAttribute("class", this.className)
        }

        move() {
                this.x -= this.speed
                this.DOMElement.style.left = this.x + "px"
                if (this.x <= 0) {
                        this.speed = 0
                }
        }
}


class Bullet extends GameObject {
        speed;
        className = "bulletDisplay";
        intervalSpeed = 500;
        damage = 5;


        constructor(x, y, speed) {
                super("./assets/bullet.png", x, y)
                this.speed = speed
                this.DOMElement.setAttribute("class", this.className)
        }

        move() {
                this.x += this.speed
                this.DOMElement.style.left = this.x + "px"
                if (this.x >= 700) {
                        this.DOMElement.remove()
                }
        }
}

function pause() {
        for (const enemy of allEnemies) {
                enemy.speed = 0;
        }
        for (const bullet of allBullets) {
                bullet.speed = 0;
        }
}

function start() {
        for (const enemy of allEnemies) {
                enemy.speed = 10;
        }
        for (const bullet of allBullets) {
                bullet.speed = 10;
        }
}

function getAllLocations() {
        for (const enemy of allEnemies) {
                // gameScreen.append(enemy.DOMElement)
                console.log(enemy.getBounds())
        }
        for (const bullet of allBullets) {
                // gameScreen.append(enemy.DOMElement)
                console.log(bullet.getBounds())
        }

}



// 1. Create 3 Enemy Examples
for (let i = 0; i < 3; i++) {
        for (let j = 0; j < yCordinate.length; j++) {
                let student = new Enemy(700, yCordinate[j], 10)
                allEnemies.push(student)
        }
}

allEnemies.forEach(enemy => gameScreen.append(enemy.DOMElement))
// const enemyOne = new Enemy(300, 10, 10)
// const enemyTwo = new Enemy(700, 110, 10)
// const enemyThree = new Enemy(700, 210, 10)

// allEnemies.push(enemyOne)
// allEnemies.push(enemyTwo)
// allEnemies.push(enemyThree)

// for (const enemy of allEnemies) {
//         gameScreen.append(enemy.DOMElement)

//         // console.log(enemy.getBounds())
// }


// 2. Create Bullet Examples
const bulletOne = new Bullet(50, 10, 10)
const bulletTwo = new Bullet(10, 30, 10)
const bulletThree = new Bullet(50, 210, 10)

allBullets.push(bulletOne)
allBullets.push(bulletTwo)
allBullets.push(bulletThree)

for (const bullet of allBullets) {
        gameScreen.append(bullet.DOMElement)
        // console.log(bullet.getBounds())
}

// main game loop
let gameLoop = setInterval(() => {
        allEnemies.forEach(enemy => enemy.move())
        allBullets.forEach(bullet => bullet.move())

        if ((enemyOne.getBounds().x - (enemyOne.width / 2)) < (bulletOne.getBounds().x + bulletOne.width / 2)) {
                // console.log("collide")
                // enemyOne.DOMElement.remove()
                enemyOne.health = enemyOne.health - bulletOne.damage
                console.log(enemyOne.health)
                bulletOne.DOMElement.remove()
                if (enemyOne.health === 0) {
                        enemyOne.DOMElement.remove()
                }
        } else if ((enemyOne.xTopLeft) < (bulletTwo.xTopRight)) {
                enemyOne.health = enemyOne.health - bulletTwo.damage
                console.log(enemyOne.health)
                bulletTwo.DOMElement.remove()
                if (enemyOne.health === 0) {
                        enemyOne.DOMElement.remove()
                }
        }
}, 500)




window.onload = function () {
        // const waveOne = () => summonEnemy(5)

        // let enemyButton = document.getElementById("send-enemy-button")
        // enemyButton.addEventListener("click", waveOne)

}

/* ========== Code in Testing Ground ========== */
let testingGround = document.getElementById("walking-test")


/* ============= Archived ============= */

// // 1. Tower Object
// class Tower {
//         name = ""
//         shoot() {
//                 console.log("throw bullet")
//         }

//         constructor(name) {
//                 this.name = name;
//         }
// }

// class SmallTower extends Tower {
//         shootingDamage = 2
//         price = 25

//         getDamage() {
//                 return this.shootingDamage
//         }

//         printName() {
//                 console.log("This is small tower")
//         }

//         constructor(name, shootingDamage, price) {
//                 super(name)
//                 this.price = price
//                 this.shootingDamage = shootingDamage
//         }
// }
// // create Unilever as Small Tower
// let uniqlo = new SmallTower("Uniqlo", 2, 25)


// class BigTower extends Tower {
//         shootingDamage = 5
//         price = 45

//         getDamage() {
//                 return this.shootingDamage
//         }

//         printName() {
//                 console.log("This is big tower")
//         }

//         constructor(name, shootingDamage, price) {
//                 super(name)
//                 this.price = price
//                 this.shootingDamage = shootingDamage
//         }
// }
// // create Apple as Big Tower
// let apple = new BigTower("Apple", 5, 45)

// function summonEnemy(limit) {
//         console.log("enemy btn clicked")

//         let enemyCount = 0
//         var interval = setInterval(() => {

//                 let student = new Enemy("Normal Student")
//                 allEnemies.push(student)
//                 // student.createEnemy(randomValue(spawnLocation))
//                 console.log(allEnemies)
//                 enemyCount += 1

//                 if (enemyCount === limit) {
//                         clearInterval(interval);
//                 }
//         }, 500);
//         renderObject()
//         enemyCount = 0;
// }

// code graveyard - trying to code collission
// function collision() {
//         for (const bullet of allBullets) {
//                 for (const enemy of allEnemies) {
//                         bulletMostRightDimension = bullet.getBounds().x + 20
//                         enemyMostLeftDimension = enemy.getBounds().x - 22

//                         if (bulletMostRightDimension >= enemyMostLeftDimension) {
//                                 console.log("it is collide")
//                         }
//                 }
//         }
// }
// collision()

/* ========== Resources ========== */

// 1. Mentor Minshan give great recommendation on choosing either in DOM JS or Canvas. I decided in DOM
// 2. myMove() reference from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_animate_3




/* ========== Pseudo Code ========== */

// 3.1. function to set tower by clicking button, append class: 'actived' to .towerGround <div>

// 3.2. Click the <div> box to build tower in particular coordinate

// 5. Pause all character speed

// 6. Create collision function

// 7. Set if enemy Health is Zero, add GOLD amount