const CLOSED = 0;
const OPEN = 1;
const NOT_READY = 0;
const READY = 1;
const SPREAD = 2;

const BREAD_BAG_ID = 'bread-bag';
const PB_JAR_ID = 'pb-jar';
const JELLY_JAR_ID = 'jelly-jar';
const BREAD_SLICE_1_ID = 'bread-slice1';
const BREAD_SLICE_2_ID = 'bread-slice2';

const PB_BREAD = "Bread with Peanut Butter on it.";
const JELLY_BREAD = "Bread with Jelly on it.";


const sandwichStatus = {
    firstSlice: NOT_READY,
    secondSlice: NOT_READY,
    spreadPb: false,
    spreadJelly: false,
    complete: false
}


let breadBagStatus = CLOSED;
let pbJarStatus = CLOSED;
let jellyJarStatus = CLOSED;


function takeASliceOfBread() {
    if (breadBagStatus === CLOSED) {
        alert("Unable to get bread!");
        return;
    }

    if (sandwichStatus.secondSlice) {
        alert("I think two slices is enough");
        return;
    }

    if (sandwichStatus.firstSlice > NOT_READY) {
        sandwichStatus.secondSlice = READY;
        document.getElementById(BREAD_SLICE_2_ID).removeAttribute("hidden");
        return;
    }

    sandwichStatus.firstSlice = READY;
    document.getElementById(BREAD_SLICE_1_ID).removeAttribute("hidden");
}

function openBreadBag() {
    if (breadBagStatus === OPEN) {
        alert("Bread already open!");
        return;
    }

    breadBagStatus = OPEN;
    setToOpen(BREAD_BAG_ID);
}

function openPbJar() {
    if (pbJarStatus === OPEN) {
        alert("PB Jar already open!");
        return;
    }

    pbJarStatus = OPEN;
    setToOpen(PB_JAR_ID);
}

function setToOpen(id) {
    const thingToOpen = document.getElementById(id);
    let text = thingToOpen.textContent.replace("Closed", "Open");
    thingToOpen.textContent = text;
}

function spreadPB() {
    if (pbJarStatus === CLOSED) {
        alert("Unable to get to Peanut Butter!");
        return;
    }

    if (sandwichStatus.firstSlice === NOT_READY) {
        alert("I guess we're spreading peanut butter over the counter?");
        return;
    }

    if (sandwichStatus.spreadPb && sandwichStatus.secondSlice === READY) {
        alert(`mmmmm, delicious PB & PB sandwich.  Not what we're looking for though \u2639`);
        return;
    }

    sandwichStatus.spreadPb = true;
    if (sandwichStatus.firstSlice === READY) {
        spreadOnBread(BREAD_SLICE_1_ID, PB_BREAD);
    } else if (sandwichStatus.secondSlice === READY) {
        spreadOnBread(BREAD_SLICE_2_ID, PB_BREAD);    
    } else {
        alert("We're gonna need more bread!");
    }

}

function openJellyJar() {
    if (jellyJarStatus === OPEN) {
        alert("The jelly jar is already open!");
        return;
    }

    jellyJarStatus = OPEN;
    setToOpen(JELLY_JAR_ID);
}

function spreadJelly() {
    if (jellyJarStatus === CLOSED) {
        alert("Unable to get to Jelly!");
        return;
    }

    if (!sandwichStatus.firstSlice) {
        alert("I guess we're making a counter & Jelly mess?");
        return;
    }

    if (sandwichStatus.spreadJelly && sandwichStatus.secondSlice) {
        alert("mmmm, delicious Jelly & Jelly sandwich. Try again!");
        return;
    }

    sandwichStatus.spreadJelly = true;
    if (sandwichStatus.firstSlice === READY) {
        spreadOnBread(BREAD_SLICE_1_ID, JELLY_BREAD);
    } else if (sandwichStatus.secondSlice === READY) {
        spreadOnBread(BREAD_SLICE_2_ID, JELLY_BREAD);    
    } else {
        alert("We're gonna need more bread!");
    }
}


function checkIfSandwichComplete() {
    if (sandwichStatus.spreadJelly && sandwichStatus.spreadPb) {
        sandwichStatus.complete = true;
        alert("Congratulations! You have completed making a delicious PB & J sandwich");
    }
}

function spreadOnBread(whichSlice, whatWeSpreading) {
    document.getElementById(whichSlice).textContent = whatWeSpreading;
}
