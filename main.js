console.log("JS Connected")

// Create empty array for enemy, tower, bullet
const allEnemies = []
const allTowers = []
const allBullets = []

// these coordinates will be randomize
const yCoordinate = [10, 110, 210]
const yCoordinateBullet = [10, 50, 110, 140, 210] //for testing

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

        takeDamage(thing) {
                return this.health -= thing.damage
        }

        collide(thing) {
                // in this function = 'thing' is bullet
                // if enemy health is 0, remove from game Screen

                // bullet top Right-Corner hit Enemy's Front Side
                if (this.xTopLeft < thing.xTopRight &&
                        this.yTopLeft < thing.yTopRight &&
                        this.yBottomLeft > thing.yTopRight) {
                        return true
                        // this.takeDamage(thing)
                        // thing.DOMElement.remove()
                }
                // bullet Bottom-Right corner hit Enemy's Front Side
                else if (this.xBottomLeft < thing.xBottomRight &&
                        this.yTopLeft < thing.yBottomRight &&
                        this.yBottomLeft > thing.yBottomRight) {
                        return true
                        // this.takeDamage(thing)
                        // thing.DOMElement.remove()
                }
                // bullet Top-Right corner hit Enemy's Bottom Side
                else if (this.yBottomLeft < thing.yTopRight &&
                        this.xBottomLeft < thing.xTopRight &&
                        this.xBottomRight > thing.xTopRight) {
                        return true
                        // this.takeDamage(thing)
                        // thing.DOMElement.remove()
                }
                // bullet Bottom-Right corner hit Enemy's Top Side
                else if (this.yTopLeft < thing.yBottomRight &&
                        this.xTopLeft < thing.xBottomRight &&
                        this.xTopRight > thing.xBottomRight) {
                        return true
                        // this.takeDamage(thing)
                        // thing.DOMElement.remove()
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


// Create Enemy
for (let i = 0; i < yCoordinate.length; i++) {
        let student = new Enemy(700, yCoordinate[i], 10)
        allEnemies.push(student)
}
// Create Bullets
for (let j = 0; j < yCoordinate.length; j++) {
        let interview = new Bullet(10, yCoordinate[j], 50)
        allBullets.push(interview)
        // console.log(allBullets)
}
// Appends all in gameScreen
allEnemies.forEach(enemy => gameScreen.append(enemy.DOMElement))
allBullets.forEach(ammo => gameScreen.append(ammo.DOMElement))



// main game loop
let gameLoop = setInterval(() => {
        allEnemies.forEach(enemy => enemy.move())
        allBullets.forEach(bullet => bullet.move())

        for (const enemy of allEnemies) {
                for (const bullet of allBullets) {
                        if (enemy.collide(bullet) === true) {
                                enemy.takeDamage(bullet)
                                bullet.DOMElement.remove()
                                if (enemy.health === 0) {
                                        enemy.DOMElement.remove()
                                }
                        }
                }
        }

}, 500)




window.onload = function () {


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