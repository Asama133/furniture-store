let allData = JSON.parse(localStorage.getItem("all")) || []
let popularItems = []
let shopItems = []
let popularSection = document.querySelector(".popular_items")
let shopSection = document.querySelector(".shop_items")
let selectedItems = new Set(JSON.parse(localStorage.getItem("furnitureItem"))) || new Set() 
let favoritesItems = new Set(JSON.parse(localStorage.getItem("favoritesItems")))  || new Set() 
let savePrice = JSON.parse(localStorage.getItem("savePrice")) || []  

   getData1()
    showSelectedItems()
    showFavoritesItems()
async function getData1(){
    try{
        let request = await fetch("products.json")
        let response = await request.json()
        allData = [...response]
        localStorage.setItem("all",JSON.stringify(allData))
     response.forEach(data => {
      console.log(data);
      
     
      console.log(allData);
        popularItems.push(data[3])
        shopItems.push(data[1])
        
     });
     
     showDataInPopular(popularItems,popularSection)
     showDataInPageShop(shopItems,shopSection)
     console.log(popularItems);
     
    }catch(err){
        console.log(err);
    }
   finally{
let AllItems = popularSection.querySelectorAll(".popular_items .item");

for (let i = 6; i < AllItems.length; i++) {
 AllItems[i].classList.add("hide");
 document.querySelector(".more").addEventListener("click",()=>{
  AllItems[i].classList.toggle("hide")
  // document.querySelector("#popular").style.height = "100vh"
  AllItems[i].classList.contains("hide")? 
  document.querySelector(".more").textContent = "See More":
  document.querySelector(".more").textContent = "See Less"

})
}
   }
   
}


function showDataInPopular(items,section){
  items.forEach((item,idx) =>{
    console.log(item);
    section.innerHTML += `
    <div class="item">
    <div class = "picture"><img src="${item.img}" alt=""></div>
    <div class="cover">
    </div>
    <div class="icons">
      <i class="fa-sharp fa-solid fa-basket-shopping" onclick = "selectThis(${idx},popularItems)"></i>
      <i class="fa-sharp fa-regular fa-heart" onclick = "addToFavorites(${idx},popularItems)"></i>
    </div>
    <div class="details">
      <h4>${item.title}</h4>
      <span class="rate">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </span>
      <h6>${item.price} LE</h6>
      <p onclick="detailPage('${item.img}')">more details</p>
      <p>shop now</p>
    </div>
  </div>
 
    `

})
}
function showDataInPageShop(items,section){
  items.forEach((item,idx) =>{
    console.log(item);
    section.innerHTML += `
     <div class="card">
    <div class="picture"><img src="${item.img}" alt=""></div>
    <div class="productInfo">
      <p>modern ${item.title}</p>
      <span class="rate">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </span>
      <p onclick="detailPage('${item.img}')">more details</p>
      <h6 class = "price">${item.price} LE</h6>
      <div>
        <i class="fa-sharp fa-solid fa-basket-shopping" onclick = "selectThis(${idx},shopItems)"></i>
        <i class="fa-sharp fa-regular fa-heart" onclick = "addToFavorites(${idx},shopItems)"></i>
      </div>
    </div>
    <h4>${item.title}</h4>
  </div>
    `

})
}
 //select shopping Items
function selectThis(idx,items){
  items[idx].amount = 1
  selectedItems.add(items[idx])
  console.log(items[idx]);
   localStorage.setItem("furnitureItem",JSON.stringify(Array.from(selectedItems)))
  showSelectedItems()

}
//select favorites Items
function addToFavorites(idx,items){
favoritesItems.add(items[idx])
console.log(favoritesItems);
localStorage.setItem("favoritesItems",JSON.stringify(Array.from(favoritesItems)))
showFavoritesItems()

}


function showSelectedItems(){
  document.querySelector(".accountInfo .after").textContent = selectedItems.size
  let subTotal = 0
  let itemsTotal = 0
  let tableBody = document.querySelector(".selected-pro table tbody")
  tableBody.innerHTML = ""
  document.querySelector("tfoot tr td").textContent = `total price : ${itemsTotal} LE`;
selectedItems.forEach((item,idx) =>{
  subTotal = item.price * item.amount
  itemsTotal += subTotal

  let row = document.createElement("tr")
  row.innerHTML +=`
  <td><img src = "${item.img}"></td>
  <td>${item.title}</td>
  <td class = "price">${item.price}</td>
  <td><input type = "number" focus  value = "${item.amount}" onchange = "update(this,${item.serialNumber})"></td>
  <td class = "subtotal">${subTotal}</td>
  <td><i class="fa-solid fa-trash" onclick="deleteItem(${item.serialNumber},selectedItems,showSelectedItems)"></i></td>
  `
  document.querySelector("tfoot tr td").textContent =`total price : ${itemsTotal} LE` ;
  tableBody.append(row)

})
}

// update amount of cart products 
function update(input,serialNumber){
  selectedItems.forEach(item =>{
   if(item.serialNumber === serialNumber){
    item.amount = +input.value
   }
  })
  localStorage.setItem("furnitureItem",JSON.stringify(Array.from(selectedItems)))
  showSelectedItems()
    }
  

function showFavoritesItems(){
document.querySelector(".userInfo td span").innerHTML =`${favoritesItems.size} ` 
let profileTable =  document.querySelector(".userInfo table tbody")
profileTable.innerHTML = ""
favoritesItems.forEach((item,idx) =>{
let profileRow = document.createElement("tr")
profileRow.innerHTML +=`
<td><img src="${item.img}" alt=""></td>
<td>${item.title}</td>
<td onclick = "deleteItem(${item.serialNumber},favoritesItems,showFavoritesItems)">remove</td>
`
profileTable.append(profileRow)
})
}




// Delete Item
function deleteItem(serialNumber,arr,callback){
 arr.forEach((item) =>{
    if(item.serialNumber === serialNumber){
      item.amount = 1
      arr.delete(item)
    }
  })
  localStorage.setItem("furnitureItem",JSON.stringify(Array.from(selectedItems)))  
  callback()

}


// display product details
function detailPage(img){
allData.forEach((data,index) =>{
data.forEach((item,idx) =>{
if(item.img == img ){
 splicedItem =  data.splice(idx,1)
 data.unshift(...splicedItem)
 firstItem = allData.splice(index,1)
 allData.unshift(...firstItem)
}
  })
  localStorage.setItem("all",JSON.stringify(allData))

})
  location.href="details.html"
}

document.querySelector("header img").onclick = goToSearchPage
function goToSearchPage(){
  location.href="search.html"
}
