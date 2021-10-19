/**
 * Jillian Tracy, 11/23/20
 * Collector:
 * Has two states, facing left or right
 * WASD controls move fairy
 * Picks up and drops one instance of Target (mushroom)
 * Fairy can only collect targets within a 15 px range
 * Target will move with fairy if it is collected
 * 
 * Images from Unsplash.com, but pixelized and composited in Photoshop
 */
class Collector {
    /**
     * constructor:
     * description
     */
    constructor() {
        //using a boolean for this.state because
        //there are only two states for the collector, and one must be active at all times
        this.state = true; //faceL default
        this.faceL = loadImage("media/fairyL.png");
        this.faceR = loadImage("media/fairyR.png");
        this.x = 300;
        this.y = 300;
        this.speed = 1;
        this.mushroom = null;
    }

    /** 
     * setup:
     * resizes image
    */
    setup() {
        this.faceL.resize(80, 0);
        this.faceR.resize(80, 0);
    }

    /**
     * display:
     * determines state of image and displays using properties
     */
    display() {
        let stateImage = null;
        switch (this.state) {
            case true: //faceL
                stateImage = this.faceL;
                break;
            case false: //faceR
                stateImage = this.faceR;
                break;
        }
        image(stateImage, this.x, this.y);
    }

    /**
     * updateState:
     * changes state based on user input
     * so fairy always faces the correct way
     */
    updateState() {
        if (keyIsDown(65)) { //'A' key
            this.state = true; //faceL
        }
        else if (keyIsDown(68)) { //'D' key
            this.state = false; //faceR
        }
    }

    /**
     * moveFairy:
     * series of "if" statements check arrow key activity,
     * change fairy's x or y depending on keys
     * Also checks for if there is a mushroom collected,
     * so it will move with fairy
     */
    moveFairy() {
        //KEYCODES
        //w 87
        //a 65
        //s 83
        //d 68
        if (keyIsDown(65)) { //A Key (go left)
            this.x -= this.speed;

            if (this.mushroom !== null) { //carries mushroom with it
                this.mushroom.x -= this.speed;
            }
        }
        if (keyIsDown(68)) { //D key (go right)
            this.x += this.speed;

            if (this.mushroom !== null) {
                this.mushroom.x += this.speed;
            }
        }
        if (keyIsDown(87)) { //W key (go up)
            this.y -= this.speed;

            if (this.mushroom !== null) {
                this.mushroom.y -= this.speed;
            }
        }
        if (keyIsDown(83)) { //S key (go down)
            this.y += this.speed;

            if (this.mushroom !== null) {
                this.mushroom.y += this.speed;
            }
        }

        // Wrap x around boundaries
        if (this.x < -20) {
            this.x = width;
        } else if (this.x > width) {
            this.x = -20;
        }
        // Wrap y around boundaries
        if (this.y < -20) {
            this.y = height;
        } else if (this.y > height) {
            this.y = -20;
        }
        this.updateState();
    }

    /**
     * Compares Collector X and Y to target X and Y
     * using absolute value and subtraction.
     * if collector is within 15 px of target,
     * function returns true
     * otherwise, function returns false
     */
    isNear(targetX, targetY) {
        let distanceX = abs(this.x - targetX);
        let distanceY = abs(this.y - targetY);

        if (distanceX < 15 && distanceY < 15) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 
     * @param {*} mushroomPicked - specific instance of Target to be collected
     */
    pickUp(mushroomPicked) {
        this.mushroom = mushroomPicked;
        this.mushroom.collected = true;

        this.mushroom.x = this.x - 10; //visual "carry" object
        this.mushroom.y = this.y;
    }

    /**
     * calls dropped() in target to set collected to false
     * sets mushroom instance in this class to null
     */
    drop() {
        this.mushroom.dropped();
        this.mushroom = null;
    }
}