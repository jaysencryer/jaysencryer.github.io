function toggleEngineer() {
    toggle("engineer");
}

function toggleHow() {
    toggle("how");
}

function toggleSoftware() {
    toggle("software");
}


function toggle(id) {
    let element = document.getElementById(id);
    let hidden = element.getAttribute("hidden");
    if (hidden) {
        element.removeAttribute("hidden");
    } else {
        element.setAttribute("hidden", "hidden");
    }
}

