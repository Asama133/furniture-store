
let categoriesItems = []
let categories_links =  Array.from(document.querySelectorAll(".categoriesLinks p"))
categories_links[0].classList.add("activeLink")

getData("Bed")

categories_links.forEach(link =>{
    link.addEventListener("click",(e)=>{
        removeActive()
        link.classList.add("activeLink")
        document.querySelector(".gallery").innerHTML=""
       let linkId = e.target.id
       getData(linkId)
       
    })
})

 function getData(linkId){

 allData.forEach(element => {
    let item = element
    item = item.filter(el =>{
        return el.category == linkId
    })
   console.log(item);
    item.forEach((item,idx) =>{  
        categoriesItems.splice(idx,categoriesItems.length,item)
document.querySelector(".gallery").innerHTML += `

<div onclick = "showDetails(${idx})">
<img src="${item.img}" alt="">
</div>
`
    })
   
 })
  
    
}

function showDetails(idx){
    document.querySelector(".box").innerHTML = `
   
    <div class="picture"><img src="${categoriesItems[idx].img}" alt="" /></div>
    <div class="details">
      <span class="rate">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        
      </span>
      

      <h4>${categoriesItems[idx].title}</h4>
      <h6>${categoriesItems[idx].price} LE</h6>
      <div class="icons">
        <i class="fa-sharp fa-solid fa-basket-shopping"onclick = "selectThis(${idx},categoriesItems)" ></i>
        <i class="fa-sharp fa-regular fa-heart" onclick = "addToFavorites(${idx},categoriesItems)"></i>
      </div>
      <p onclick="detailPage('${categoriesItems[idx].img}')">more details</p>
    </div>
    `
}


//remove active link
function removeActive(){
    categories_links.forEach(link =>{
        link.classList.remove("activeLink")
    })
}



