const score=document.querySelector(".score");
const startScreen=document.querySelector(".startScreen");
const gameArea=document.querySelector(".gameArea");
let carsimg=['car2','car3','car4','car5','car6','car7']
player={speed:5, score:0};
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
        if (keys.ArrowDown && player.y<road.bottom-75) {
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
        score.innerText="score :"+player.score;
        player.score++;
    }
}
const start=()=>{ 
    player.start=true;
    gameArea.innerHTML="";
    startScreen.classList.add("hide")
    player.score=0;
    window.requestAnimationFrame(gameplay)
    
    
    for(x=0; x<8;x++){
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
    

    
    for(x=0; x<4;x++){
        let enemyCar=document.createElement("div")
        enemyCar.setAttribute("class","enemy")
        enemyCar.y=((x+1)*350)*-1;
        enemyCar.style.top=enemyCar.y+"px"
        ci="'"+carsimg[Math.floor(Math.random()*6)]+".png'";
        enemyCar.style.backgroundImage=`url(${ci})`;       
        enemyCar.style.left=Math.floor(Math.random()*350)+"px"
        
        gameArea.appendChild(enemyCar)
    }
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



isCollide=(a,b)=>{
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();

    return !((aRect.bottom<bRect.top) || (aRect.top>bRect.bottom) || (aRect.right<bRect.left) || (aRect.left>bRect.right))
}
endGame=()=>{
    player.start=false;
    startScreen.classList.remove("hide")
    // gameArea.classList.add("hide")
    startScreen.innerHTML="GAME OVER!! <br>your score is:"+player.score+ "<br> tap to restart!" ;
}
moveEnemy=(car)=>{
    let enemy=document.querySelectorAll(".enemy")
    enemy.forEach((item)=>{
        if(isCollide(car,item)){
            console.log("boom");
            endGame();
            // startScreen.appendChild(message)
        }
        if (item.y>=700) {
            item.y=-300
            item.style.left=Math.floor(Math.random()*350)+"px"
        }
        item.y+=player.speed;
        item.style.top=item.y+"px"
    }) 
}
