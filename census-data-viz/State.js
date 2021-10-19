/**
 * Jillian Tracy, 4/19/21
 * State :
 * Displays data visualization & loads census properties
 */
class State {
    /**
     * constructor :
     * @param {} jsonState - JSON file with census data
     * loads JSON data into State properties
     * maps necessary values for display purposes
     * hard-codes x&y of Hawaii, Alaska, PR for proper display
     */
    constructor(jsonState) {
        this.name = jsonState.state; /* State name */
        this.x = Number(jsonState.lon);
        this.y = Number(jsonState.lat);
        /* Sex: Categorical */
        [this.pop, this.male, this.female] = jsonState.sex;

        /* Race / Ethnicity: Categorical */
        [this.whiteNonHisp, this.whiteHisp, this.black,
        this.amerInd, this.asian, this.hawPac, this.otherNonHisp,
        this.otherHisp, this.twoPlusRaces] = jsonState.raceEth;

        this.raceArray = jsonState.raceEth;

        /* Income by Race: Categorical */
        [this.incEveryone, this.incWhite, this.incBlack, this.incAmerInd, this.incAsian,
        this.incHawPac, this.incOther, this.incTwoPlusRaces, this.incWhiteNonHisp, this.incHisp]
            = jsonState.incomeRace;

        this.incomeArray = jsonState.incomeRace;

        /* Housing Value */
        this.housingValue = jsonState.housingValue;
        this.housingValueSize = map(this.housingValue, 111500, 615300, 10, 100);

        //map(num, low, high, newLow, newHigh, [keepBounds])
        this.x = map(this.x, -120.74, -68.97, 200, 1500);
        this.y = map(this.y, 27.99, 44.75, 1300, 300);

        /* Hard-coding Hawaii, Alaska, PR */
        if (this.name === "Hawaii") {
            this.x = 800;
            this.y = height - 300;
        }
        else if (this.name === "Alaska") {
            this.x = 100;
            this.y = 100;
        }
        else if (this.name === "Puerto Rico") {
            this.x = 1000;
            this.y = height - 300;
        }

        /* size = map of population */
        this.size = map(this.pop, 581024, 39283497, 50, 300);
    }

    /**
     * display :
     * Creates visualization for dimensions of data
     * Uses switch case and if statements to check uiBoss values
     * And changes visualization based on form controls
     */
    display() {
        /*Initializing data used to make pie charts */
        let [total, female, male] = [this.pop, this.female, this.male];
        let startValue = 0;
        let range = 0;

        /*Displays housing value circle*/
        if (uiBoss.checkbox2.checked()) {
            this.displayHousingValue();
        }

        /**
         * SWITCH CASE: 3 Radio buttons
         * Sex, Race/Eth, Median income By race
         * Handles display of one at a time
         */
        switch (uiBoss.radio.value()) {
            case ("sex"):
                /* "Sex" visualization */

                //female slice
                range = 360 * female / total;
                fill(50, 100, 100, 0.8);
                //arc(x, y, w, h, start, stop);
                arc(this.x, this.y, this.size, this.size, startValue, startValue + range);
                startValue += range; //sets for next piece

                //male slice
                range = 360 * male / total;
                fill(231, 31, 100, 0.8);
                arc(this.x, this.y, this.size, this.size, startValue, startValue + range);
                startValue += range;
                break;

            case ("race"):
                /* Race population visualization */

                for (let i = 0; i < this.raceArray.length; i++) {
                    range = 360 * this.raceArray[i] / total;

                    switch (i) {
                        case (0): /* white non-hispanic */
                            fill(5, 70, 100, 0.5); //red
                            break;
                        case (1): /* white hispanic */
                            fill(34, 100, 100, 0.5); //orange
                            break;
                        case (2): /* black */
                            fill(56, 100, 100, 0.5); //yellow
                            break;
                        case (3): /* american indian */
                            fill(107, 100, 100, 0.5); //green
                            break;
                        case (4): /* asian */
                            fill(167, 100, 100, 0.5); //teal
                            break;
                        case (5): /* hawaiian pacific islander */
                            fill(200, 100, 100, 0.5); //blue
                            break;
                        case (6): /* other non-hispanic */
                            fill(232, 100, 100, 0.5); //blue2
                            break;
                        case (7): /* other hispanic */
                            fill(279, 100, 100, 0.5); //purple
                            break;
                        case (8): /* multiracial */
                            fill(311, 100, 100, 0.5); //pink
                            break;
                    } //end switch case

                    arc(this.x, this.y, this.size, this.size, startValue, startValue + range);
                    startValue += range;
                } //end for loop

                break;

            case ("incRace"):
                this.displayIncRace();
                break;

        } //end radio button switch case

        if (uiBoss.checkbox1.checked()) {
            /* State name */
            fill("black");
            textSize(16);
            text(this.name, this.x, this.y);
        }

    } //end display

    /**
     * displayHousingValue :
     * function called by display()
     * creates circles for housing value visualization
     */
    displayHousingValue() {
        stroke(0, 0, 50);
        strokeWeight(5);

        fill(0, 0, 100, 0.8);
        circle(this.x, this.y, this.housingValueSize);

        noStroke();
        noFill();
    }

    /**
     * displayIncRace :
     * function called by display()
     * contains code for creating bar graphs
     */
    displayIncRace() {
        /*Creates box frame around graph*/
        strokeWeight(3);
        stroke(0, 0, 50, 0.8);
        fill(0, 0, 100, 0.5);

        let xVal = 30;
        let rectWidth = map(this.size, 50, 300, 10, 40);

        rect(this.x - xVal, this.y - xVal, rectWidth * 10, 120);
        noStroke();

        /* For loop iterates through array, creates rectangles */
        for (let i = 0; i < this.incomeArray.length; i++) {

            /* map height of bars in graph */
            let height = map(this.incomeArray[i], 10000, 90000, 1, 100);
            if (height < 0) {
                height = 0;
            }

            /* switch case for fill colors */
            switch (i) {
                case (0): /* median income of everyone */
                    fill(187, 100, 34, 0.5); //dark blue
                    break;
                case (1): /* white */
                    fill(5, 70, 100, 0.5); //red
                    break;
                case (2): /* black */
                    fill(56, 100, 100, 0.5); //yellow
                    break;
                case (3): /* amer. ind */
                    fill(107, 100, 100, 0.5); //green
                    break;
                case (4): /* asian */
                    fill(167, 100, 100, 0.5); //teal
                    break;
                case (5): /* hawaiian / pacific islander */
                    fill(200, 100, 100, 0.5); //blue
                    break;
                case (6): /* other */
                    fill(232, 100, 100, 0.5); //blue2
                    break;
                case (7): /* multiracial */
                    fill(311, 100, 100, 0.5); //pink
                    break;
                case (8): /* white, non-hispanic */
                    fill(5, 70, 100, 0.5); //red
                    break;
                case (9): /* hispanic */
                    fill(279, 100, 100, 0.5); //purple
                    break;
                default:
                    //handling possible error
                    text("Unable to display data", width / 2, height / 2);
            } //end switch case

            rect(this.x - xVal, this.y - 30, rectWidth, height);
            xVal -= rectWidth;

        } //end for loop
    }
}