const score=document.querySelector(".score");
const startScreen=document.querySelector(".startScreen");
const gameArea=document.querySelector(".gameArea");
player={speed:5};
const gameplay=()=>{

    // console.log("clicked");
    let car=document.querySelector(".car");
    const road=gameArea.getBoundingClientRect();
    if (player.start) {
        moveLines();
        moveEnemy(car);
        if (keys.ArrowUp && player.y>60) {
            player.y-=player.speed;
            
        }
        if (keys.ArrowDown && player.y<road.bottom-40) {
            player.y+=player.speed;
            
        }
        if (keys.ArrowLeft && player.x>0) {
            player.x-=player.speed;
            
        }
        if (keys.ArrowRight && player.x<(road.width-40)) {
            player.x+=player.speed;
            
        }
        car.style.left=player.x+"px"
        car.style.top=player.y+"px"
        window.requestAnimationFrame(gameplay)
    }
}
const start=()=>{ 
    player.start=true;
    gameArea.classList.remove("hide")
    startScreen.classList.add("hide")
    window.requestAnimationFrame(gameplay)


    for(x=0; x<5;x++){
        let roadLine=document.createElement("div")
        roadLine.setAttribute("class","lines")
        roadLine.y=(x*150);
        roadLine.style.top=roadLine.y+"px"
        gameArea.appendChild(roadLine)
    }
    
    let car=document.createElement('div')
    car.setAttribute('class','car')
    // car.innerText=""
    gameArea.appendChild(car)
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    
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
    // console.log(e.key);
    // console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    // console.log(e.key);
    // console.log(keys);
}
document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);


moveLines=()=>{
    let lines=document.querySelectorAll(".lines")
    lines.forEach((item)=>{
        if (item.y>=700) {
            item.y-=750
        }
        item.y+=player.speed;
        item.style.top=item.y+"px"
    }) 
}


for(x=0; x<3;x++){
    let enemyCar=document.createElement("div")
    enemyCar.setAttribute("class","enemy")
    enemyCar.y=((x+1)*350)*-1;
    enemyCar.style.top=enemyCar.y+"px"
    enemyCar.style.background= 'green'
    enemyCar.style.left=Math.floor(Math.random()*350)+"px"
    
    gameArea.appendChild(enemyCar)
}
isCollide=(a,b)=>{
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();

    return !((aRect.bottom<bRect.top) || (aRect.top>bRect.bottom) || (aRect.right<bRect.left) || (aRect.left>bRect.right))
}
moveEnemy=(car)=>{
    let enemy=document.querySelectorAll(".enemy")
    enemy.forEach((item)=>{
        if(isCollide(car,item)){
            console.log("boom");
        }
        if (item.y>=700) {
            item.y=-300
            item.style.left=Math.floor(Math.random()*350)+"px"
        }
        item.y+=player.speed;
        item.style.top=item.y+"px"
    }) 
}
