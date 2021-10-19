/**
 * Jillian Tracy, 3/12/21
 * Butterfly:
 * Another extended class from Creature
 */
class Butterfly extends Creature {
    /**
     * constructor : 
     * @param {*} color - property inherited from Creature
     * @param {*} x - see above comment
     * @param {*} y - see above comment
     */
    constructor(color, x = random(1, width), y = random(1, height)) {
        super(color, x, y); //calls Creature constructor

        this.wingW = 40; //used in display()
        this.wingH = 8; //used in display() and update() for animation

        this.type = 3; //unique to Butterfly
    }

    /**
     * display :
     * creates body from line, and wings from ellipses
     * the body is the central X and Y coordinates,
     * which is different from Creature because that class uses rectMode(CORNER)
     */
    display() {
        fill(this.color);
        strokeWeight(8);
        stroke(this.color);

        line(this.x, this.y, this.x, this.y + 40); //body line
        ellipse(this.x - 20, this.y + 10, this.wingW, this.wingH); //left top wing
        ellipse(this.x + 20, this.y + 10, this.wingW, this.wingH); //right big wing

        ellipse(this.x - 20, this.y + 20, this.wingW - 10, this.wingH); //left bottom wing
        ellipse(this.x + 20, this.y + 20, this.wingW - 10, this.wingH); //right bottom wing

        noStroke();
    }

    /**
     * move:
     * Overrides the Creature move() method
     * The Butterfly moves along both axes on a diagonal, with reduced speed
     */
    move() {
        this.x += this.speed / 4;
        this.y += this.speed / 2;

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
    }

    /**
     * update:
     * gradually changes wing height using sin function
     */
    update() {
        this.wingH = 4 + (sin(frameCount) * 6);
    } //end update()

}