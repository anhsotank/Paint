const canvas= document.getElementById("canvas");
const color=document.querySelector("#color")
const remove=document.querySelector(".remove")
const up=document.querySelector(".up")
const down=document.querySelector(".down")
const save=document.querySelector(".save")
const size=document.querySelector(".size")
const clear=document.querySelector(".clear")
const file=document.querySelector("#file")
const paintbrush=document.querySelector(".paintbrush")
const rectangle=document.querySelector(".rectangle")
const circle=document.querySelector(".circle")
let isdrawing=false
let colorremove=false
let usecolor="#333"
let lastcolor="#333"
let sizedraw=3
let snapshot,toolpaint="paintbrush"

const ctx =canvas.getContext('2d');

let pointstart={
    x:0,
    y:0
}
let pointlast={
    x:0,
    y:0
}
const check_remove_btn= ()=>{
    if(colorremove){
        usecolor="#f0f3f9"
    }else{
        usecolor=lastcolor
    }
}
const Draw = ()=>{
    check_remove_btn()
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

const DrawRect = ()=>{
    check_remove_btn()
    ctx.beginPath();
    ctx.strokeStyle=usecolor;
    ctx.lineWidth=sizedraw*2;
    ctx.strokeRect(pointstart.x,pointstart.y,pointlast.x-pointstart.x,pointlast.y-pointstart.y)
    
}
const DrawCircle = ()=>{
    check_remove_btn()
    ctx.beginPath();
    ctx.lineWidth=sizedraw*2;
    ctx.strokeStyle=usecolor;
    let bk=Math.sqrt(Math.pow((pointstart.x-pointlast.x),2)+Math.pow((pointstart.y-pointlast.y),2))
    ctx.arc(pointstart.x,pointstart.y,bk,0,2*Math.PI);

    ctx.stroke();
}

canvas.addEventListener("mousedown",(even)=>{
     pointstart={
        x:even.offsetX,
        y:even.offsetY
    }
    snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
    isdrawing=true
})
canvas.addEventListener("mousemove",(even)=>{
    if(isdrawing){
        
        pointlast={
            x: even.offsetX,
            y: even.offsetY
        }
        if(toolpaint == "rectangle"){
            ctx.putImageData(snapshot,0,0) 
            DrawRect() 
        }else if(toolpaint =="paintbrush"){
            Draw()
        }else if(toolpaint="circle"){
            ctx.putImageData(snapshot,0,0) 
            DrawCircle()
        }
        
        
    }
})
canvas.addEventListener("mouseup",(even)=>{   
    isdrawing=false
})

//mobile
canvas.addEventListener("touchstart",(even)=>{
    pointstart={
       x:even.touches[0].clientX,
       y:even.touches[0].clientY
   }
   snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
   isdrawing=true
})
canvas.addEventListener("touchmove",(even)=>{
    if(isdrawing){
        
        pointlast={
            x:even.touches[0].clientX,
            y:even.touches[0].clientY
        }
        if(toolpaint == "rectangle"){
            ctx.putImageData(snapshot,0,0) 
            DrawRect() 
        }else if(toolpaint =="paintbrush"){
            Draw()
        }else if(toolpaint="circle"){
            ctx.putImageData(snapshot,0,0) 
            DrawCircle()
        }
        
        
    }
})
canvas.addEventListener("touchend",(even)=>{   
   isdrawing=false
})
///Menu
color.addEventListener("change",(even)=>{
    usecolor=even.target.value
    lastcolor=even.target.value
})
remove.addEventListener("click",e=>{
   colorremove=true
   toolpaint="paintbrush"
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
   
    const img=e.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{
        fileurl=reader.result;
    //    image=` <img src="${fileurl}" >`
       document.querySelector(".image").setAttribute('src',`${fileurl}`)
      
    }
    reader.readAsDataURL(img)
    document.querySelector(".image").onload=()=>{
        ctx.drawImage( document.querySelector(".image"),pointstart.x,pointstart.y,pointlast.x-pointstart.x,pointlast.y-pointstart.y)
    }
    
})
rectangle.addEventListener('click', ()=>{
    colorremove=false
    toolpaint="rectangle"
})
paintbrush.addEventListener('click',()=>{
    colorremove=false
    toolpaint="paintbrush"
})
circle.addEventListener('click',()=>{
    colorremove=false
    toolpaint="circle"
})
// reponsive
// if(document.body.clientWidth < 800){
//     canvas.width=350
  
// }
//active sidebar
document.querySelectorAll("button").forEach(e => {
    e.addEventListener('click',()=>{
        document.querySelector('.active').classList.remove('active')
        e.classList.add("active")
    })
});

