/**
 * Jillian Tracy
 * IGME-102: Project 2: Census Visualization , 4/19/21
 * Visually representing data from US census
 * Incorporates JSON file and uses 4 distinct aspects of data
 * Uses form controls to help user clearly interpret data
 */

"use strict"; //catch some common coding errors

let stateArray = [];
const uiBoss = {};

/**
 * setup :
 * Initializes necessary elements for program
 * loadJSON includes callback and failure callback to handle possible errors
 * setup default form controls for optimal data display
 */
function setup() {
    createCanvas(1600, 1900);
    setupUI();
    angleMode(DEGREES);
    colorMode(HSB);
    rectMode(CORNER);
    noStroke();
    loadJSON("P2stateCensusData.json", readStates, fileMistake);

    //loadJSON("usDeaths2020.json"); //COVID data

    /* creates a default selection */
    uiBoss.radio.selected("race");
    uiBoss.checkbox1.checked(true);
    uiBoss.checkbox2.checked(true);
}

/** 
 * readStates :
 * Iterates over the items in states parameter
 * adds new State to global stateArray 
 * For each individual item (a state)
 * call the constructor for the State class with the item as param
 * Add resulting new State to global stateArray
 * @param {array} states - array of data for header + all states
 */
function readStates(states) {
    for (let i = 1; i < states.length; i++) {
        stateArray[i] = new State(states[i]);
    }
    updateViz();
}

/**
 * updateViz :
 * for loop iterates over all items in stateArray
 * calls display() function for each item
 */
function updateViz() {
    background("seashell");

    loadImage("USVizLegend.png", displayLegend);
    if (stateArray.length > 0) {
        for (let i = 1; i < stateArray.length; i++) {
            stateArray[i].display();
        }
    }
    else { //handles error if stateArray does not contain data
        text("Waiting to load data files...", width / 2, height / 2);
    }
}

/**
 * setupUI :
 * Initializes form controls and calls updateViz() if controls are changed
 */
function setupUI() {
    //Form controls
    createElement("frm", "US Census layer controls:");
    createP(); // spacer
    uiBoss.radio = createRadio();

    uiBoss.radio.option("sex", "Sex");
    uiBoss.radio.option("race", "Race / Ethnicity");
    uiBoss.radio.option("incRace", "Median Income by Race");

    uiBoss.radio.changed(updateViz);

    createP(); // spacer
    uiBoss.checkbox1 = createCheckbox("Show state name");
    uiBoss.checkbox1.changed(updateViz);

    createP(); // spacer
    uiBoss.checkbox2 = createCheckbox("Show median housing value");
    uiBoss.checkbox2.changed(updateViz);
}

/**
 * displayLegend :
 * @param {*} theImg - imagepath string
 * callback function for displaying legend image 
 */
function displayLegend(theImg) {
    image(theImg, 50, 1200, 530, 750);
}

/**
 * fileMistake :
 * @param {*} event - error object
 * degrading code to handle error in callback
 */
function fileMistake(event) {
    text("Unable to load data file.", width / 2, height / 2);
    console.log(event);
    noLoop();
}