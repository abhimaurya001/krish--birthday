const pages=[...document.querySelectorAll(".page")];
const dots=[...document.querySelectorAll(".dot")];
let current=0;

function showPage(n){
  pages[current].classList.remove("active");
  current=n;
  pages[current].classList.add("active");
  dots.forEach((d,i)=>d.classList.toggle("active",i===current));
}

document.getElementById("openBtn").addEventListener("click",()=>{
  const gift=document.querySelector(".gift");
  gift.style.animation="none";
  gift.style.transition="1s cubic-bezier(.2,.9,.2,1)";
  gift.style.transform="scale(1.35) rotateY(180deg) translateY(-10px)";
  setTimeout(()=>showPage(1),650);
});

document.getElementById("nextBtn").addEventListener("click",()=>{
  showPage(2);
  typeMessage();
});

document.getElementById("againBtn").addEventListener("click",()=>{
  document.getElementById("typedMessage").textContent="";
  const gift=document.querySelector(".gift");
  gift.style.animation="float 3s ease-in-out infinite";
  gift.style.transform="";
  showPage(0);
});

const message=`Life mein bahut log milte hain, lekin kuch dost apni ek alag jagah bana lete hain — aur tu unhi logon mein se hai.

I hope tera aane wala saal naye experiences, success, happiness aur bahut saari unforgettable memories se bhara ho.

Apne goals ke peeche laga reh, khud par believe kar, aur haan... zyada serious bhi mat hona 😂

Aaj ke din bas enjoy kar, smile kar, aur ek baat yaad rakh — tere jaise dost life ko thoda aur awesome bana dete hain.

Happy Birthday, brother! 🎂🔥`;

let typingTimer;
function typeMessage(){
  const el=document.getElementById("typedMessage");
  el.textContent="";
  let i=0;
  clearInterval(typingTimer);
  typingTimer=setInterval(()=>{
    el.textContent+=message[i++]||"";
    if(i>=message.length) clearInterval(typingTimer);
  },18);
}

// Mouse-follow glow
const glow=document.querySelector(".cursor-glow");
window.addEventListener("mousemove",e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
});

// Subtle 3D tilt
window.addEventListener("mousemove",e=>{
  const x=(e.clientX/innerWidth-.5)*2;
  const y=(e.clientY/innerHeight-.5)*2;
  document.querySelectorAll(".hero").forEach(el=>{
    el.style.transform=`perspective(900px) rotateX(${y*-2}deg) rotateY(${x*2}deg)`;
  });
});

// Starfield
const canvas=document.getElementById("space");
const ctx=canvas.getContext("2d");
let stars=[];
function resize(){
  canvas.width=innerWidth*devicePixelRatio;
  canvas.height=innerHeight*devicePixelRatio;
  ctx.scale(devicePixelRatio,devicePixelRatio);
  stars=Array.from({length:Math.min(180,Math.floor(innerWidth/6))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:Math.random()*1.4+.2,s:Math.random()*.25+.05
  }));
}
function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  ctx.fillStyle="rgba(255,255,255,.8)";
  stars.forEach(s=>{
    s.y+=s.s;if(s.y>innerHeight)s.y=0;
    ctx.globalAlpha=.25+Math.sin(Date.now()/700+s.x)*.2;
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(animate);
}
addEventListener("resize",resize); resize(); animate();
