import stateManagement from "../states/stateManagement";
import { colorComponent } from "./colorComponent";
import { partComponent } from "./partComponent";
import { stateAction } from "../states/stateAction";
function sectionComponent(counter,heading){
    const cardTemplate=document.createElement('template')
    cardTemplate.innerHTML=`
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <style>
    .optionsHeading{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor:pointer;
        padding:10px;
        height:5vh;
        border-bottom :1px solid rgba(255,255,255,0.5);
      }
      .optionsHeading:hover{
        background-color:#3f3f46;
      }
      .optionsHeading>*{
        font-size: 14px;
        color: white;
        font-family: 'Open Sans', sans-serif;
        font-weigth:bold;
        }
        .option-counter,.optionsBtn{
            min-width:15%;
            text-align: center;
        }
        .optionHeading{
            min-width:60%;
            font-weight: bold;
            text-align: left;
        }
        
    </style>
    <div class="optionsHeading over">
        <div class="option-counter">0${counter}</div>
        <div class="optionHeading">${heading}</div>
        <i class='bx bx-chevrons-right optionsBtn'></i>
    </div>
    `

    return cardTemplate.content.cloneNode(true);
}

export class CardComponent extends HTMLElement{
    static counter=0;
    constructor(counter,heading,meshData,intializer,data,type)
    {
        super()
        this.counter=counter
        this.heading=heading
        this.meshData=meshData
        this.data=data
        this.intializer=intializer
        this.price=this.data[this.meshData.name[0]].price
        this.type=type;
        CardComponent.counter=0
        
        const shadowRoot=this.attachShadow({mode:'open'})
        shadowRoot.appendChild(sectionComponent(this.counter,this.heading.toUpperCase()))
        if(this.type==='segment')
        {
                this.LoadModel()

        stateManagement.segementSelected.push({name:this.meshData.name[0],price:this.data[this.meshData.name[0]].price})
        stateAction()
        this.onclick=()=>{
            let overContainer=document.querySelector('.overContainer')
            overContainer.classList.toggle('open')

            if(CardComponent.counter%2===0)
            {
                Object.keys(this.data.segment).map(i=>{

                    if(i==this.heading)
                    {                        
                        this.data.segment[heading].map(i=>{
                            let img=this.data[i.parts_name].image
                            let name=this.data[i.parts_name].name
                            
                            let part=new partComponent(this.intializer,img,name,this.meshData.name[0],this.data)
                            overContainer.appendChild(part)
                            
                        })
                    }
                })
            }
            else
            {
                while(overContainer.hasChildNodes())
                {
                    overContainer.removeChild(overContainer.firstChild)
                }   
            }
            CardComponent.counter++

        }    
    }
    else if(this.type==="color")
        {
            this.onclick=()=>{
                let overContainer=document.querySelector('.overContainer')
                overContainer.classList.toggle('open')
                
                if(CardComponent.counter%2===0)
                {
                    let arr=[]
                    stateManagement.segementSelected.map(i=>{
                        arr.push(i.name)
                    })
                    let keys=[]
                    arr.map(i=>{
                        let arr=Object.keys(this.data[i]).filter(i=>{
                            if(i=="name" || i=="image" || i=="price")
                                return false;
                            else 
                                return true;    
                        })
                        keys.push({name:i,child:arr})                        
                    })

                    let colorArr=[]
                    keys.map(i=>{
                        i.child.map(j=>{
                            
                            //i.name => parent, j=>child
                            let arr=Object.keys(this.data[i.name][j]).filter(i=>{
                                if(i=='color')
                                    return true;
                            })

                            if(arr[0]==='color')
                                colorArr.push({parent:i.name,name:j,property:this.data[i.name][j]})
                        })
                    })

                    colorArr.map(i=>{
                        //i.name=> mesh name, i.property=> properties                        
                        let name=i.name
                        let heading=i.property.heading
                        let color=undefined,price=undefined,colorName=undefined;
                        
                        i.property.color.map(j=>{
                            
                            price=j.attribute_price,
                            color=j.attribute_value,
                            colorName=j.attribute_name

                            let colorComp=new colorComponent(this.intializer,i.parent,name,heading,color,price,colorName)
                            overContainer.appendChild(colorComp)
                        })

                    })

                }
                else
                {
                    while(overContainer.hasChildNodes())
                        {
                            overContainer.removeChild(overContainer.firstChild)
                        }   
                }
                CardComponent.counter++
            }
        }    
        
    }

    async LoadModel()
    {
        // console.log(await this.meshData.name[0]);
        await this.intializer.ShowAllMeshesFromObject(await this.intializer.GetObjectByName(await this.meshData.name[0]))
    }

    connectedCallback()
    {

    }

    disconnectedCallback()
    {

    }

    static get observedAttributes(){

    }

    get id(){
     return this.getAttribute(id)
    }

    set id(value){
        this.setAttribute("id",value)
    }
    
    attributeChangedCallback(attrName,oldVal,newVal)
    {
        if(attrName.toLowerCase()=='content')
        {
            // console.log(newVal)          
        }        
    }
}

customElements.define('card-component',CardComponent)