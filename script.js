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
    let ni = false;
    if(leaderboard.length == 0) {
        ni = true;
    }
    console.log(leaderboard_item);
    for(let i=0; i<leaderboard.length;i++) {
        if(leaderboard[i].cps < leaderboard_item.cps && leaderboard[i].name === leaderboard_item.name) {
            leaderboard[i].cps = leaderboard_item.cps
            localStorage.setItem("cpslb", JSON.stringify(leaderboard));
            console.log("zmiana");
            ni = false;
            break;
        }
        else if(leaderboard[i].name == leaderboard_item.name) {
            console.log("juz jest");
            ni = false;
            break;
        }
        else {
            console.log("ni ma");
            ni = true;
        }
    }
    if(ni) {
    leaderboard.push(leaderboard_item);
    console.log("push!");
    localStorage.setItem("cpslb", JSON.stringify(leaderboard));
    }
    leaderboard.sort((u1, u2) => (u1.cps < u2.cps) ? 1 : (u1.cps > u2.cps) ? -1 : 0);
}


function refreshLeaderboard() {
    real_leaderboard.innerHTML = "";
    leaderboard.forEach(e => {
        let real_leaderboard_item = document.createElement("div");
        real_leaderboard_item.innerHTML = e.name + ": " + e.cps;
        real_leaderboard_item.style.marginBottom = "3%";
        real_leaderboard_item.style.textShadow = "none"
        real_leaderboard.appendChild(real_leaderboard_item);
    });
    try {
        real_leaderboard.firstElementChild.style.color = "gold";
        real_leaderboard.firstElementChild.style.fontWeight = "bold";
        real_leaderboard.firstElementChild.style.textShadow = "black 0px 0px 3px";
        real_leaderboard.firstElementChild.innerHTML = "🏆  " + real_leaderboard.firstElementChild.innerHTML;
    } catch (error) {
        console.warn(error);
    }
}
refreshLeaderboard();
function CPS(time) {
    if(started===true) {
        clicks += 1;
    }
    else {
        started = true;
        setTimeout(() => {
            started = false;
            let name = prompt(`CPS: ${clicks/time}`, "your name here");
            if(name!=null && name.length >= 3 && name.length <= 20) {
                leaderboard_item = {name: name, cps: clicks/time};
                setLeaderboard();
                refreshLeaderboard();

            }
            button.innerHTML = "CPS TEST";
            localStorage.setItem("cpslb", JSON.stringify(leaderboard));
            
            clicks = 1;
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
