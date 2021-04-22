console.log("JS Connected")

// 1. Create object class type: tower, enemy, and bullet
class Tower {
        name = ""
        shoot() {
                console.log("throw bullet")
        }

        constructor(name) {
                this.name = name;
        }
}

class SmallTower extends Tower {
        shootingDamage = 2
        price = 25

        getDamage() {
                return this.shootingDamage
        }

        printName() {
                console.log("This is small tower")
        }

        constructor(name, shootingDamage, price) {
                super(name)
                this.price = price
                this.shootingDamage = shootingDamage
        }
}
// create Unilever as Small Tower
let uniqlo = new SmallTower("Uniqlo", 2, 25)


class BigTower extends Tower {
        shootingDamage = 5
        price = 45

        getDamage() {
                return this.shootingDamage
        }

        printName() {
                console.log("This is big tower")
        }

        constructor(name, shootingDamage, price) {
                super(name)
                this.price = price
                this.shootingDamage = shootingDamage
        }
}
// create Apple as Big Tower
let apple = new BigTower("Apple", 5, 45)

class Enemy {
        name = ""
        health = 10


        move() {
                let speed = 0;
                let selectedEnemy = document.getElementById("enemy1");
                let position = -30;
                clearInterval(speed);
                speed = setInterval(frame, 8);

                function frame() {
                        if (position == 670) {
                                clearInterval(speed);
                                selectedEnemy.remove()
                                // add some CSS blink effect, remove gold, decrease life 
                        } else {
                                position++;
                                selectedEnemy.style.right = position + 'px';
                        }
                }
        }

        constructor(name) {
                this.name = name
        }
}
// create 1 job seeker
let kevin = new Enemy("Kevin")


// 2. test to summon the object in canvas in window.onload. if success, hide it first
let spawnFromTop = document.getElementById("spawnTop")

// Test moving object within layered <div>, dummyEnemy1 parents is #game-screen
let dummyEnemy1 = document.createElement("img");
dummyEnemy1.setAttribute("src", "./assets/job-seeker.gif")
dummyEnemy1.setAttribute("id", "enemy1")
spawnFromTop.appendChild(dummyEnemy1)






// 3.1. function to set tower by clicking button, append class: 'actived' to .towerGround <div>

// 3.2. Click the <div> box to build tower in particular coordinate

// 4. Create path for enemy

// 5. Create randomizer to summon the enemy position (row 1, row2, row 3)

// 6. Create collision function

// 7. Set if enemy Health is Zero, add GOLD amount




/* ========== Resources ========== */

// 1. Mentor Minshan give great recommendation on choosing either in DOM JS or Canvas. I decided in DOM
// 2. myMove() reference from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_animate_3




/* ========== Testing Ground Code ========== */
// Test moving object within plain <div>

let spawnWalkingTest = document.getElementById("walking-test")

// create Test-Enemy
let dummyEnemy2 = document.createElement("img");
dummyEnemy2.setAttribute("src", "./assets/job-seeker.gif")
dummyEnemy2.setAttribute("id", "test-enemy")
// dummyEnemy2.setAttribute("class", "enemySizing")
spawnWalkingTest.appendChild(dummyEnemy2)

function testMove() {
        let speed = 0;
        let selectedEnemy = document.getElementById("test-enemy");
        let position = -30;
        clearInterval(speed);
        speed = setInterval(frame, 5);

        function frame() {
                if (position == 670) {
                        clearInterval(speed);
                        selectedEnemy.remove()
                        // add some CSS blink effect, remove gold, decrease life 
                } else {
                        position++;
                        selectedEnemy.style.right = position + 'px';
                }
        }
}