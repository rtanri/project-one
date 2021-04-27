console.log("JS Connected")

// Create empty array for enemy, tower, bullet
const allEnemies = []
const allTowers = []
const allBullets = []

// these coordinates will be randomize
const yCoordinate = [10, 110, 210]
const yCoordinateBullet = [10, 110, 210] //for testing

const randomValue = (inputArray) => {
        return inputArray[Math.floor(Math.random() * inputArray.length)]
}

// try to set id in each enemy, bullet, tower = 5 random digit
const randomId = () => {
        const randomNumber = Math.floor(Math.random() * 100000)
        return randomNumber;
}

let gameScreen = document.getElementById("game-screen")

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


function removeFromArray(parentArray, DOMElement, uniqueId) {
        DOMElement.remove()
        let index = parentArray.map(x => {
                return x.id
        }).indexOf(uniqueId)
        // console.log(index) // this show correct index
        parentArray.splice(index, 1);
}


class GameObject {
        sprite;
        x;
        y;
        DOMElement;
        id;


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
                this.id = randomId()
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

        // 1. Top Left v
        get xTopLeft() {
                return (this.getBounds().left)
        }
        get yTopLeft() {
                return (this.getBounds().top)
        }

        // 2. Bottom Left v
        get xBottomLeft() {
                return (this.getBounds().left)
        }
        get yBottomLeft() {
                return (this.getBounds().bottom)
        }

        // 3. Top Right v
        get xTopRight() {
                return (this.getBounds().right)
        }
        get yTopRight() {
                return (this.getBounds().top)
        }

        // 4. Bottom Right v
        get xBottomRight() {
                return (this.getBounds().right)
        }
        get yBottomRight() {
                return (this.getBounds().bottom)
        }

        get id() {
                return this.DOMElement.id
        }
}



class Enemy extends GameObject {
        speed;
        intervalSpeed = 500;
        health = 20
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
                if (this.xTopLeft < thing.xTopRight) {
                        if (this.yTopLeft < thing.yTopRight && this.yBottomLeft > thing.yTopRight) {
                                return true
                        }
                }
                // bullet Bottom-Right corner hit Enemy's Front Side
                else if (this.xBottomLeft < thing.xBottomRight) {
                        if (this.yTopLeft < thing.yBottomRight && this.yBottomLeft > thing.yBottomRight) {
                                return true
                        }
                }
                // bullet Top-Right corner hit Enemy's Bottom Side
                else if (this.yBottomLeft < thing.yTopRight) {
                        if (this.xBottomLeft < thing.xTopRight && this.xBottomRight > thing.xTopRight) {
                                return true
                        }
                }
                // bullet Bottom-Right corner hit Enemy's Top Side
                else if (this.yTopLeft < thing.yBottomRight) {
                        if (this.xTopLeft < thing.xBottomRight && this.xTopRight > thing.xBottomRight) {
                                return true
                        }
                }
        }
}

class Bullet extends GameObject {
        speed;
        className = "bulletDisplay";
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
                        removeFromArray(allBullets, this.DOMElement, this.id)
                }
        }
}

class UpDiagonalBullet extends Bullet {
        constructor(x, y, speed) {
                super(x, y, speed)
                this.x = x;
                this.y = y;
                this.speed = speed;
        }
        move() {
                this.x += this.speed
                this.y -= this.speed / 6
                this.DOMElement.style.left = this.x + "px"
                this.DOMElement.style.top = this.y + "px"
                if (this.x >= 700 || this.y < 0) {
                        removeFromArray(allBullets, this.DOMElement, this.id)
                }
        }
}

class DownDiagonalBullet extends Bullet {
        constructor(x, y, speed) {
                super(x, y, speed)
                this.x = x;
                this.y = y;
                this.speed = speed;
        }
        move() {
                this.x += this.speed
                this.y += this.speed / 6
                this.DOMElement.style.left = this.x + "px"
                this.DOMElement.style.top = this.y + "px"
                if (this.x >= 700 || this.y >= 250) {
                        removeFromArray(allBullets, this.DOMElement, this.id)
                }
        }
}


class SmallTower extends GameObject {
        // sending 1 bullet
        className = "towerDisplay"
        internalCount = 0

        constructor(x, y) {
                // to pull the constructor from parents
                super("./assets/Recruiter-side.png", x, y)
                this.DOMElement.setAttribute("class", this.className)
        }

        startCounting() {
                this.internalCount++
        }


        sendBullet() {
                let interview = new Bullet(50, this.y, 10)
                allBullets.push(interview)
                allBullets.forEach(bullet => gameScreen.append(bullet.DOMElement))
        }
}

class BigTower extends GameObject {
        // sending 3 bullets 
        className = "towerDisplay"
        internalCount = 0;

        constructor(x, y) {
                // to pull the constructor from parents
                super("./assets/sparkle.png", x, y)
                this.DOMElement.setAttribute("class", this.className)
        }

        startCounting() {
                this.internalCount++
        }

        sendBullet() {
                let interview = new Bullet(50, this.y, 10)
                let interview2 = new UpDiagonalBullet(50, this.y, 10)
                let interview3 = new DownDiagonalBullet(50, this.y, 10)
                allBullets.push(interview)
                allBullets.push(interview2)
                allBullets.push(interview3)
                allBullets.forEach(bullet => gameScreen.append(bullet.DOMElement))

        }
}

// collide in between Enemy and bullet
function afterCollision() {
        for (const enemy of allEnemies) {
                for (const bullet of allBullets) {
                        if (enemy.collide(bullet) === true) {
                                enemy.takeDamage(bullet)

                                // // delete this.bullet from allBullets array & DOMElement
                                // bullet.DOMElement.remove()
                                // let bulletIndex = allBullets.indexOf(bullet.id)
                                // allBullets.splice(bulletIndex, 1);
                                removeFromArray(allBullets, bullet.DOMElement, bullet.id)

                                // delete this.enemy from allEnemy array & DOMElement
                                if (enemy.health === 0) {
                                        // enemy.DOMElement.remove()
                                        // let enemyIndex = allEnemies.indexOf(enemy.id)
                                        // allEnemies.splice(enemyIndex, 1)
                                        removeFromArray(allEnemies, enemy.DOMElement, enemy.id)
                                }
                        }
                }
        }
}


// create Tower
let company1 = new SmallTower(10, 10)
let company2 = new BigTower(10, 110)
let company3 = new SmallTower(10, 210)
// allTowers.push(company1, company2, company3)
allTowers.push(company1, company2, company3)

// create enemy
let enemy1 = new Enemy(700, 10, 5)
let enemy2 = new Enemy(700, 110, 5)
let enemy3 = new Enemy(700, 210, 5)
allEnemies.push(enemy1, enemy2, enemy3)


// Appends all in gameScreen
allEnemies.forEach(enemy => gameScreen.append(enemy.DOMElement))
allTowers.forEach(tower => gameScreen.append(tower.DOMElement))


let count = 0
// main game loop
let gameLoop = setInterval(() => {

        count += 1

        allEnemies.forEach(enemy => enemy.move())

        allBullets.forEach(bullet => bullet.move())

        allTowers.forEach(tower => tower.startCounting())

        for (const tower of allTowers) {
                // console.log(tower.internalCount)
                if (tower.internalCount % 20 === 0) {
                        tower.sendBullet()
                }
        }

        afterCollision();
        // if (count % 30 === 0) {
        //         sendEnemy()
        // }
        // if (count % 100 === 0) {
        //         sendBullet()
        // }


}, 200)


window.onload = function () {


}

/* ========== Code in Testing Ground ========== */
let testingGround = document.getElementById("walking-test")

// error: the removed bullet that has collide the Enemy, continue to give damage to enemy when the allBullet recalled again.
// solution: we need to splice the out-of-bound bullet from allBullets array -- need to set the function when bullet first created

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


// // Notes on deleting certain id
// var index = allTowers.map(x => {return x.id}).indexOf(company1.id);
// undefined
// allTowers.splice(index, 1);
// [SmallTower]
// allTowers
// (2) [BigTower, SmallTower]


/* ========== Resources ========== */

// 1. Mentor Minshan give great recommendation on choosing either in DOM JS or Canvas. I decided in DOM
// 2. myMove() reference from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_animate_3




/* ========== Pseudo Code ========== */

// 3.1. function to set tower by clicking button, append class: 'actived' to .towerGround <div>

// 3.2. Click the <div> box to build tower in particular coordinate

// 5. Pause all character speed

// 6. Create collision function

// 7. Set if enemy Health is Zero, add GOLD amount