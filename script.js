const button = document.querySelector(".cps");
let started = false;
let clicks = 1;


function CPS(time) {
    if(started===true) {
        clicks += 1;
    }
    else {
        started = true;
        setTimeout(() => {
            started = false;

            
        }, time);
    }
button.innerHTML = clicks
}