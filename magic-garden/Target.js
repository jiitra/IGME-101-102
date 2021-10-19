/**
 * Jillian Tracy, 11/23/20
 * Target:
 * Controls 10 mushroom images
 * Is picked up and dropped by collector
 * 
 * Images from Unsplash.com, but pixelized and edited in Photoshop
 */
class Target {
    /**
     * constructor:
     * @param {*} loadFile - accepts image name as parameter, generates generic base property
     * Initializes properties x and y
     */
    constructor(loadFile) {
        this.targetImg = loadImage(loadFile);
        this.x;
        this.y;
        this.collected = false;
    }

    /**
     * setup:
     * Resizes image; static number ensures uniformity
     */
    setup() {
        this.targetImg.resize(100, 0);
    }

    /**
     * display:
     * displays image using class properties
     */
    display() {
        image(this.targetImg, this.x, this.y);
    }

    /**
     * 
     * @param {*} a - used as min bound in random()
     * @param {*} b - used as max bound in random()
     * 
     * I could have accomplished this in sketch by writing 
     * mushrooms[i].x = random(30, 550);
     * But I think it's better to put it here since
     * Target owns the data
     */
    setX(a, b) {
        this.x = random(a, b);
    }

    /**
     * 
     * @param {*} y - accepts parameter and sets Y to it
     */
    setY(y) {
        this.y = y;
    }

    /**
     * 
     */
    dropped() {
        this.collected = false;
    }

}