/**
 * Jillian Tracy
 * IGME-101: P3 Picker Upper (Part 2), 11/23/20
 * A fairy is controlled by the user and is able to pick up one mushroom at a time
 * The fairy can drop a mushroom as well
 * 
 * Font displayed at bottom of canvas: Phank by Meir Sadan on Dafont.com
 */

"use strict"; //catch some common coding errors

let fairy;
let backgroundImg;
let mushrooms = [];
let fontPhank;

/**
 * preload:
 * initializes instances of classes
 * uses "for" loop to populate mushrooms[] and store instances of Target in the array
 */
function preload() {
    fairy = new Collector();
    backgroundImg = new Background("media/background.jpg");
    fontPhank = loadFont("media/Phank.TTF");

    for (let i = 1; i < 11; i++) {
        mushrooms[i] = new Target("media/mushroom" + i + ".png");
    }
}

/**
 * setup :
 * creates canvas, calls setup() for objects of classes
 * sets up text-related elements like textSize and textFont
 * "for" loop assigns mushroom coordinates
 */
function setup() {
    createCanvas(600, 600);
    imageMode(CENTER);
    rectMode(CENTER);

    textSize(44);
    textFont(fontPhank);
    fill("white");
    stroke("darkGreen");
    strokeWeight(5);

    fairy.setup();

    for (let i = 1; i < mushrooms.length; i++) {
        mushrooms[i].setup();
        mushrooms[i].setX(30, 550);
        mushrooms[i].setY(i * 50); //makes sure each mushroom has a designated row, minimizes overlap
    }
}

/**
 * draw :
 * Displays background, collector, and 10 targets
 * Handles Q and C keys being pressed, triggers methods in other classes
 * Also displays text at bottom of canvas for clarity to user
 */
function draw() {
    backgroundImg.display();
    for (let i = 1; i < mushrooms.length; i++) { //iterates through array to display mushrooms
        mushrooms[i].display();
    }
    fairy.display();
    fairy.moveFairy();



    //IF Q PRESSED (PICK UP):
    if (keyIsDown(81)) { //Q key code = 81
        for (let i = 1; i < mushrooms.length; i++) { //for each mushroom...

            if (fairy.isNear(mushrooms[i].x, mushrooms[i].y) === true) { //if fairy is near mushroom

                if (fairy.mushroom === null) { //if they don't already have a mushroom
                    fairy.pickUp(mushrooms[i]); //pick it up
                }
            }
        } //end for loop (iterates through list)
    } //end if (keyIsDown(81))


    //IF C PRESSED (DROP):
    else if (keyIsDown(67)) { //C key code = 67
        for (let i = 1; i < mushrooms.length; i++) {
            if (mushrooms[i].collected === true) { //find one that was collected
                fairy.drop();
            }
        }
    }

    //Text display mushroom held
    for (let i = 1; i < mushrooms.length; i++) {
        if (mushrooms[i].collected === true) {
            text("Holding mushroom " + i + ".", 150, 550);
        }
    }
    if (fairy.mushroom === null) {
        text("No mushroom is held.", 150, 550);
    }
}
