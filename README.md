# Project One: 2D Tower Defense Game

Inspired by "Plant vs Zombie" where some enemies spawned from the right side walking to the left direction.

Game Objective:
Player need to defeat all enemies and protect their safe zone (left side) by building 2 type of auto-attacking towers.


# Project Progress

1. Create Initial Game Screen
![background](./assets/readme/initial-gamescreen.jpg)

1. Test Summonning enemies in various spots and let them move to left direction
![background](./assets/readme/test-spawningAndMoving-enemy.jpg)

1. Do Major Change: Adding 'GameObject' class as a fundamental of other objects (Tower, Bullets, Enemy). Set some get dimension() to help in calculating collision
![background](./assets/readme/getter.jpg)

1. Working and Testing on Colision functions between Enemy and Bullets 
![background](./assets/readme/testing-collision.jpg)

1. Test the enemy damage taken on bullets from different directions
![background](./assets/readme/testing-collision-diff-angle.jpg)

1. Tag SmallTower with 1-bullet-shot, and BigTower with 3-bullets-shot
![background](./assets/readme/tag-bullet-to-tower-type.jpg)

1. Set unique id for each 'GameObject' to help calling their index when we want to remove from main arrays

1. Test overall Colisions, removing enemies & bullets from array, and add +50 gold for each enemy died
![background](./assets/readme/addGold-and-remove-enemy-from-allEnemies)
