/**
 * Jillian Tracy, 3/12/21
 * Orb:
 * Extends Creature class, so will inherit properties and methods unless overwritten
 * The only circle-based creature
 */
class Orb extends Creature {
    /**
     * constuctor :
     * @param {*} color - property inherited from Creature, but actual value differs
     * @param {*} x - inherited property
     * @param {*} y - inherited property
     */
    constructor(color, x = random(1, width), y = random(1, height)) {
        super(color, x, y); //calls Creature constructor

        this.speed = random(1, 1.7); //unique, randomized speed
        this.size = random(80, 110); //unique, randomized size

        this.mouthH = 3; //will be animated in update()
        this.shrinking = true; //used in update() for animation

        this.type = 2; //unique to Orb class
    }

    /**
     * display:
     * creates circle and ellipse elements to make orb creature
     */
    display() {
        fill(this.color);
        circle(this.x, this.y, this.size);

        //eyes and mouth
        fill("black");
        circle(this.x - 11, this.y, 5);
        circle(this.x + 11, this.y, 5);
        ellipse(this.x, this.y + 2, 15, this.mouthH);
    }

    /**
     * move:
     * Overrides the Creature move() method
     * The Orb moves along the Y axis instead of the X axis
     */
    move() {
        this.y += this.speed / 3; //unique speed

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
     * update :
     * controls unique animation, which is mouth movement
     */
    update() {
        //grows or shrinks circle according to boolean
        //also controls mouth flap movement
        if (this.shrinking) {
            this.size--;
            this.mouthH++;
        }
        else if (!this.shrinking) {
            this.size++;
            this.mouthH--;
        }

        //flips shrinking if circle becomes too big, or too small
        if (this.size <= 80) {
            this.shrinking = false;
        }
        else if (this.size >= 100) {
            this.shrinking = true;
        }
    } //end update
}