if ( document.getElementsByClassName("collapse-button") ){
    let collapse = document.getElementsByClassName("collapse-button");
    
    for ( let x = 0; x < collapse.length; x++ ){
        collapse[x].addEventListener("click", function() {
            if ( document.getElementsByClassName("expand-div")[x] ){
                document.getElementsByClassName("expand-div")[x].classList.toggle("expanded");
                if ( collapse[x].innerHTML == "+" ){
                    collapse[x].innerHTML = "-";
                } else if ( collapse[x].innerHTML == "-" ){
                    collapse[x].innerHTML = "+";
                }
            }
        });
    }
}