const canvas= document.getElementById("canvas");
const color=document.querySelector("#color")
const remove=document.querySelector(".remove")
const up=document.querySelector(".up")
const down=document.querySelector(".down")
const save=document.querySelector(".save")
const size=document.querySelector(".size")
const clear=document.querySelector(".clear")
const file=document.querySelector("#file")
let isdrawing=false
let usecolor="#333"
let sizedraw=3

const ctx =canvas.getContext('2d');

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
        Draw()
        console.log(even.offsetX)
    }
})
canvas.addEventListener("mouseup",(even)=>{   
    isdrawing=false
})
canvas.addEventListener("touchstart",(even)=>{
    pointstart={
       x:even.touches[0].clientX,
       y:even.touches[0].clientY
   }
   isdrawing=true
})
canvas.addEventListener("touchmove",(even)=>{
   if(isdrawing){
       pointlast={
           x: even.touches[0].clientX,
           y: even.touches[0].clientY
       }
       Draw()
       
   }
})
canvas.addEventListener("touchend",(even)=>{   
   isdrawing=false
})
///Menu
color.addEventListener("change",(even)=>{
    usecolor=even.target.value
})
remove.addEventListener("click",e=>{
    usecolor="#f0f3f9"
})
up.addEventListener('click',e=>{  
    if(sizedraw<10){
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
file.addEventListener('change',(e)=>{
    console.log(e.target.files[0])
    const img=e.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{
        fileurl=reader.result;
    //    image=` <img src="${fileurl}" >`
       document.querySelector(".image").setAttribute('src',`${fileurl}`)
      
    }
    reader.readAsDataURL(img)
    document.querySelector(".image").onload=()=>{
        ctx.drawImage( document.querySelector(".image"),200,200,600,500)
    }
    
})

