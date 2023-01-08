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

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

window.onload = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    return width, height;
}  
window.onresize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    return width, height;
}

}
(function(){
    window.onmousemove = (e) => {
    console.log(e.clientX, e.clientY);
    document.querySelector("body").style.backgroundPositionX = map_range(e.clientX,0,);
    document.querySelector("body").style.backgroundPositionY = e.clientY/100
    }
})()
