let button = document.getElementsByClassName("snowflake")[0];
let menu = document.getElementsByClassName("menu")[0];
let menu_options = menu.getElementsByClassName("menu_option");
let video = document.getElementById("youtvid");
let link = video.getAttribute('src');

button.addEventListener("click", function() {
    // Show menu
    menu.classList.toggle("show");    
})

for ( let x = 0; x < menu_options.length ; x++ ){
    menu_options[x].addEventListener("click", function() {
        let timecode = menu_options[x].getAttribute('data-timecode');
        let code = `?start=${timecode}`;
        video.setAttribute('src', `${link}${code}&autoplay=1`);
    })
}
