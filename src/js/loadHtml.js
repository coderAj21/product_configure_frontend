const HTMLValues=`
<div class='loading'>
      <div class="loader">
          <svg viewBox="0 0 80 80">
              <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
      </div>
      
      <div class="loader triangle">
          <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
      </div>
      
      <div class="loader">
          <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
      </div>
    </div>
    <div class="cross-div">
      <i class='bx bx-x bx-lg cross'></i>
    </div>
 
    <div id="app">
            <!-- upper panel -->
            <div class="upper-panel">
              <p class="model-name">name</p>
              <div class="">
                <p>Price</p>
                <p class="priceValue">value</p>
              </div>
            </div>
        
            <!-- left- panel -->
            <div id="left-panel" class="left-panel">
              <div class="left-panel-items" class="left-panel-items">
                <i class='bx bx-screenshot bx-md screenshot '></i>
                <p class="icon-heading">Screenshot</p>
              </div>
              <div class="left-panel-items" class="left-panel-items">
                <i class='bx bxs-camera bx-md reset-camera'></i>
                <p class="icon-heading ">Reset Camera</p>
              </div>
              <div class="left-panel-items" class="left-panel-items">
                <i class='bx bx-fullscreen bx-md fullscreen'></i>
                <p class="icon-heading ">Fullscreen</p>
              </div>
              <div class="left-panel-items" class="left-panel-items">
                <i class=' icon bx bx-clipboard bx-md show-part-list'></i>
                <p class="icon-heading ">Show part list</p>
              </div>
              <div class="left-panel-items" class="left-panel-items">
                <i class='bx bx-qr-scan bx-md ar-view'></i>
                <p class="icon-heading ">AR View</p>
              </div>
            </div>
              <div class="threejs"></div>
              <div class="optionsPannel">
                <div class="optionsHeading">
                  <i class='bx bx-cog optionsSettings' ></i>
                  <div>OPTIONS</div>
                  <i class='bx bx-chevrons-right optionsBtn'></i>
                </div>
                <div class="overContainer">
                </div>
              </div>       
    </div> 

`


export function LoadHtml()
{
    
    let temp=document.createElement('span')
    const parser=new DOMParser()
    const doc=parser.parseFromString(HTMLValues,'text/html')
    temp.innerHTML=doc.body.innerHTML;    
    document.body.appendChild(temp)
    
}
