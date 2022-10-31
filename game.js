const score=document.querySelector(".score");
const startScreen=document.querySelector(".startScreen");
const gameArea=document.querySelector(".gameArea");
player={};
const gameplay=()=>{

    console.log("clicked");
    if (player.start) {
        
        window.requestAnimationFrame(gameplay)
    }
}
const start=()=>{
    player.start=true;
    gameArea.classList.remove("hide")
    startScreen.classList.add("hide")
    window.requestAnimationFrame(gameplay)

    let car=document.createElement('div')
    car.setAttribute('class','car')
    // car.innerText=""
    gameArea.appendChild(car)
}
startScreen.addEventListener("click",start);

keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
}



keyDown=(e)=>{
    e.preventDefault();
    keys[e.key]=true;
    console.log(e.key);
    console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    console.log(e.key);
    console.log(keys);
}
document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);
