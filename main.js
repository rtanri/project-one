console.log("JS Connected")
// Pseudo code
// 1. Create object class type: tower, enemy, and bullet


// 2. test to summon the object in canvas in window.onload. if success, hide it first
let spawnFromTop = document.getElementById("spawnTop")
let spawnWalkingTest = document.getElementById("walking-test")

// Test moving object within layered <div>, dummyEnemy1 parents is #game-screen
let dummyEnemy1 = document.createElement("img");
dummyEnemy1.setAttribute("src", "./assets/job-seeker.gif")
// dummyEnemy1.setAttribute("class", "enemySizing")
dummyEnemy1.setAttribute("id", "enemy1")
spawnFromTop.appendChild(dummyEnemy1)


// Test moving object within plain <div>
let dummyEnemy2 = document.createElement("img");
dummyEnemy2.setAttribute("src", "./assets/job-seeker.gif")
dummyEnemy2.setAttribute("id", "enemy2")
// dummyEnemy2.setAttribute("class", "enemySizing")
spawnWalkingTest.appendChild(dummyEnemy2)



// myMove() reference from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_animate_3


function myMove() {
        let speed = 0;
        // let selectedEnemy = document.getElementsByClassName("enemySizing"); /not working

        let selectedEnemy = document.getElementById("enemy1");
        // let selectedEnemy = document.getElementById("enemy2");
        // need to set as method to each enemy Object since getElementsByClassName is not working

        let position = -30;
        clearInterval(speed);
        speed = setInterval(frame, 8);

        function frame() {
                if (position == 670) {
                        clearInterval(speed);
                        selectedEnemy.remove() // remove the enemy in end-point
                        // add some CSS blink effect, remove gold, decrease life 
                } else {
                        position++;
                        selectedEnemy.style.right = position + 'px';
                }
        }
}

// 3.1. function to set tower by clicking button, append class: 'actived' to .towerGround <div>

// 3.2. Click the <div> box to build tower in particular coordinate

// 4. Create path for enemy

// 5. Create randomizer to summon the enemy position (row 1, row2, row 3)

// 6. Create collision function

// 7. Set if enemy Health is Zero, add GOLD amount


// 1. overlayBox
// 2. spawn in flexbox
// css top and right
// use DOM to move them along

// tutorial to make JS game in DOM / Canvas
// 