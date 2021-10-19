/**
 * Jillian Tracy
 * class Dog: 
 * Contains properties and methods related to Dog display and movement
 */
class Dog {
    /**
     * constructor:
     * Initializes properties, utilizes random() function often
     * to ensure uniqueness of value to each Dog instance
     * @param {*} x - default random value
     * @param {*} y - defauly random value
     */
    constructor(x = random(4, 90), y = random(20, 700)) {
        this.x = x;
        this.y = y;
        this.speed = random(1, 3);
        this.size = random(300, 350);
        this.name = "";

        this.state = true //running default

        //images are preloaded when Dog instance is created in sketch's preload()
        this.running1 = loadImage("img/dog_running1.png");
        this.running2 = loadImage("img/dog_running2.png");
        this.sitting = loadImage("img/dog_sitting.png");

        //used for creating perlinStripe
        this.pOffset = random(15);
        this.color = this.getColor();

        this.maskedImgs = [];
        this.currentImage;

        this.counter;
        this.interval = random(4);
    }

    /**
     * setup:
     * Masks perlin stripe images with each external image
     * Begins counter, which is used for cycling 2 images in Running state
     */
    setup() {
        this.maskImages(3);
        this.currentImage = this.maskedImgs[0];

        this.startCounter();
    }

    /**
     * display:
     * Changes this.currentImage based on state and timer values
     * If running, checks time against counter and cycles between 2 images
     * Uses this.interval which is random and unique to each Dog, 
     * allowing for asynchronous cycles 
     */
    display() {
        if (this.state) { //if state = running
            //series of if statements use timer to alternate 2 images
            if (this.getTime() < this.interval) {
                this.currentImage = this.maskedImgs[0];
            }
            else if (this.getTime() < (this.interval * 2)) {
                this.currentImage = this.maskedImgs[1];
            }
            else if (this.getTime() >= (this.interval + (2 * 2))) {
                this.counter = millis(); //resets counter
            }
        }
        else { //if state != running AKA sitting
            this.currentImage = this.maskedImgs[2];
        }

        //below happens regardless of state
        image(this.currentImage, this.x, this.y);

        text(this.name, this.x + 140, this.y + 100);
    }

    /**
     * perlinStripe:
     * Creates perlin stripe image
     * Each image is unique because of color selection
     * and random number pOffset 
     * @param {*} c - color, uses this.getColor
     * @param {*} w - width of image
     * @param {*} h - height of image
     * @returns - perlin stripe image created
     */
    perlinStripe(c, w, h) {
        let img = createImage(w, h);
        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                let pct = noise(this.pOffset + y * .02);
                img.set(x, y, color(red(c) * pct,
                    green(c) * pct,
                    blue(c) * pct));
            }
        }
        img.updatePixels();
        return img;
    }

    /**
     * move:
     * Moves Dog if it is running, using this.speed
     * Wraps around boundaries to prevent escape
     */
    move() {
        if (this.state) { //if actually running to cause movement
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
        }
    }

    /**
     * getColor:
     * Randomly selects color from array
     * @returns - randomly chosen color 
     */
    getColor() {
        let colors = ["chocolate", "bisque", "firebrick", "rosybrown", "tomato"];
        let index = floor(random(colors.length));
        let color = colors[index];
        return color;
    }

    /**
     * maskImages:
     * Masks external images with perlin stripe and resizes them
     * Populates maskedImgs array
     * @param {*} n - number of images to mask
     */
    maskImages(n) {
        for (let i = 0; i < n; i++) {
            this.maskedImgs[i] = this.perlinStripe(color(this.color), 500, 300);
            switch (i) {
                case 0:
                    this.maskedImgs[0].mask(this.running1);
                    break;
                case 1:
                    this.maskedImgs[1].mask(this.running2);
                    break;
                case 2:
                    this.maskedImgs[2].mask(this.sitting);
                    break;
            }
            this.maskedImgs[i].resize(this.size, 0);
        }
    }

    /**
     * startCounter:
     * begins counter necessary for image cycle
     */
    startCounter() {
        this.counter = millis();
    }

    /**
     * getTime:
     * Calculates difference between counter initialization and current time
     * @returns - time since counter intitialized
     */
    getTime() {
        let time = millis() - this.counter;
        time = time / 1000;
        return time;
    }

    /**
     * within:
     * tests params against shape boundaries to determine if x & y are within image
     * @param {*} x : X value compared to shape X boundaries
     * @param {*} y : Y value compared to shape Y boundaries
     * @returns : true or false value dependent on comparison
     */
    within(x, y) {
        if (x >= this.x &&
            x <= this.x + 280 &&
            y >= this.y &&
            y <= this.y + 100) {
            return true;
        } else {
            return false;
        }
    }
}