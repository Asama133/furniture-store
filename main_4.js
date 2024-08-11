
let number = 1
let i = 0

window.onload = showInPage();

async function showInPage() {
    try{
        // let request = await fetch("products.json")
        // let response = await request.json()
        allData.forEach((data,i) => {
            let details = data;
            
            details.forEach((el,idx) => {
                
                console.log(details.length);
              document.querySelector(".section").innerHTML += `
              <div class="box">
              <div class="picture">
                <img src="${el.img}" alt="">
              </div>
              <div class="proInfo">
                <h1>category : ${el.category}</h1>
            <h3>${el.title}<h3>
              <h3> price : ${el.price} LE</h3>
              <h3>${el.description}</h3>
              <h3>Brand: ${el.brand}</h3>
              <h3>${el.discountPercentage}</h3>
              <h3>rating: ${el.rating}</h3>
              <p><span>${number++} </span>/ ${details.length*allData.length} </p>
              </div>
            </div>
            
                   `
            });
          });
    }catch(err){
        console.log(err);
    }
  
}


function next(){
   
document.querySelectorAll(".section .box")[i].classList.add("hide");
i++
    if(i >= 31){
        i = 31
        document.querySelectorAll(".section .box")[i].classList.remove("hide")
     
    }
    

}
console.log(i);
function previous(){
    i--
    document.querySelectorAll(".section .box")[i].classList.remove("hide")
    if(i == 0){
        i = 0
    }
}
