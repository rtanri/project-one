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

}


class Enemy extends GameObject {
        speed = 2
        health = 10
        className = "enemy-char"

        constructor(x, y, speed) {
                // to pull the constructor from parents
                super("./assets/job-seeker.gif", x, y)
                this.speed = speed;
                this.DOMElement.setAttribute("class", this.className)
        }
}


// Create Enemy Examples
const enemyOne = new Enemy(700, 10, 10)
const enemyTwo = new Enemy(700, 110, 10)
const enemyThree = new Enemy(700, 210, 10)

allEnemies.push(enemyOne)
allEnemies.push(enemyTwo)
allEnemies.push(enemyThree)


for (const enemy of allEnemies) {
        gameScreen.append(enemy.DOMElement)
        console.log(enemy.getBounds())
}

class Bullet extends GameObject {
        speed = 3
        className = "bulletDisplay"

        constructor(x, y, speed) {
                super("./assets/bullet.png", x, y)
                this.speed
                this.DOMElement.setAttribute("class", this.className)
        }
}

// create Bullet Examples
const bulletOne = new Bullet(50, 10, 3)
const bulletTwo = new Bullet(50, 110, 3)
const bulletThree = new Bullet(50, 210, 3)

allBullets.push(bulletOne)
allBullets.push(bulletTwo)
allBullets.push(bulletThree)

for (const bullet of allBullets) {
        gameScreen.append(bullet.DOMElement)
        console.log(bullet.getBounds())
}






window.onload = function () {
        const waveOne = () => summonEnemy(5)

        let enemyButton = document.getElementById("send-enemy-button")
        enemyButton.addEventListener("click", waveOne)

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



/* ========== Resources ========== */

// 1. Mentor Minshan give great recommendation on choosing either in DOM JS or Canvas. I decided in DOM
// 2. myMove() reference from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_animate_3




/* ========== Pseudo Code ========== */

// 3.1. function to set tower by clicking button, append class: 'actived' to .towerGround <div>

// 3.2. Click the <div> box to build tower in particular coordinate

// 5. Pause all character speed

// 6. Create collision function

// 7. Set if enemy Health is Zero, add GOLD amount