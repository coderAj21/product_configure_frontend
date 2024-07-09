import stateManagement from "./stateManagement";
export function stateAction()
{
    const priceValue=document.querySelector('.priceValue')
    var price=0
    
    stateManagement.segementSelected.map(i=>{
        price+=i.price
        stateManagement.propertiesSelected.map(j=>{
            if(j.parent==i.name)
                price+=j.price
            
        })
    })
    

    priceValue.innerHTML=price+" ₹"
    // console.log(stateManagement)
}