const canvas = document.querySelector("#pong");
const ctx = canvas.getContext("2d");

//game variable
const PLAYER_HEIGHT = 100;
const PLAYER_WIDTH = 20;
const BALL_START_SPEED = 1;
const COM_LEV = 0.5;
//game object
const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width : 2,
    height : 10,
    color : "WHITE",
};


const player1 = {
        x:0,
        y: canvas.height/2 - PLAYER_HEIGHT / 2,
        width : PLAYER_WIDTH,
        height : PLAYER_HEIGHT,
        color : "WHITE",
        score : 10,
        // right:0,
        // top:0,
        // bottom:0,
        // left:0,
};

const player2 ={
    x:canvas.width - PLAYER_WIDTH,
    y: canvas.height/2 - PLAYER_HEIGHT / 2 + 80,
    width : PLAYER_WIDTH,
    height : PLAYER_HEIGHT,
    color : "WHITE",
    score : 0,
    // right:0,
    // top:0,
    // bottom:0,
    // left:0,
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    raduis: 10,
    speed : BALL_START_SPEED,
    velocityX : 5,
    velocityY : 5,
    color : "white",
    // right:0,
    // top:0,
    // bottom:0,
    // left:0,

};
function drawet(){
    for(let i= 0; i <= canvas.height;i+= 15){
        drawRect(net.x,net.y + i,net.width,net.height,net.color);
    }
}
//Draw Shapes 
function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

drawRect(0,0,canvas.width,canvas.height,"BLACK");

function drawCircle(x,y,r,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI * 2,false);
    ctx.closePath();
    ctx.fill();
}



// Text Functions
function drawText(text,x,y,color){
    ctx.fillStyle = color;
    ctx.font = "30px fantasy";
    ctx.fillText(text,x,y);
}


//render 

function render(){
    drawRect(0,0,canvas.width,canvas.height,"BLACK");
    drawet()
    drawText(player1.score,canvas.width/5,50,"WHITE");
    drawText(player2.score,canvas.width/1.3,50,"WHITE");
    drawRect(player1.x,player1.y,player1.width,player1.height,player1.color);
    drawRect(player2.x,player2.y,player2.width,player2.height,player2.color);
    drawCircle(ball.x,ball.y,ball.raduis,ball.color);

}

//check collision

function collision(b,p){
    b.top = b.y - b.raduis;
    b.bottom =  b.y + b.raduis;
    b.left = b.x - b.raduis;
    b.right =  b.x + b.raduis;

    p.top = p.y
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    if(b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom)
        return true;
    return false;
}

canvas.addEventListener("mousemove", (e)=>{
    let rect = canvas.getBoundingClientRect();
    player1.y  = e.clientY - rect.top - player1.height / 2;
});
function lerp(a,b,t){
    return a + (b - a) * t;
}
//update 
function update(){
    ball.x += ball.velocityX * ball.speed;
    ball.y += ball.velocityY * ball.speed;
    if(ball.y + ball.raduis > canvas.height || ball.y + ball.raduis <= 0)
        ball.velocityY = -ball.velocityY;
    let selctedPlayer = ball.x < canvas.width / 2 ? player1 : player2;
    if(collision(ball,selctedPlayer)){
        ball.velocityX = -ball.velocityX;
    }

    let targetPos = ball.y - player2.height / 2;
    player2.y = lerp(player2.y,targetPos,COM_LEV);

    // if(ball.x - ball.raduis < 0)
    // {

    // }
    // else (bll.x - ball)
}
//game
function game(){
    update();
    render();
}

const FPS = 60;
setInterval(game, 1000/FPS);