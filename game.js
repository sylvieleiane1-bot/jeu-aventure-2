const canvas=document.getElementById("game"),ctx=canvas.getContext("2d");
const menu=document.getElementById("menu"),start=document.getElementById("start");
const keys={}; let player,started=false;
function reset(){player={x:110,y:390,w:32,h:58,vx:0,vy:0,onGround:false};}
function startGame(){menu.hidden=true;canvas.hidden=false;started=true;reset();loop();}
addEventListener("keydown",e=>{keys[e.key.toLowerCase()]=true;if(e.key===" "||e.key.startsWith("Arrow"))e.preventDefault();if(e.key.toLowerCase()==="r"&&started)reset();});
addEventListener("keyup",e=>keys[e.key.toLowerCase()]=false);
start.onclick=startGame;
function update(){
 player.vx=0;
 if(keys.arrowleft||keys.a)player.vx=-4;
 if(keys.arrowright||keys.d)player.vx=4;
 if((keys[" "]||keys.w||keys.arrowup)&&player.onGround){player.vy=-11;player.onGround=false;}
 player.vy+=.55; player.x+=player.vx; player.y+=player.vy;
 if(player.y+player.h>=470){player.y=470-player.h;player.vy=0;player.onGround=true;}
 player.x=Math.max(20,Math.min(canvas.width-player.w-20,player.x));
}
function draw(){
 const g=ctx.createLinearGradient(0,0,0,540);g.addColorStop(0,"#8ed0ff");g.addColorStop(1,"#dff4ff");ctx.fillStyle=g;ctx.fillRect(0,0,960,540);
 ctx.fillStyle="#77b255";ctx.fillRect(0,410,960,130);
 ctx.fillStyle="#6b4f35";ctx.fillRect(0,470,960,70);
 // maisons du village
 for(let x=500;x<900;x+=190){ctx.fillStyle="#8b5a36";ctx.fillRect(x,320,120,90);ctx.fillStyle="#713b2a";ctx.beginPath();ctx.moveTo(x-15,320);ctx.lineTo(x+60,260);ctx.lineTo(x+135,320);ctx.closePath();ctx.fill();ctx.fillStyle="#4b2b1b";ctx.fillRect(x+48,355,28,55);}
 // personnage
 ctx.fillStyle="#7a4a2b";ctx.fillRect(player.x+5,player.y,22,22);
 ctx.fillStyle="#111";ctx.fillRect(player.x+4,player.y+20,24,23);
 ctx.fillStyle="#5b3a25";ctx.fillRect(player.x+6,player.y+43,9,15);ctx.fillRect(player.x+18,player.y+43,9,15);
 ctx.fillStyle="#111";ctx.font="20px Arial";ctx.fillText("Village",760,300);
}
function loop(){if(!started)return;update();draw();requestAnimationFrame(loop)}
