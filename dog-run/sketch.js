/**
 * Jillian Tracy
 * IGME-102: Project 3 - Sprites World, 5/7/21
 * Creates 10 moving Dog sprites, who can be named and sat down.
 * Textures are custom-coded and created with some random variables
 * to enhance uniqueness. 
 * Higher-order functions utilized where necessary.
 */

"use strict"; //catch some common coding errors

//single global variable
const globalBoss = {
    dogArray: [],
    bgImage: null
};

/**
 * preload:
 * Populates array of 10 Dog instances
 * Preloads external images in Dog's constructor
 */
function preload() {
    for (let i = 0; i < 10; i++) {
        globalBoss.dogArray[i] = new Dog();
    }
}

/**
 * setup :
 * Creates canvas and background image
 * Calls Dog setup function
 * Initializes settings necessary for text display
 * Calls setupUI to display text input form element
 */
function setup() {
    createCanvas(2500, 1000);

    //text settings - used when displaying name
    textSize(20);
    textStyle(BOLD);
    stroke("white");
    strokeWeight(3);

    setupUI();

    //create bgImage
    globalBoss.bgImage = createGrass(color("lawnGreen"), width, height);

    //setup all Dogs
    globalBoss.dogArray.forEach(doggy => {
        doggy.setup();
    });
}

/**
 * draw :
 * Displays background image and Dog sprites
 * Uses forEach method to call display() and move() for all Dogs 
 * Calls nameDog as a callback if text is entered in the input field
 */
function draw() {
    image(globalBoss.bgImage, 0, 0);

    globalBoss.dogArray.forEach(doggy => {
        doggy.display();
        doggy.move();
    });

    globalBoss.name.changed(nameDog);
}

/**
 * mouseClicked :
 * Checks if mouse is within a dog, and sits it down if so.
 */
function mouseClicked() {
    globalBoss.dogArray.forEach(doggy => {
        if (doggy.within(mouseX, mouseY)) {
            doggy.state = false; //set to sit
        }
    });
}

/**
 * createGrass:
 * Creates background image with randomized offset
 * @param {*} c - color
 * @param {*} w - image width
 * @param {*} h - image height 
 * @returns - created image
 */
function createGrass(c, w, h) {
    let img = createImage(w, h);
    //bark will look different every time
    let offset = random(5);
    //set all the pixels
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let pct = noise(offset + x * 0.009, offset + y * .06);
            pct = 2 + round(pct * 4); //get integer values 2...6
            pct = pct / 6; //get values 0 ..1
            img.set(x, y, color(red(c) * pct,
                green(c) * pct,
                blue(c) * pct));
        }
    }
    img.updatePixels();
    return img;
}

/**
 * setupUI:
 * One-time initialization of text input field and label
 */
function setupUI() {
    createElement("frm", "Name a dog:   ");
    globalBoss.name = createInput();
}

/**
 * nameDog:
 * Filters out named dogs, then assigns a name to the first unnamed dog
 * If all dogs are named, the text input field is removed. 
 */
function nameDog() {
    let named = 0;
    let unnamed = globalBoss.dogArray.filter(doggy => doggy.name === ""); //filter out named dogs

    if (unnamed.length > 0) { //check to see if any dogs need a name
        while (named < 1) {
            unnamed[0].name = globalBoss.name.value();
            named = 1; //prevents naming multiple dogs
        }
        globalBoss.name.value("");
    } else { //if all dogs are named
        globalBoss.name.remove(); //remove text input field
    }
}