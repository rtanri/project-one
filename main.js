console.log("JS Connected")

/* ======== Global Array and Variable ======== */

const allEnemies = []
const allTowers = []
const allBullets = []
const yCoordinate = [10, 110, 210]
let level = 1
let isStarting = false;
let waveDuration = 0
let gameScreen = document.getElementById("game-screen")
let goldPanel = document.querySelector(".goldStatus")
let goldValue = parseInt(document.getElementById("gold").innerText)
let scoreValue = parseInt(document.getElementById("score").innerText)
let selectedGround = document.getElementsByClassName("towerGround")


/* ======== Global Reusable Functions ======== */

const randomValue = (inputArray) => {
        return inputArray[Math.floor(Math.random() * inputArray.length)]
}

const randomId = () => {
        const randomNumber = Math.floor(Math.random() * 100000)
        return randomNumber;
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


function editScore(score) {
        scoreValue = (scoreValue + score)
        document.getElementById("score").innerText = scoreValue
}

function actionRejected(location, initialClass) {
        location.classList.replace(initialClass, "rejected")
        setTimeout(function () {
                if (initialClass === 'goldStatus') {
                        location.classList.replace("rejected", initialClass)
                } else {
                        location.classList.remove("rejected")
                }
        }, 200)
}

/* ======== Build and Demolish Towers ======== */

function clearEventListener(className, callback) {
        // find all element with className, then remove the callback name on this element
        let elements = document.getElementsByClassName(className)
        for (const element of elements) {
                element.removeEventListener("click", callback)
        }
}

function buildSmallTower() {
        clearEventListener("towerGround", constructBigTower)
        clearEventListener("towerGround", demolish)

        for (const square of selectedGround) {
                square.classList.add("activedOne")
                square.addEventListener("click", constructSmallTower)
        }
}

function constructSmallTower(e) {
        // tower coordinate in each div box
        // let xTower = e.target.offsetLeft + e.target.offsetWidth / 2
        let xTower = e.target.offsetLeft
        let yTower = e.target.offsetTop

        if (goldValue < 80) {
                actionRejected(e.target, "activedOne")
                actionRejected(goldPanel, "goldStatus")
                for (const ground of selectedGround) {
                        ground.classList.remove("activedOne")
                }

                return console.log("Sorry, you need more gold")
        } else if (e.target.classList.contains("buildSmallTower") || e.target.classList.contains("buildBigTower")) {
                // actionRejected(e.target, "buildSmallTower")
                return console.log("Cannot build tower here")
        } else {
                editGold(-80)
                // *test changing way to create tower
                e.target.classList.add("buildSmallTower")

                let oneSmallTower = new SmallTower(xTower, yTower)
                console.log(oneSmallTower.id)

                allTowers.push(oneSmallTower)

                //*test by appending DOMElement
                // e.target.append(oneSmallTower.DOMElement)

                e.target.setAttribute("id", oneSmallTower.id)

                for (const ground of selectedGround) {
                        ground.classList.remove("activedOne")
                }
                return console.log("Building small tower")
        }
}

function buildBigTower() {
        clearEventListener("towerGround", constructSmallTower)
        clearEventListener("towerGround", demolish)
        for (const square of selectedGround) {
                square.classList.add("activedTwo")
                square.addEventListener("click", constructBigTower)
        }
}

function constructBigTower(e) {
        // tower coordinate in each div box
        let xTower = e.target.offsetLeft + e.target.offsetWidth / 2
        let yTower = e.target.offsetTop

        if (goldValue < 200) {
                actionRejected(e.target, "activedTwo")
                actionRejected(goldPanel, "goldStatus")
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
}


function deleteTower() {
        clearEventListener("towerGround", constructSmallTower)
        clearEventListener("towerGround", constructBigTower)
        for (const square of selectedGround) {
                square.classList.add("demolishTower")
                square.addEventListener("click", demolish)
        }
}

// cannot be used in demolish()
// function returnTowerIndex(yourId) {
//         const sameId = (tower) => tower.id === yourId
//         let index = allTowers.findIndex(sameId)

//         if (index === -1) {
//                 console.log("Tower based on ID is not found")
//                 return
//         }
//         return index
// }

// cannot be used in demolish()
// function filterId(myId) {
//         return allTowers.filter(tower => tower.id === myId)
// }



function demolish(e) {
        console.log(e.target.id)


        let indexMap = allTowers.map(x => {
                return x.id
        })
        let indexNum = indexMap.indexOf(e.target.id)
        console.log(`index map: ${indexMap}`)
        console.log(`index number: ${indexNum}`)
        console.log(`index number: ${typeof indexMap[0]}`)
        // why my index map keep giving (-1) result, and end of deleting wrong tower

        e.target.innerHTML = ""
        if (e.target.classList.contains("buildSmallTower")) {
                e.target.setAttribute("class", "towerGround")
                allTowers.splice(indexMap, 1)
                editGold(+50)
                e.target.removeAttribute("id")

                console.log("Small tower is deleted")

        } else if (e.target.classList.contains("buildBigTower")) {
                e.target.setAttribute("class", "towerGround")
                allTowers.splice(indexMap, 1)
                editGold(+110)
                e.target.removeAttribute("id")
                console.log("Big tower is deleted")
        }
        for (const square of selectedGround) {
                square.classList.remove("demolishTower")
        }
}

/* ======== Object Class: GameObject, Enemy, Tower, Bullets ======== */

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

        // 1. Top Left coordinate
        get xTopLeft() {
                return (this.getBounds().left)
        }
        get yTopLeft() {
                return (this.getBounds().top)
        }

        // 2. Bottom Left coordinate
        get xBottomLeft() {
                return (this.getBounds().left)
        }
        get yBottomLeft() {
                return (this.getBounds().bottom)
        }

        // 3. Top Right coordinate
        get xTopRight() {
                return (this.getBounds().right)
        }
        get yTopRight() {
                return (this.getBounds().top)
        }

        // 4. Bottom Right coordinate
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
                if (this.x <= -50) {
                        this.speed = 0
                        removeFromArray(allEnemies, this.DOMElement, this.id)
                        editGold(-50)
                        editScore(-100)
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

class Boss extends Enemy {
        health = 200
        className = "boss-char"
        sprite = "./assets/confused-man.png"

        constructor(x, speed) {
                super(x, 110, speed)
                this.DOMElement.setAttribute("src", this.sprite)
                this.DOMElement.setAttribute("class", this.className)
        }

        move() {
                this.x -= this.speed
                this.DOMElement.style.left = this.x + "px"
                if (this.x <= -50) {
                        this.speed = 0
                        removeFromArray(allEnemies, this.DOMElement, this.id)
                        editScore(-500)
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
                                // console.log(enemy.health)
                                removeFromArray(allBullets, bullet.DOMElement, bullet.id)

                                if (enemy.health === 0) {
                                        removeFromArray(allEnemies, enemy.DOMElement, enemy.id)
                                        editGold(50)
                                        editScore(100)
                                }
                        }
                }
        }
}

/* ========= Sending Enemy: Level 1, 2, Boss ========= */

function summonEnemy(limit, type, speed) {
        let enemyCount = 0
        let jobHunter;
        var interval = setInterval(() => {
                if (type === Boss) {
                        jobHunter = new type(700, speed)
                } else {
                        jobHunter = new type(700, randomValue(yCoordinate), speed)
                }
                allEnemies.push(jobHunter)
                allEnemies.forEach(enemy => gameScreen.append(enemy.DOMElement))

                enemyCount += 1

                if (enemyCount === limit) {
                        clearInterval(interval)
                }
        }, 3000);
        enemyCount = 0;
}

function sendEnemy() {
        if (allBullets.length === 0) {
                console.log(`Level ${level} - Prepare for Incoming Job Hunters`)

                if (level === 1) {
                        // summonEnemy(1, Boss, 2)
                        summonEnemy(5, Enemy, 5)
                        level += 1
                } else if (level === 2) {
                        summonEnemy(15, Enemy, 5)
                        level += 1
                } else if (level === 3) {
                        summonEnemy(1, Boss, 2)
                        level += 1
                }
        }
}

// waveEnd() need to be executed once allEnemies = []
function waveEnd() {
        console.log("waveEnd executed")
        isStarting = false
        waveDuration = 0;
        for (const tower of allTowers) {
                tower.internalCount = 0
        }
        gameEnd()
}


function gameStart() {
        console.log("Game Start")
        waveDuration += 1
        for (const tower of allTowers) {
                tower.internalCount = 0
                if (tower.isCounting === false) {
                        tower.switchCounting()
                }
        }
        isStarting = !isStarting
        console.log(isStarting)
        if (isStarting === true) {
                sendEnemy()
        }

}


function renderGameObjects() {
        allEnemies.forEach(enemy => enemy.move())
        allBullets.forEach(bullet => bullet.move())
        allTowers.forEach(tower => tower.startCounting())
}

function towerIntervalStart() {
        if (isStarting === true) {
                for (const tower of allTowers) {
                        // console.log(tower.internalCount)
                        if (tower.internalCount !== 0 && tower.internalCount % 30 === 0) {
                                tower.sendBullet()
                        }
                }
        }

}

function checkingAllEnemies() {
        if (waveDuration !== 0 && allTowers[0].internalCount % 20 === 0) {
                if (allEnemies.length === 0) {
                        console.log("CheckingAllEnemies is executed")
                        waveEnd()
                }
        }
        return
}

function gameEnd() {
        if (level === 4) {
                console.log(`Congrats you win the game!, with score: ${scoreValue}`)
        } else {
                console.log("You finish this level, prepare for next level")
        }
}

// main game loop
let gameLoop = setInterval(() => {
        renderGameObjects()
        towerIntervalStart()
        afterCollision();
        checkingAllEnemies()
}, 200)



/* ========== Resources ========== */

// 1. Mentor Min Shan give great recommendation on choosing either in DOM JS or Canvas. I decided in DOM
// 2. myMove() reference from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_animate_3


/* ========== Archived ========== */