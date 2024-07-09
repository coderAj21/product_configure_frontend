import stateManagement from "../states/stateManagement";
import { stateAction } from "../states/stateAction";
function sectionComponent(counter,heading,colorName){
    const cardTemplate=document.createElement('template')
    cardTemplate.innerHTML=`
    <style>
    .optionsHeading{
        width: 100%;
        display: flex;
        flex-direction:row;
        text-transform: uppercase;
        align-items: center;
        cursor:pointer !important;
        background-color:#71717a;
        border-bottom:  1px solid #aedde5;
        height:13vh;
        transition:all 200ms ease-in;
        
      }
      .optionsHeading>*{
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        margin-left:1vw;
        color: white;
        padding: 10px;
      }
      .color{
        background-color:${counter};
        width:50px;
        height:20px;
        box-shadow: 0 0 10px #003135;
      }
      .properties{
        display:flex;
       flex-direction:column;
      }
    .optionsHeading:hover{
        background-color: #52525b;
      
    }
   
    .colorName{
        font-size: 9px;
        color:#d4d4d8;
      
    }
    </style>
    <div class="optionsHeading over">
        <div class="color"></div>
        <div class="properties">
            <div class="colorHeading">${heading}</div>
            <div class="colorName">${colorName}</div>
        </div>
        <i class='bx bx-chevrons-right optionsBtn'></i>
    </div>
    `

    return cardTemplate.content.cloneNode(true);
}

export class colorComponent extends HTMLElement{
    // static current=undefined
    constructor(intializer,parent,name,heading,color,price,colorName)
    {
        super()
        
        const shadowRoot=this.attachShadow({mode:'open'})
        this.intializer=intializer
        this.meshParent=parent
        this.parent=name
        this.heading=heading
        this.color=color
        this.price=price
        this.colorName=colorName 
        // colorComponent.current=current
        
        
        shadowRoot.appendChild(sectionComponent(this.color,this.heading,this.colorName))
        
        this.onclick=()=>{
            this.changeColor()
            this.changeStateManagement()
            stateManagement.propertiesSelected.push({parent:this.meshParent,color:color,price:price})
            console.log(stateManagement)
            stateAction()
        }
    }  

    changeStateManagement()
    {
        stateManagement.propertiesSelected=stateManagement.propertiesSelected.filter(i=>{
            if(i.parent!=this.meshParent)
                return true
        })
    }
    async changeColor()
    {
        
        await this.intializer.SetColor(await this.intializer.GetObjectByName(this.parent),this.color)
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
            console.log(newVal)          
        }        
    }
}

customElements.define('color-component',colorComponent)