# Paint
## Các Buớc Làm
> # Bước 1 tạo file `index.html` là khung xương cho web
> Và thêm các dòng code sau
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="paint-logo.avif">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="./main.css">
    <title>Paint</title>
</head>
<body>
    <div class="wrapper">
        <input type="color" id="color">
        <button class="rectangle">
            <i class='bx bxs-rectangle'></i>
        </button>
        <button class="circle">
            <i class="fa-solid fa-circle"></i>   
         </button>
        <button class="paintbrush active">
            <i class="fa-solid fa-paintbrush"></i>
        </button>
        <button class="remove">
            <i class="fa-solid fa-eraser"></i>
        </button>
        <button class="down">
            <i class="fa-solid fa-minus"></i>
        </button>
        <div class="size">3</div>
        <button class="up">
            <i class="fa-solid fa-plus"></i>
        </button>
        <a class="save" download="anh.png">
            <i class="fa-solid fa-floppy-disk"></i>
        </a>
        <button class="clear">
            <i class="fa-sharp fa-solid fa-broom"></i> 
        </button>
        <input type="file" id="file" accept="image/gif, image/jpeg ,image/png">
        <label  class="renderfile" for="file">
            <i class="fa-solid fa-image"></i>
            image
        </label>
        <br>
        <img class="image"  alt=""> 
    </div>
    <canvas id="canvas" height="1200" width="1400" ></canvas>
    <script src="./App.js"></script>
</body>
</html>
```
dễ dàng thấy một thẻ div có class là wrapper bao bọc bên ngoài các button dùng để xây dựng nên thanh menu,
tiếp theo là thẻ canvas được sử dụng để vẽ đồ họa trên trang web ,kế tiếp là thẻ script để nhúng file App.js
vào đây là file mà các bạn sẽ tạo ở phần sau
> # Bước 2 tạo file `main.css` là file trang trí cho web thêm đẹp
> Và thêm các dòng code sau
```css
*{
    margin: 0;
    padding: 0;  
}
body{   
    display: flex;
}
.wrapper{
    position: fixed;
    padding: 4px;
    height: 1200px;
    width: 50px;
    display: flex;
    flex-direction: column;
    background: rgb(131,58,180);
    background: linear-gradient(159deg, rgba(131,58,180,1) 0%, rgba(253,29,29,0.8982143882943803) 50%, rgba(252,176,69,1) 100%);
    border-radius: 5px;  
    border-right:3px solid #2f2f2f ;
}
#canvas{
    border: 1px solid #333;
    background-color: #f0f3f9;
    margin-left: 60px;
}
.size{
    border-radius: 4px;
    font-size: 30px;
    text-align: center;
    background-color: #ffffff;
    color: #333;
    height: 50px;
}
button{
    outline: 4px soid #E43654;
    border: 0;
   font-size: 22px;
   width: 50px;
    height: 40px;
    margin-top:10px ;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 10px;
}
button:hover{
    opacity: .7;
}
.active{
    background-color: #E43654;
    box-shadow:0 0 15px #E43654 ;
    transform: scale(1.1);
}
input{
    height: 40px;
}
.save{
    border-radius: 4px;
    height: 40px;font-size: 30px;
    text-align: center;background-color: #333;
    color: azure;
}
input[type="file"]{
display: none;
}
label{
    font-size: large;
    height: 40px;
    text-align: center;
    background-color: #ffffff;
    color: #333;  
}
@media screen and (max-width:46.1875em){
   
}
```
>ngay ở các dòng code dầu
> ```css
> *{
>    margin: 0;
>    padding: 0;  
>}
>body{   
>    display: flex;
>}```
dùng để reset lại các cấu hình mặc định mà trình duyệt gán cho thẻ html và display flex
làm cho bố cục theo chiều ngang (các bạn có thể tìm hiểu ***flexbox***)
>các dòng code tiếp theo thì định dạng kich thước và màu sắc của thẻ div và botton
>ở đây ta thấy 
>```css
>input[type="file"]{
>display: none;
>}
>label{
>    font-size: large;
>    height: 40px;
>   text-align: center;
>    background-color: #ffffff;
>    color: #333;  
>}
thẻ input và label thường đi chung với nhau nên để làm cho nó đẹp hơn thì tôi đã 
ẩn thẻ input có type là file,để khi nhấn vào thẻ label thì nó sẽ vào input luôn
> # Bước 3 tạo file `App.js` là file xử lý logic web
> Và thêm các dòng code sau
```js
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

document.querySelectorAll("button").forEach(e => {
    e.addEventListener('click',()=>{
        document.querySelector('.active').classList.remove('active')
        e.classList.add("active")
    })
});
```
> Bước đầu ta setup để chuẩn bị code 
 ```js
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

const ctx =canvas.getContext('2d')
```
>Tiếp theo ta tạo hai đói tượng là điểm đầu và điểm tiếp theo để ghi nhớ tọa độ để vẽ
```js
 let pointstart={
    x:0,
    y:0
}
 let pointlast={
>   x:0,
    y:0
}
```
>Còn đây là các hàm để vẽ hinh vuông ,tròn ,và vẽ theo chuột
```js
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
```
>Và để bắt được tọa độ chuột di chuyển trên thẻ canvas ta lắng nghe sự kiện bằng
>method addEventListener với mousedown(nhấn chuột xuống),mousemove(di chuyển chuột),
>mouseup(thả chuột ra)
```js
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
```
như theo logic ở doadnj code này đàu tiên tôi sẽ bắt sự kiện khi người
dùng nhấn chuột xuống để lấy tọa độ bắt đầu để chuẩn bị vẽ

