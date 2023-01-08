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
            alert("CPS: " + clicks/time)
            button.innerHTML = "CPS TEST"
            clicks = 1;
        }, time*1000);
    }
button.innerHTML = clicks
}