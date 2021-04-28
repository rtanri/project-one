console.log("JS Connected")

// Create empty array for enemy, tower, bullet
const allEnemies = []
const allTowers = []
const allBullets = []
let level = 1

// these coordinates will be randomize
const yCoordinate = [10, 110, 210]

let goldValue = parseInt(document.getElementById("gold").innerText)

const randomValue = (inputArray) => {
        return inputArray[Math.floor(Math.random() * inputArray.length)]
}

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
                console.log(enemy.getBounds())
        }
        for (const bullet of allBullets) {
                console.log(bullet.getBounds())
        }
}


function removeFromArray(parentArray, DOMElement, uniqueId) {
        DOMElement.remove()
        let index = parentArray.map(x => {
                return x.id
        }).indexOf(uniqueId)
        parentArray.splice(index, 1);
}

function editGold(num) {

        goldValue = (goldValue + num)

        if (goldValue < 0) return

        document.getElementById("gold").innerText = goldValue
}

function actionRejected(location, initialClass) {
        location.classList.replace(initialClass, "rejected")

        setTimeout(function () {
                location.classList.remove("rejected")
        }, 200)
}




function buildSmallTower() {
        let selectedGround = document.getElementsByClassName("towerGround")
        for (const square of selectedGround) {
                square.classList.add("activedOne")
                square.addEventListener("click", (e) => {
                        // tower coordinate in each div box
                        let xTower = e.target.offsetLeft + e.target.offsetWidth / 2
                        let yTower = e.target.offsetTop

                        if (goldValue < 80) {
                                actionRejected(e.target, "activedOne")
                                for (const ground of selectedGround) {
                                        ground.classList.remove("activedOne")
                                }
                                return console.log("Sorry, you need more gold")
                        } else if (e.target.classList.contains("buildSmallTower") || e.target.classList.contains("buildBigTower")) {
                                // actionRejected(e.target, "buildSmallTower")
                                return console.log("Cannot build tower here")
                        } else {
                                editGold(-80)
                                e.target.classList.add("buildSmallTower")

                                let oneSmallTower = new SmallTower(xTower, yTower)
                                allTowers.push(oneSmallTower)
                                for (const ground of selectedGround) {
                                        ground.classList.remove("activedOne")
                                }
                                return console.log("Building small tower")
                        }

                })
        }
}

function buildBigTower() {
        let selectedGround = document.getElementsByClassName("towerGround")
        for (const square of selectedGround) {
                square.classList.add("activedTwo")
                square.addEventListener("click", (e) => {
                        // tower coordinate in each div box
                        let xTower = e.target.offsetLeft + e.target.offsetWidth / 2
                        let yTower = e.target.offsetTop

                        if (goldValue < 200) {
                                actionRejected(e.target, "activedTwo")
                                for (const ground of selectedGround) {
                                        ground.classList.remove("activedTwo")
                                }
                                return console.log("Sorry, you need more gold")
                        } else if (e.target.classList.contains("buildSmallTower") || e.target.classList.contains("buildBigTower")) {
                                return console.log("Cannot build tower here")
                        } else {
                                editGold(-200)
                                e.target.classList.add("buildBigTower")

                                let tower = new BigTower(xTower, yTower)
                                allTowers.push(tower)
                                for (const ground of selectedGround) {
                                        ground.classList.remove("activedTwo")
                                }
                                return console.log("Building big tower")
                        }
                })
        }
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
                super("./assets/confused.png", x, y)
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

        // in this function = 'thing' is bullet, and when enemy health is 0 remove it from allEnemies[]
        collide(thing) {
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
        className = "smallTowerDisplay"
        internalCount = 0
        isCounting = true

        constructor(x, y) {
                // to pull the constructor from parents
                super("./assets/sme.png", x, y)
                this.DOMElement.setAttribute("class", this.className)
        }

        startCounting() {
                if (this.isCounting === true) {
                        this.internalCount++
                }
        }

        switchCounting() {
                return this.isCounting = !this.isCounting;
        }


        sendBullet() {
                let interview = new Bullet(this.x, this.y, 10)
                allBullets.push(interview)
                allBullets.forEach(bullet => gameScreen.append(bullet.DOMElement))
        }
}

class BigTower extends GameObject {
        // sending 3 bullets 
        className = "bigTowerDisplay"
        internalCount = 0
        isCounting = true

        constructor(x, y) {
                // to pull the constructor from parents
                super("./assets/international.png", x, y)
                this.DOMElement.setAttribute("class", this.className)
        }

        startCounting() {
                if (this.isCounting === true) {
                        this.internalCount++
                }
        }

        switchCounting() {
                return this.isCounting = !this.isCounting;
        }

        sendBullet() {
                let interview = new Bullet(this.x, this.y, 10)
                let interview2 = new UpDiagonalBullet(this.x, this.y, 10)
                let interview3 = new DownDiagonalBullet(this.x, this.y, 10)
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
                                removeFromArray(allBullets, bullet.DOMElement, bullet.id)

                                if (enemy.health === 0) {
                                        removeFromArray(allEnemies, enemy.DOMElement, enemy.id)
                                        editGold(50)
                                }
                        }
                }
        }
}

function summonEnemy(limit) {
        let enemyCount = 0
        var interval = setInterval(() => {
                let student = new Enemy(700, randomValue(yCoordinate), 5)
                allEnemies.push(student)
                allEnemies.forEach(enemy => gameScreen.append(enemy.DOMElement))

                enemyCount += 1

                if (enemyCount === limit) {
                        clearInterval(interval)
                }
        }, 3000);
        enemyCount = 0;
}

function sendEnemy() {
        console.log(`Level ${level} - Prepare for Incoming Students`)

        if (level === 1) {
                summonEnemy(5)
                level += 1
        } else if (level === 2) {
                summonEnemy(10)
                level += 1
        } else if (level === 3) {
                summonEnemy(20)
                level = 1
        }


}

// waveEnd() need to be executed once allEnemies = []
function waveEnd() {
        console.log("waveEnd executed")
        for (const tower of allTowers) {
                tower.internalCount = 0
                tower.switchCounting()
        }
}


let count = 0
// main game loop
let gameLoop = setInterval(() => {

        count += 1
        allEnemies.forEach(enemy => enemy.move())
        allBullets.forEach(bullet => bullet.move())
        allTowers.forEach(tower => tower.startCounting())

        for (const tower of allTowers) {
                // console.log(tower.internalCount)
                if (tower.internalCount !== 0 && tower.internalCount % 20 === 0) {
                        tower.sendBullet()
                }
        }

        afterCollision();


}, 200)


window.onload = function () {}


/* ============= Archived ============= */



/* ========== Resources ========== */

// 1. Mentor Minshan give great recommendation on choosing either in DOM JS or Canvas. I decided in DOM
// 2. myMove() reference from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_animate_3




/* ========== Pseudo Code ========== */

// 3.1. function to set tower by clicking button, append class: 'actived' to .towerGround <div>

// 3.2. Click the <div> box to build tower in particular coordinate

// 5. Pause all character speed

// 6. Create collision function

// 7. Set if enemy Health is Zero, add GOLD amount