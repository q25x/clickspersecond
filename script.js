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
            button.innerHTML = "CPS TEST";
            clicks = 1;
        }, time*1000);
    }
    button.innerHTML = clicks;
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
let width, height
window.onload = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    console.log(width, height);
}  
window.onresize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    console.log(width, height);
}

(function(){
    window.onmousemove = (e) => {
        //console.log(e.clientX, e.clientY);
        // bgX = map_range(e.clientX,0,width,0,-300) + "px";
        // bgY = map_range(e.clientY,0,height,0,-100) + "px";
        let bgX = parseInt(document.querySelector("body").style.backgroundPositionX.replace(/\D/g, ""));
        let bgY = parseInt(document.querySelector("body").style.backgroundPositionY.replace(/\D/g, ""));
        let destination = {
            x: map_range(e.clientX,0,width,0,-300),
            y: map_range(e.clientY,0,height,0,-300)
        };
        console.log(bgX, bgY);
        
        switch(bgX,bgY) {
            case bgX < destination.x:
                bgX += (destination.x-bgX)/2
            case bgX > destination.x:
                bgX -= (bgX-destination.x)/2
            case bgY < destination.y:
                bgY += (destination.y-bgY)/2
            case bgY > destination.y:
                bgY -= (bgY-destination.y)/2
        }
        document.querySelector("body").style.backgroundPositionX = bgX + "px";
        document.querySelector("body").style.backgroundPositionY = bgY + "px";

    }
})()
