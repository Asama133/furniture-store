let searchInput = document.querySelector("input")
let searchIcon = document.querySelector(".fa-magnifying-glass")
let section = document.querySelector("section")
let wantedResults = []

    searchIcon.addEventListener("click",()=>{
        if(searchInput.value !== ""){
            findProduct()
        }
    })

 function findProduct(){
    section.innerHTML = ''

        allData.forEach(element => {
            let item = element
            filteredData = item.filter(el =>{
                let element_title = el.title.split(" ")[0].toLowerCase() 
                return element_title == searchInput.value.trim().split(" ")[0].toLowerCase() 
            })
    console.log(filteredData);
                filteredData.forEach((item,idx) =>{       
                        wantedResults.splice(idx,wantedResults.length,item)
                        createElement(item,idx,filteredData)
                       
                   })   
         })
     searchInput.value = ""
 }

function createElement(item,idx){
        section.innerHTML += `
        <div class="wanted">
           <div class="image"><img src="${item.img}" alt=""></div>
           <div class="caption">
              <p>${item.title}</p>
              <p>${item.price}</p>
              <div class="icons">
                 <i class="fa-sharp fa-solid fa-basket-shopping"onclick = "selectThis(${idx},wantedResults)"></i>
                  <i class="fa-sharp fa-regular fa-heart" onclick = "addToFavorites(${idx},wantedResults)"></i>
                </div>
                <p>buy now</p>
                <p onclick="detailPage('${wantedResults[idx].img}')">more details</p>
                
           </div>
       </div> 
           `
        
    }
  
function ff(wantedResults,idx){
   console.log(wantedResults[idx]); 
}
console.log(favoritesItems)
console.log(selectedItems)