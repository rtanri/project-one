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
let goldPanel = document.querySelector(".statusBoard")
let goldValue = parseInt(document.getElementById("gold").innerText)
let scoreValue = parseInt(document.getElementById("score").innerText)
let selectedGround = document.getElementsByClassName("towerGround")
let isEscActivated = false


/* ======== Global Reusable Functions ======== */
function restart() {
        console.log("restart game is executed")
        goldValue = 600
        document.getElementById("gold").innerText = goldValue

        scoreValue = 0
        document.getElementById("score").innerText = scoreValue

        level = 1

        createReadyButton()

        allTowers.splice(0, allTowers.length)
        for (const ground of selectedGround) {
                ground.setAttribute("class", "towerGround")
        }
}

const disabledBtn = (id) => {
        let button = document.getElementById(id)

        if (button.classList.contains("blocked")) {
                button.classList.remove("blocked")
                button.disabled = false
                return
        }

        button.disabled = true
        button.classList.add("blocked")
}


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

// function actionRejected(location, initialClass) {
//         location.classList.replace(initialClass, "rejected")
//         setTimeout(function () {
//                 location.classList.replace("rejected", initialClass)
//         }, 200)
// }

/* ======== Build and Demolish Towers ======== */

function clearEventListener(className, callback) {
        // find all element with className, then remove the callback name on this element
        let elements = document.getElementsByClassName(className)
        for (const element of elements) {
                element.removeEventListener("click", callback)
        }
}

function escKeyPress(boolean) {
        let infoBox = document.querySelector(".instruction")
        if (boolean === true) {
                document.addEventListener("keydown", escape)
                console.log("add escape key press")
                infoBox.classList.add("show")

        } else if (boolean === false) {
                document.removeEventListener("keydown", escape)
                console.log("remove escape key press")
                infoBox.classList.remove("show")
        }

}

function escape(e) {
        if (e.keyCode === 27) {
                console.log("Escape is pressed")
                unblockedButton()
                clearEventListener("towerGround", constructBigTower)
                clearEventListener("towerGround", constructSmallTower)
                clearEventListener("towerGround", demolish)
                for (const square of selectedGround) {
                        square.classList.remove("activedOne")
                        square.classList.remove("activedTwo")
                        square.classList.remove("demolishTower")
                }
                escKeyPress(false)
        }

}

function unblockedButton() {
        let blockedButton = document.querySelector(".blocked")

        if (blockedButton.id !== "send-enemy") {
                blockedButton.disabled = false
                blockedButton.classList.remove("blocked")
        }

}

function buildSmallTower() {
        clearEventListener("towerGround", constructBigTower)
        clearEventListener("towerGround", demolish)
        document.removeEventListener("keydown", escape)
        unblockedButton()

        disabledBtn("first-tower-button")

        for (const square of selectedGround) {
                square.classList.remove("activedTwo")
                square.classList.remove("demolishTower")
                square.classList.add("activedOne")
                square.addEventListener("click", constructSmallTower)
        }
        escKeyPress(true)
}

function constructSmallTower(e) {
        let xTower = e.target.offsetLeft + e.target.offsetWidth / 2
        let yTower = e.target.offsetTop

        if (goldValue < 80) {
                actionRejected(e.target, "activedOne")
                actionRejected(goldPanel, "statusBoard")
                console.log("Sorry, you need more gold")

        } else if (e.target.classList.contains("buildSmallTower") || e.target.classList.contains("buildBigTower")) {
                console.log("Cannot build tower here")
        } else {
                buildTowerAudio()
                editGold(-80)
                e.target.classList.add("buildSmallTower")
                let oneSmallTower = new SmallTower(xTower, yTower)
                allTowers.push(oneSmallTower)
                e.target.setAttribute("id", oneSmallTower.id)

                for (const ground of selectedGround) {
                        ground.classList.remove("activedOne")
                }
                escKeyPress(false)
                disabledBtn("first-tower-button")
                console.log("Building small tower")
        }

}

function buildBigTower() {
        clearEventListener("towerGround", constructSmallTower)
        clearEventListener("towerGround", demolish)

        document.removeEventListener("keydown", escape)
        unblockedButton()

        disabledBtn("second-tower-button")

        for (const square of selectedGround) {
                square.classList.remove("activedOne")
                square.classList.remove("demolishTower")
                square.classList.add("activedTwo")
                square.addEventListener("click", constructBigTower)
        }
        escKeyPress(true)
}

function constructBigTower(e) {
        let xTower = e.target.offsetLeft + e.target.offsetWidth / 2
        let yTower = e.target.offsetTop

        if (goldValue < 200) {
                actionRejected(e.target, "activedTwo")
                actionRejected(goldPanel, "statusBoard")
                console.log("Sorry, you need more gold")

        } else if (e.target.classList.contains("buildSmallTower") || e.target.classList.contains("buildBigTower")) {
                console.log("Cannot build tower here")
        } else {
                buildTowerAudio()
                editGold(-200)
                e.target.classList.add("buildBigTower")

                let oneBigTower = new BigTower(xTower, yTower)
                e.target.setAttribute("id", oneBigTower.id)
                console.log(oneBigTower.id)

                allTowers.push(oneBigTower)

                for (const ground of selectedGround) {
                        ground.classList.remove("activedTwo")
                }
                escKeyPress(false)
                disabledBtn("second-tower-button")
                console.log("Building big tower")
        }
}


function deleteTower() {
        clearEventListener("towerGround", constructSmallTower)
        clearEventListener("towerGround", constructBigTower)
        clearEventListener("towerGround", demolish)
        unblockedButton()
        disabledBtn("delete-tower-button")
        document.removeEventListener("keydown", escape)
        for (const square of selectedGround) {
                square.classList.remove("activedTwo")
                square.classList.remove("activedOne")
                square.classList.add("demolishTower")
                square.addEventListener("click", demolish)
        }
        escKeyPress(true)
}

function demolish(e) {
        console.log(e.target.id) // type = string

        let indexMap = allTowers.map(x => {
                return x.id
        })
        let indexNum = indexMap.indexOf(Number(e.target.id))
        //find Index of Array based on ID: indexOf(number)

        e.target.innerHTML = "" // remove DOM
        buildTowerAudio()
        if (e.target.classList.contains("buildSmallTower")) {
                e.target.setAttribute("class", "towerGround")
                allTowers.splice(indexNum, 1) // remove from parentArray, typo indexMap -> indexNum
                editGold(+40)
                e.target.removeAttribute("id")
                console.log("Small tower is deleted")

        } else if (e.target.classList.contains("buildBigTower")) {
                e.target.setAttribute("class", "towerGround")
                allTowers.splice(indexNum, 1)
                editGold(+100)
                e.target.removeAttribute("id")
                console.log("Big tower is deleted")
        }
        disabledBtn("delete-tower-button")
        escKeyPress(false)
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
        health = 10
        className = "enemy-char"


        constructor(x, y, speed) {
                // to pull the constructor from parents
                super("./assets/confused.png", x, y)
                this.speed = speed;
                this.DOMElement.setAttribute("class", this.className)
        }

        died() {

        }

        move() {
                this.x -= this.speed
                this.DOMElement.style.left = this.x + "px"
                if (this.x <= -50) {
                        this.speed = 0
                        removeFromArray(allEnemies, this.DOMElement, this.id)
                        editGold(-50)
                        editScore(-100)
                        protestAudio()
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
                if (this.x >= 700 || this.y < -30) {
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
                let interview = new Bullet(this.x, this.y, 12)
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
                let interview = new Bullet(this.x, this.y, 12)
                let interview2 = new UpDiagonalBullet(this.x, this.y, 12)
                let interview3 = new DownDiagonalBullet(this.x, this.y, 12)
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
                                audio = new Audio("./assets/music/got-hit.mp3")
                                audio.volume = 0.6
                                audio.play()
                                // console.log(enemy.health)
                                removeFromArray(allBullets, bullet.DOMElement, bullet.id)

                                if (enemy.health === 0) {
                                        removeFromArray(allEnemies, enemy.DOMElement, enemy.id)
                                        editGold(50)
                                        editScore(100)
                                        cashAudio = new Audio("./assets/music/cash.mp3")
                                        cashAudio.volume = 0.3
                                        cashAudio.play()
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
                        jobHunter = new type(650, speed)
                } else {
                        jobHunter = new type(650, randomValue(yCoordinate), speed)
                }
                allEnemies.push(jobHunter)
                allEnemies.forEach(enemy => gameScreen.append(enemy.DOMElement))

                enemyCount += 1

                if (enemyCount === limit) {
                        clearInterval(interval)
                }
        }, 2000);
        enemyCount = 0;
}

function sendEnemy() {
        if (allBullets.length === 0) {
                console.log(`Level ${level} - Prepare for Incoming Job Hunters`)

                if (level === 1) {
                        createMessage(messagePanel, "Wave #1 - Send interviews to all confused applicants")
                        summonEnemy(7, Enemy, 4)
                        level += 1
                } else if (level === 2) {
                        createMessage(messagePanel, "Wave #2 - It's end-of-year, more applicants are applying job")
                        summonEnemy(15, Enemy, 4)
                        level += 1
                } else if (level === 3) {
                        createMessage(messagePanel, "Wave #3 - BossFight: Help director get his dream job!")
                        summonEnemy(1, Boss, 2)
                        level += 1
                }
        }
}

// waveEnd() need to be executed once allEnemies = []
function waveEnd() {
        console.log("waveEnd executed")
        createMessage(messagePanel, "Great job, everyone have a job")
        isStarting = false
        waveDuration = 0;
        for (const tower of allTowers) {
                tower.internalCount = 0
        }
        gameEnd()
}


function gameStart() {
        console.log("Game Start")
        disabledBtn("send-enemy")
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
                        console.log(tower.internalCount)
                        if (tower.internalCount !== 0 && tower.internalCount % 80 === 0) {
                                tower.sendBullet()
                        }
                }
        }

}

function checkingAllEnemies() {
        if (waveDuration !== 0 && allTowers[0].internalCount % 40 === 0) {
                if (allEnemies.length === 0) {
                        console.log("CheckingAllEnemies is executed")
                        waveEnd()
                }
        }
        return
}

function gameEnd() {
        if (level === 4) {
                createMessage(messagePanel, "Congrats you win the game!")
                level = 1
                document.getElementById("result").innerText = scoreValue
                setTimeout(function () {
                        document.getElementById('gameEndModal').classList.add("show");
                        // musicPause()
                }, 3000)

        } else {
                createMessage(messagePanel, "Build more companies with your gold >> ")
                createReadyButton()
        }
}

/* ========== Modal ========== */

const backgroundMusic = new Audio("./assets/music/game-ost.mp3")

function musicPlay() {
        backgroundMusic.volume = 0.5
        backgroundMusic.loop = true
        backgroundMusic.play()
}

function musicPause() {
        backgroundMusic.pause()
}

function buildTowerAudio() {
        audio = new Audio("./assets/music/build-tower.mp3")
        audio.volume = 0.5
        audio.play()
}

function protestAudio() {
        audio = new Audio("./assets/music/protest.mp3")
        audio.volume = 0.1
        audio.play()
}


const getStarted = document.getElementById("startButton");
getStarted.onclick = function () {
        disabledBtn("send-enemy")
        createReadyButton()
        document.getElementById('introModal').classList.remove("show");
        // musicPlay()
};

const restartGame = document.getElementById("restartButton");
restartGame.onclick = function () {
        disabledBtn("send-enemy")
        document.getElementById('gameEndModal').classList.remove("show");
        // musicPlay()
        restart()
};

const createMessage = (location, message) => {
        location.innerHTML = ""
        let showMessage = document.createElement("span")
        showMessage.innerText = message
        return location.append(showMessage)
}

const messagePanel = document.getElementById("message-bar")

function createReadyButton() {
        createMessage(messagePanel, "Build 2 or more companies with your gold >> ")
        let createButton = document.createElement("button")
        createButton.setAttribute("id", "ready-to-start")
        createButton.setAttribute("class", "towerButton")
        createButton.innerText = "Done!"
        messagePanel.append(createButton)

        createButton.onclick = function () {
                if (allTowers.length < 2) {
                        actionRejected(messagePanel, "fixed")
                        return
                }
                disabledBtn("send-enemy")
                createMessage(messagePanel, "Pressed 'Wave Start' button to welcome wave of applicants")
        };
}


function actionRejected(location, initialClass) {
        if (location === messagePanel) {
                location.classList.add("shake")
                setTimeout(function () {
                        location.classList.remove("shake")
                }, 700)
                return
        }
        location.classList.replace(initialClass, "rejected")
        setTimeout(function () {
                location.classList.replace("rejected", initialClass)
        }, 200)
}

/* ========== Main Game Loop ========== */

let gameLoop = setInterval(() => {
        // musicPlay()
        renderGameObjects()
        towerIntervalStart()
        afterCollision();
        checkingAllEnemies()
}, 100)


/* ========== Resources ========== */

// 1. Mentor Min Shan give great recommendation on choosing either in DOM JS or Canvas. I decided in DOM
// 2. myMove() reference from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_animate_3