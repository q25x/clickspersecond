// cps code
const button = document.querySelector(".cps");
let started = false;
let clicks = 1;
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// leaderboard code
let real_leaderboard = document.querySelector(".leaderboard");
let leaderboard = [];
try {
    leaderboard = JSON.parse(localStorage.cpslb);
} catch (error) {
    console.warn(error);
}

let real_leaderboard_item = document.createElement("div");
let leaderboard_item = {}




function setLeaderboard() {
    debugger;
    if(leaderboard.length == 0) {
        leaderboard.push(leaderboard_item);
        return;
    }
    let ni = false;
    leaderboard.forEach(e => {
        if(e.cps < leaderboard_item.cps && e.name == leaderboard_item.name) {
            e.cps = leaderboard_item.cps
            localStorage.setItem("cpslb", JSON.stringify(leaderboard));
            return;
        }
        else if(e.name == leaderboard_item.name) {
            return;
        }
        else {
            ni = true;
        }
    })
    if(ni==true) {
    leaderboard.push(leaderboard_item);
    localStorage.setItem("cpslb", JSON.stringify(leaderboard));
    }
}


function refreshLeaderboard() {
    real_leaderboard.innerHTML = "";
    leaderboard.forEach(e => {
        let real_leaderboard_item = document.createElement("div");
        real_leaderboard_item.innerHTML = e.name + ": " + e.cps;
        real_leaderboard.appendChild(real_leaderboard_item);
    });

}
refreshLeaderboard();















function CPS(time) {
    if(started===true) {
        clicks += 1;
    }
    else {
        started = true;
        setTimeout(() => {
            let name = prompt(`CPS: ${clicks/time}`, "your name here");
            if(name!==null || name.length >= 3 || name.length <= 16) {
                leaderboard_item = {name: name, cps: clicks/time}
                setLeaderboard();
                refreshLeaderboard();

            }
            button.innerHTML = "CPS TEST";
            localStorage.setItem("cpslb", JSON.stringify(leaderboard));
            
            clicks = 1;
            started = false;
            button.style.backgroundColor = "rgba(0,0,0,0.7)"
        }, time*1000);
    }
    let clr = map_range(clicks,0,60,0,255)
    button.innerHTML = clicks;
    button.style.backgroundColor = "rgba("+clr+","+clr+","+clr+",0.7)"
}






























// moving background code
let width, height
window.onload = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    // console.log(width, height);
}  
window.onresize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    // console.log(width, height);
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
       
        // console.log("bg: ", bgX, bgY);
        // console.log("dest: ", destination.x, destination.y);
        
        clearInterval(interval);
        interval = setInterval(() => {
            bgX = (bgX + (destination.x - bgX) / 50);
            bgY = (bgY + (destination.y - bgY) / 50);
        
            document.querySelector("body").style.backgroundPositionX = bgX + "px";
            document.querySelector("body").style.backgroundPositionY = bgY + "px";
        
        }, 1);

    }
})()
