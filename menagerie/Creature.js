/**
 * Jillian Tracy, 3/12/21
 * Creature:
 * Parent class for 3 derived classes
 * Properties and methods will be inherited unless overwritten
 */
class Creature {
    /**
     * constructor : 
     * @param {*} color - string passed through params instead of hard-coded
     * @param {*} x - default is a random number within canvas size, but could be called with a number param
     * @param {*} y - default is a random number within canvas size, but could be called with a number param
     * Other class properties are initialized here
     */
    constructor(color, x = random(1, width), y = random(1, height)) {
        this.color = color;
        this.x = x;
        this.y = y;

        this.size = 50;

        this.speed = random(1, 2);
        this.legW = 15; //used in display()
        this.leftLegH = 30; //used in display() & update()
        this.rightLegH = 30; //separate from leftLegH because legs move independently

        this.increasing = false; //used in leg animations

        this.type = 1; //used in within() method
    }

    /**
     * display:
     * draws creature with shapes and color
     */
    display() {
        noStroke();
        fill(this.color);

        rect(this.x, this.y, this.size); //body
        rect(this.x, this.y + 49, this.legW, this.leftLegH); //left leg
        rect(this.x + 35, this.y + 49, this.legW, this.rightLegH); //right leg

        //eyes
        fill("black");
        square(this.x + 3, this.y + 20, 15);
        square(this.x + 30, this.y + 20, 15);

    } //end display

    /**
     * move:
     * changes creature's location across canvas
     * according to speed, property values
     */
    move() {
        this.x += this.speed / 2;

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
    } //end move

    /**
     * update:
     * creates leg alternating animation unique to this class
     */
    update() {
        if (this.increasing) {
            this.leftLegH++
            this.rightLegH--; //right leg gets opposite
        }
        else if (!this.increasing) {
            this.leftLegH--;
            this.rightLegH++;
        }
        if (this.leftLegH <= 20) {
            this.increasing = true;
        }
        else if (this.leftLegH >= 35) {
            this.increasing = false;
        }
    } //end update

    /**
     * within: 
     * @param {*} x - x value to be tested within boundaries
     * @param {*} y - y value to be tested within boundaries
     * 
     * I used a switch case to accomodate for each creature's specific boundaries
     * This also prevents method overriding because this method can handle all classes
     * Each class has a number type, which is then handled by switch case
     */
    within(x, y) {
        switch (this.type) {
            case 1: //CREATURE
                if (x >= this.x &&
                    x <= this.x + 50 &&
                    y >= this.y &&
                    y <= this.y + 50 + this.leftLegH) {
                    return true;
                }
                else {
                    return false;
                }
            //no break because returns are last piece of code 

            case 2: //ORB
                //if the distance between param x&y and circle center coords
                //is less than the size... 
                //then the param x&y is within circle
                if (dist(x, y, this.x, this.y) <= this.size / 2) {
                    return true;
                }
                else {
                    return false;
                }
            //no break

            case 3: //BUTTERFLY
                //if X and Y are center line for the butterfly body
                //left wing = this.x-20
                //right wing = this.x+60
                if (x >= this.x - 20 && //left wing boundary
                    x <= this.x + 60 && //right wing boundary
                    y >= this.y &&
                    y <= this.y + 40) { //body Y boundary
                    return true;
                }
                else {
                    return false;
                }

            case 4: //SPIKE
                if (x >= this.x - 20 &&
                    x <= this.x + 60 &&
                    y >= this.y - 55 &&
                    y <= this.y) { //body Y boundary
                    return true;
                }
                else {
                    return false;
                }

            default:
                console.log("Houston, we have a problem...");
        }
    } //end within

    /**
     * setXY : 
     * @param {*} x - will be assigned to X value
     * @param {*} y - will be assigned to Y value
     * Method allows changing this.x and this.y if necessary
     */
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
}