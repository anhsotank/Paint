const canvas= document.getElementById("canvas");
const color=document.querySelector("#color")
const remove=document.querySelector(".remove")
const up=document.querySelector(".up")
const down=document.querySelector(".down")
const save=document.querySelector(".save")
const size=document.querySelector(".size")
const clear=document.querySelector(".clear")
let isdrawing=false
let usecolor="#333"
let sizedraw=3

const ctx =canvas.getContext("2d");
// ctx.beginPath();
//     ctx.moveTo(10,10);
//     ctx.lineTo(100,100);
   
//     ctx.stroke();
let pointstart={
    x:0,
    y:0
}
let pointlast={
    x:0,
    y:0
}
Draw = ()=>{
    ctx.beginPath();
    ctx.strokeStyle=usecolor
    ctx.moveTo(pointstart.x,pointstart.y);
    ctx.lineTo(pointlast.x,pointlast.y);
    ctx.lineWidth=sizedraw*2;
    ctx.stroke();
    pointstart.x=pointlast.x
    pointstart.y=pointlast.y
}

canvas.addEventListener("mousedown",(even)=>{
     pointstart={
        x:even.offsetX,
        y:even.offsetY
    }
    
    isdrawing=true
})
canvas.addEventListener("mousemove",(even)=>{
    if(isdrawing){
        pointlast={
            x: even.offsetX,
            y: even.offsetY
        }

        ctx.beginPath();
        ctx.arc(pointstart.x,pointstart.y,sizedraw,0,2*Math.PI);
        ctx.fillStyle=usecolor
        ctx.fill()

        ctx.beginPath();
        ctx.moveTo(pointstart.x,pointstart.y);
        ctx.lineTo(pointlast.x,pointlast.y);
        ctx.strokeStyle=usecolor;
        ctx.lineWidth=sizedraw*2;
        ctx.stroke();
        pointstart.x=pointlast.x
        pointstart.y=pointlast.y
        console.log(even.offsetX,even.offsetY)

    }
})
canvas.addEventListener("mouseup",(even)=>{
    
    isdrawing=false
})

///Menu
color.addEventListener("change",(even)=>{
    usecolor=even.target.value
})
remove.addEventListener("click",e=>{
    usecolor="#fff"
})
up.addEventListener('click',e=>{  
    if(sizedraw<5){
        sizedraw++;
        size.innerText=sizedraw;
    }
})
down.addEventListener('click',e=>{
    if(sizedraw>1){
        sizedraw--;
        size.innerText=sizedraw;
    }
})

clear.addEventListener('click',e=>{
    ctx.clearRect(0,0,canvas.getClientRects()[0].width,canvas.getClientRects()[0].height)
})
save.addEventListener('click',e=>{
    save.setAttribute('href',canvas.toDataURL("image/png"))
})
