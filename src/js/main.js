import { LoadHtml } from "./loadHtml";
import { LoadCss } from "./loadCss";
import { ThreeJsInitialiser } from "./threeJsMain";
import { CardComponent } from "../components/cardComponent";
const url=import.meta.env.VITE_BACKEND_URL;
let path='/chair03/chair03.gltf';
let right_panel=document.querySelector(".optionsPannel");
var intializer;
let canvas_measurement={
    height:0,
    width:0
};
window.onload=async ()=>{
    // LoadHtml()
    LoadCss()
    // Utility()    
    intializer=await main();
    canvas_measurement.height=intializer.element.clientHeight;
    canvas_measurement.width=intializer.element.clientWidth;

}

async function getFile(id){
    try{
        let data=await fetch(`${url}api/v2/get_product/${id}`);
        let response=await data.json();
        return `${url}/${response.file_name}`;
    }catch(error){
        console.log(error);
    }
}

async function getJson(id)
{
    try{
        let data=await fetch(`${url}api/v2/get_product_details/${id}`)
        let response=await data.json()
        return response.data;
    }
    catch(err)
    {
        console.log(err)
    }
}

function getAllDataFromKey(Key,model,intializer)
{
    
    let keys=Object.keys(Key)
    let data=[]
    keys.map(i=>{
        let heading=[]
        let name=[]
        let image=[]
        let objectName=[]
        Key[i].forEach(item=>{
            
            if(model[item.parts_name]!=undefined)
            {   
                heading.push(i)
                name.push(model[item.parts_name].name)
                image.push(url+model[item.parts_name].image)
                objectName.push(item.parts_name)
            }
            
        })
        data.push({heading,name,image,objectName})
    })

    
    data.push({heading:['color'],name:['name'],image:['image'],objecName:['objectName']})
    data.map((i,indx)=>{
        if(i.heading[0]==="color")
        {
            let card=new CardComponent(indx,i.heading[0],i,intializer,model,"color")
            document.querySelector('.optionsPannel').appendChild(card)        
        }
        else
        {
            let card=new CardComponent(indx,i.heading[0],i,intializer,model,"segment")
            document.querySelector('.optionsPannel').appendChild(card)        
        }
    })

    
}

async function main()
{
    const intializer=new ThreeJsInitialiser(path);
    await intializer.start()
    let model =await getJson(1);
    getAllDataFromKey(model.segment,model,intializer)
    document.querySelector('.model-name').innerHTML=model.name
    return intializer
}

// left panel
let left_panel=document.querySelector("#left-panel");
for (let val of left_panel.children){
    let arr=val.children;
    arr[0].addEventListener("mouseover",function(){
        arr[1].classList.toggle("visible")
    })
    arr[0].addEventListener("mouseout",function(){
        arr[1].classList.toggle("visible");
    })
    arr[0].addEventListener("click",function(){
        if(arr[0].classList.contains("screenshot")){
            get_screenshot();
        }else if (arr[0].classList.contains("reset-camera")){
            reset_the_camera();
        }else if (arr[0].classList.contains("fullscreen")){
            full_screen();
        }
    })    
}

function get_screenshot(){
    if(intializer!==undefined){
        let url=intializer.renderer.domElement.toDataURL();
        let a=document.createElement("a");
        a.href=url;
        a.download='screenshot.jpeg',
        a.click();
    }
    
}

function reset_the_camera(){
    if(intializer!==undefined){
        intializer.controls.reset()
    }
    
}

function full_screen(){
    document.querySelector(".cross-div").style.display="block";
    right_panel.style.display="none";
    left_panel.style.display="none";
    intializer.renderer.setSize(window.innerWidth*0.8,canvas_measurement.height)
}

let cross=document.querySelector(".cross");
cross.addEventListener("click",function(){
    document.querySelector(".cross-div").style.display="none";
    right_panel.style.display="block";
    left_panel.style.display="flex";
    intializer.renderer.setSize(canvas_measurement.width,canvas_measurement.height);
})
