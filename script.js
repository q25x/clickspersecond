const button = document.querySelector(".cps");
let started = false;
let clicks = 1;
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


function CPS(time) {
    if(started===true) {
        clicks += 1;
    }
    else {
        started = true;
        setTimeout(() => {
            setTimeout(() => {
                started = false;
            }, 500);
            alert("CPS: " + clicks/time)
            button.innerHTML = "CPS TEST";
            buttom.button.style.backgroundColor = "rgba(0,0,0,0.7)"
            clicks = 1;
        }, time*1000);
    }
    let clr = map_range(clicks,0,60,0,255)
    button.innerHTML = clicks;
    button.style.backgroundColor = "rgba("+clr+","+clr+","+clr+",0.7)"
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
document.querySelector("body").style.backgroundPositionX = "0%";
document.querySelector("body").style.backgroundPositionY = "0%";
(function(){
    let interval;
    window.onmousemove = (e) => {
        let bgX = parseInt(document.querySelector("body").style.backgroundPositionX.replace("px", ""));
        let bgY = parseInt(document.querySelector("body").style.backgroundPositionY.replace("px", ""));
       
        let destination = {
            x: Math.round((map_range(e.clientX,0,width,0,-700))),
            y: Math.round((map_range(e.clientY,0,height,-100,-400)))
        };
       
        console.log("bg: ", bgX, bgY);
        console.log("dest: ", destination.x, destination.y);
        
        clearInterval(interval);
        interval = setInterval(() => {
            bgX = (bgX + (destination.x - bgX) / 50);
            bgY = (bgY + (destination.y - bgY) / 50);
        
            document.querySelector("body").style.backgroundPositionX = bgX + "px";
            document.querySelector("body").style.backgroundPositionY = bgY + "px";
        
        }, 1);

    }
})()
