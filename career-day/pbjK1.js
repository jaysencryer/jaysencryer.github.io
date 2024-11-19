const CLOSED = 0;
const OPEN = 1;

const BREAD_BAG_ID = 'bread-bag';
const PB_JAR_ID = 'pb-jar';
const JELLY_JAR_ID = 'jelly-jar';
const BREAD_SLICE_1_ID = 'bread-slice1';
const BREAD_SLICE_2_ID = 'bread-slice2';
const SANDWICH_ID = 'pb-j-sandwich';

const PB_BREAD = "Bread with Peanut Butter on it.";
const JELLY_BREAD = "Bread with Jelly on it.";


const sandwichStatus = {
    firstSlice: {
        ready: false,
        spread: false,
    },
    secondSlice: {
        ready: false,
        spread: false,
    },
    spreadPb: false,
    spreadJelly: false,
    complete: false
}


let breadBagStatus = CLOSED;
let pbJarStatus = CLOSED;
let jellyJarStatus = CLOSED;


function takeASliceOfBread() {
    let breadBag = document.getElementById(BREAD_BAG_ID);
    let breadBagImage = breadBag.src;

    if (breadBagStatus === CLOSED) {;
        alert("Unable to get bread!");
        return;
    }

    if (sandwichStatus?.secondSlice?.ready) {
        alert("I think two slices is enough");
        return;
    }

    if (sandwichStatus?.firstSlice?.ready) {
        sandwichStatus.secondSlice.ready = true;
        document.getElementById(BREAD_SLICE_2_ID).removeAttribute("hidden");
        breadBag.src = breadBagImage.replace("slice1", "slice2");
        return;
    }

    sandwichStatus.firstSlice.ready = true;
    document.getElementById(BREAD_SLICE_1_ID).removeAttribute("hidden");
    breadBag.src = breadBagImage.replace("open", "slice1");
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
    let src = thingToOpen.src.replace("closed", "open");
    let altText = thingToOpen.getAttribute("alt").replace("Closed", "Open");
    thingToOpen.setAttribute("alt", altText);
    thingToOpen.src = src;
}

function spreadPB() {
    console.log(sandwichStatus);
    if (pbJarStatus === CLOSED) {
        alert("Unable to get to Peanut Butter!");
        return;
    }
    
    if (!sandwichStatus.firstSlice.ready) {
        alert("I guess we're spreading peanut butter over the counter?");
        return;
    }
    
    if (sandwichStatus.firstSlice.spread && (sandwichStatus.secondSlice.spread || !sandwichStatus.secondSlice.ready)) {
        alert("There's nowhere left to spread this Peanut Butter!");
        return;
    }
    
    if (sandwichStatus.firstSlice.spread && sandwichStatus.spreadPb && sandwichStatus.secondSlice.ready) {
        alert(`mmmmm, delicious PB & PB sandwich.  Not what we're looking for though \u2639`);
        return;
    }
    
    sandwichStatus.spreadPb = true;
    let pbJar = document.getElementById(PB_JAR_ID);
    let imageChange = pbJar.src.replace("open", "spread");
    pbJar.src = imageChange;

    spreadFilling(PB_JAR_ID);

    if (!sandwichStatus.firstSlice.spread) {
        spreadOnBread(BREAD_SLICE_1_ID, PB_BREAD);
        sandwichStatus.firstSlice.spread = true;
    } else if (sandwichStatus.secondSlice.ready && !sandwichStatus.secondSlice.spread) {
        spreadOnBread(BREAD_SLICE_2_ID, PB_BREAD);    
        sandwichStatus.secondSlice.spread = true;
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
    console.log(sandwichStatus);
    if (jellyJarStatus === CLOSED) {
        alert("Unable to get to Jelly!");
        return;
    }

    if (!sandwichStatus.firstSlice.ready) {
        alert("I guess we're making a counter & Jelly mess?");
        return;
    }
    
    if (sandwichStatus.firstSlice.spread && (!sandwichStatus.secondSlice.ready ||sandwichStatus.secondSlice.spread)) {
        alert("There's nowhere left to spread this Jelly!");
        return;
    }

    if (sandwichStatus.firstSlice.spread && sandwichStatus.spreadJelly && sandwichStatus.secondSlice.ready) {
        alert("mmmm, delicious Jelly & Jelly sandwich. Try again!");
        return;
    }

    sandwichStatus.spreadJelly = true;
    spreadFilling(JELLY_JAR_ID);

    if (!sandwichStatus.firstSlice.spread) {
        spreadOnBread(BREAD_SLICE_1_ID, JELLY_BREAD);
        sandwichStatus.firstSlice.spread = true;
    } else if (sandwichStatus.secondSlice.ready && !sandwichStatus.secondSlice.spread) {
        spreadOnBread(BREAD_SLICE_2_ID, JELLY_BREAD);    
        sandwichStatus.secondSlice.spread = true;
    } 
}


function putSlicesTogether() {
    if (!sandwichStatus.firstSlice.ready) {
        alert("What slices?");
        return;
    }

    if (!sandwichStatus.secondSlice.ready && !sandwichStatus.firstSlice.spread) {
        alert("That's just one dry piece of bread!");
        return;
    }

    if (!sandwichStatus.firstSlice.spread || !sandwichStatus.secondSlice.spread) {
        let missing = sandwichStatus.spreadPb ? "Jelly" : "Peanut Butter";
        alert(`You're missing a key ingredient!  Where's the ${missing}`);
        return;
    }

    if (sandwichStatus.spreadJelly && sandwichStatus.spreadPb) {
        sandwichStatus.complete = true;
        document.getElementById(SANDWICH_ID).removeAttribute("hidden");
        document.getElementById(BREAD_SLICE_1_ID).setAttribute("hidden", true);
        document.getElementById(BREAD_SLICE_2_ID).setAttribute("hidden", true);
    }
}

function spreadOnBread(whichSlice, whatWeSpreading) {
    let breadSlice = document.getElementById(whichSlice);
    breadSlice.textContent = whatWeSpreading;
    let spread;
    if (whatWeSpreading === JELLY_BREAD) {
        spread = "jelly";
    } else {
        spread = "pb";
    }

    let breadImage = breadSlice.src.replace("no",spread);
    breadSlice.src = breadImage;
    
}

function spreadFilling(jarId) {
    let jar = document.getElementById(jarId);
    let imageChange = jar.src.replace("open", "spread");
    console.log(imageChange);
    jar.src = imageChange;
}

