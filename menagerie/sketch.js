/**
 * Jillian Tracy
 * IGME-102: Project 1 - Menagerie, 3/12/21
 * Creates a menagerie of 15 Creatures
 * Uses randomization and 1 parent class Creature, which has 3 derived classes
 */

"use strict"; //catch some common coding errors

let menagerie;

/**
 * setup :
 * Assigns value to global variable menagerie by calling stockMenagerie() method
 */
function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    noStroke();

    menagerie = stockMenagerie(15);
}

/**
 * draw :
 * Loops over menagerie array, allowing continuous updating of methods called within loop
 * Checks for mouseIsPressed, and creates pointer at location if true
 */
function draw() {
    background("black");
    scenery();

    //Loop over length of menagerie and call appropriate methods
    for (let i = 0; i < menagerie.length; i++) {
        menagerie[i].display();
        menagerie[i].update();
        menagerie[i].move();

        if (mouseIsPressed) {
            fill("white");
            triangle(mouseX, mouseY, mouseX + 5, mouseY - 30, mouseX + 10, mouseY);
            arc(mouseX, mouseY, 30, 10, 0, 90);
        }
    }

} //end draw

/**
 * scenery :
 * generate background for creatures
 */
function scenery() {
    stroke("red");
    noFill();

    //coordinates for triangle
    let x1 = -200;
    let y1 = height / 2;
    let x2 = 450;
    let y2 = -200;
    let x3 = width;
    let y3 = height;

    let weight = 10;
    let increment = 0;

    while (weight > 0) {
        strokeWeight(weight);
        triangle(x1 += increment, y1, x2, y2 += increment, x3 -= increment, y3 -= increment);
        weight = weight / 2; //decreasing weight
        increment += 5; //increasing increment by 5 for each loop iteration
    }

    //making two circles
    strokeWeight(3);
    fill(250, 0, 100, 30 + 10 * 0.44);
    circle(width / 2, height / 2, 600);
    circle(600, 200, 150);

    //setup for square loop
    strokeWeight(0.3);
    noFill();

    let x4 = 20;
    let y4 = 20;
    let numSquares = 50; //can be altered to change number of squares
    let space = 10; //will be added to x and y coordinates each iteration

    while (numSquares > 0) { //loop runs numSquares number of times
        rect(x4 += space, y4 += space, 399);
        numSquares--;
    }
    noStroke(); //makes sure creatures have no stroke
} //end scenery

/**
 * getNewCreature :
 * creates new Creature based on random number, interpreted by if statements
 * also chooses random color out of an array by using floor() math function
 * @returns the newCreature
 */
function getNewCreature() {
    let newCreature = null;

    let randNum = int(random(0, 6));
    if (randNum < 2) {

        //shades of blue color array
        let colors = ["darkCyan", "darkSlateBlue", "lightSteelBlue", "midnightBlue", "royalBlue", "steelBlue"];
        let index = floor(random(colors.length));
        let color = colors[index];

        newCreature = new Spike(color); //instance of Triangle class
    }
    else if (randNum < 3) {
        //offwhite colors
        let colors = ["aliceBlue", "azure", "cornsilk", "floralWhite", "honeyDew", "ivory"];
        let index = floor(random(colors.length));
        let color = colors[index];
        newCreature = new Butterfly(color); //instance of Butterfly class
    }
    else if (randNum < 5) {
        //shades of pink/purple
        let colors = ["paleVioletRed", "pink", "plum", "rosyBrown", "salmon", "thistle"];
        let index = floor(random(colors.length));
        let color = colors[index];
        newCreature = new Orb(color); //instance of Orb class
    }
    else {
        //shades of green color array
        let colors = ["forestGreen", "green", "greenYellow", "lawnGreen", "lightGreen", "lime"];
        let index = floor(random(colors.length));
        let color = colors[index];

        newCreature = new Creature(color); //instance of Creature class
    }
    return newCreature;
}

/**
 * stockMenagerie : 
 * @param {*} numCreatures - number passed in param, number of creatures in menagerie
 * @returns critters, an array of newCreatures
 */
function stockMenagerie(numCreatures) {
    let critters = [];
    console.log("***** Stocking the menagerie! *****");

    for (let i = 0; i < numCreatures; i++) {
        critters[i] = getNewCreature();
    }
    return critters;
}

/**
 * mouseClicked :
 * if mouseClicked, check to see if a creature is clicked on
 * if so, replace creature with a new instance of Creature
 */
function mouseClicked() {
    let replaceMe = -1;

    for (let i = 0; i < menagerie.length; i++) {
        if (menagerie[i].within(mouseX, mouseY)) {
            replaceMe = i;
        } //end if
    } //end for loop that iterates through menagerie

    if (replaceMe > -1) {
        let origX = menagerie[replaceMe].x;
        let origY = menagerie[replaceMe].y;
        console.log("*replacing", menagerie[replaceMe]); //indicates current creature being replaced

        menagerie.splice(replaceMe, 1, getNewCreature());
        menagerie[replaceMe].setXY(origX, origY);

        console.log("*replaced with", menagerie[replaceMe]); //indicates what the new creature is
        console.log("\n"); //improves console readability
    }
}