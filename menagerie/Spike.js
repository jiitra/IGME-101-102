/**
 * Jillian Tracy, 3/12/21
 * Spike:
 * The only triangle creature
 */
class Spike extends Creature {
    /**
     * constructor : 
     * @param {*} color - inherited from Creature, along with x and y
     * @param {*} x - see above comment
     * @param {*} y - see above comment
     */
    constructor(color, x = random(1, width), y = random(1, height)) {
        super(color, x, y); //calls Creature constructor
        this.speed = random(0.8, 2); //unique, randomized speed
        this.lineY = this.y - 60; //used for creating "eyes" in display()
        this.type = 4; //unique to Spike
    }

    /**
     * display :
     * constructs visuals using triangle and lines
     */
    display() {
        fill(this.color);

        triangle(this.x, this.y, this.x + 30, this.y - 55, this.x + 60, this.y);
        strokeWeight(7); //important for line to be visible
        strokeCap(SQUARE);
        stroke(this.color);

        //levitating line
        line(this.x, this.lineY - 30, this.x + 60, this.lineY - 30);

        //little eyes
        strokeWeight(3);
        stroke("white");
        line(this.x + 10, this.y - 10, this.x + 20, this.y - 10);
        line(this.x + 30, this.y - 10, this.x + 40, this.y - 10);

        noStroke(); //reset so stroke doesn't carry into other creatures
    }

    /**
     * update :
     * moves line up and down using sin function
     */
    update() {
        let radius = 10;
        this.lineY = this.y + (sin(frameCount) * radius);
    }
}