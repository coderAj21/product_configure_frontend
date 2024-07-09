
export function Utility()
{
    const sidePannel=document.querySelector('.optionsBtn')
    const optionsSettings=document.querySelector('.optionsSettings')
    const optionsPannel=document.querySelector('.optionsPannel')
    const over=document.querySelectorAll('.over')
    const overContainer=document.querySelector('.overContainer')
    
    over.forEach(i=>{
        i.addEventListener('click',()=>{
            optionsPannel.classList.toggle('openOptions')
            overContainer.classList.toggle('open')
        })
    })
}