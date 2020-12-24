let button = document.getElementsByClassName("snowflake")[0];
let menu = document.getElementsByClassName("menu")[0];
let menu_options = menu.getElementsByClassName("menu_option");
let video = document.getElementById("youtvid");
let link = video.getAttribute('src');
let mobile = document.getElementsByClassName("mobile_message")[0];

button.addEventListener("click", function() {
    // Show menu
   /* let media = window.matchMedia("(max-width: 700px)");
    if ( media.matches ){
        document.getElementsByClassName("mobile_message")[0].classList.toggle("show");
    }*/
    if ( mobile.classList.contains("show") ){
        mobile.classList.toggle("show");
    }
    video.classList.toggle("dim");
    menu.classList.toggle("show");    
})

for ( let x = 0; x < menu_options.length ; x++ ){
    menu_options[x].addEventListener("click", function() {
        let timecode = menu_options[x].getAttribute('data-timecode');
        let code = `&start=${timecode}`;
        video.setAttribute('src', `${link}${code}&autoplay=1`);
        menu.classList.toggle("show");
        video.classList.toggle("dim");
        let media_size = window.matchMedia("screen and (max-width: 700px)");
        let media_orient = window.matchMedia("screen and (orientation: landscape");
        if ( media_size.matches || media_orient.matches ){
            if ( !mobile.classList.contains("show") ){
                mobile.classList.toggle("show");
            }       
        }
    })
}
