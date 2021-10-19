/**
 * Jillian Tracy, 11/23/20
 * Background:
 * Static background image that displays in canvas
 */
class Background {
    /**
     * constructor:
     * @param {*} loadFile - accepts image name as String to be loaded
     */
    constructor(loadFile) {
        this.img = loadImage(loadFile);
    }
    display() {
        image(this.img, 300, 300);
    }
}