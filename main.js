let header =  document.querySelector("header")
let menu = document.querySelector(".burger-icon")
let nav = document.querySelector("nav")
let homePage = document.querySelector("#home")
let signInPage = document.querySelector(".signInPage")
let signUpPage = document.querySelector(".signUpPage")
let selectedProductsPage = document.querySelector(".selected-pro")
let userInfoPage = document.querySelector(".userInfo")
let container = document.querySelector(".container")
let homeBtn = document.querySelector("#homeBtn")
let categoriesPage = document.querySelector("#categoriesPage")
let upBtn = document.querySelector("#upBtn")
let categoriesPageBtn = document.querySelector("#categoriesPage button")

homeBtn.addEventListener("click",openCategoriesPage)

function openCategoriesPage(){
categoriesPage.classList.remove("hide")
container.style.opacity = 0
categoriesPage.style.zIndex = 10
header.classList.add("hide")

}
categoriesPageBtn.addEventListener("click",closeCategoriesPage)
function closeCategoriesPage (){
    header.classList.remove("hide")
    container.style.opacity = 1
    categoriesPage.classList.add("hide")
    categoriesPage.style.zIndex = 5
}
//display || hide nav / home page
menu.addEventListener("click",changeStyle)
function changeStyle(){
menu.classList.toggle("open")
document.querySelector(".logging").classList.add("hide") 
if(menu.className == "burger-icon open"){
    nav.classList.remove("hide")
    container.style.opacity = 0.1
    signInPage.classList.add("hide")
    signUpPage.classList.add("hide")
    selectedProductsPage.classList.add("hide")
    userInfoPage.classList.add("hide")
  
}else{
   nav.classList.add("hide")
   container.style.opacity = 1
}
}
//display || hide sing in page / sign up page
document.querySelector(".sign-in").addEventListener("click",()=>{
    show(signInPage,signUpPage)})

document.querySelector(".sign-up").addEventListener("click",()=>{
    show(signUpPage,signInPage)})

function show(shown,hidden){
container.style.opacity = 0.1
    shown.classList.remove("hide")
    shown.style.zIndex = 100
    hidden.classList.add("hide")
   hidden.style.zIndex = -5
   document.querySelector(".logging").classList.add("hide")
    nav.classList.add("hide")
    menu.classList.remove("open")
}


//display || hide selected products page / user information page
document.querySelector(".fa-basket-shopping").addEventListener("click",()=>{
    showInfo(selectedProductsPage,userInfoPage)})

document.querySelector(".info").addEventListener("click",()=>{
    showInfo(userInfoPage,selectedProductsPage)})

function showInfo(shown,hidden){
    shown.classList.toggle("hide")
    if(shown.classList.contains("hide")){
        container.style.opacity = 1
    }else{
        shown.style.zIndex = 18
        container.style.opacity = 0.1
        nav.classList.add("hide")
        hidden.classList.add("hide")
        menu.classList.remove("open")
    //      signInPage.classList.add("hide")
    //    signUpPage.classList.add("hide")
    // shown.style.zIndex = -3
    }
}
document.querySelector(".account").onclick = function(){
    document.querySelector(".logging").classList.toggle("hide") 
    if( document.querySelector(".logging").classList.contains("hide")){
        container.style.opacity = 1  
    }else{
        container.style.opacity = 0.1
        document.querySelector(".logging").style.zIndex = 18
        signInPage.classList.add("hide")
        signUpPage.classList.add("hide")
        nav.classList.add("hide")
        menu.classList.remove("open")
    }
 
}

// forms valodation
let signUp = document.querySelector("#register")
let signIn = document.querySelector("#log")
let all_inputs = document.querySelectorAll("#register input")
let required_inputs = document.querySelectorAll("#register input:not(input[type = 'number']")
let checkbox = document.querySelector("input[type = 'checkbox']")
let complete = true
let clientsData =  JSON.parse(localStorage.getItem("clients")) || []

signUp.addEventListener("submit",(e)=>{
    e.preventDefault()
    alertIfEmpty()
    addClientData(all_inputs)
    checkbox.checked = false
    emptyInputs(all_inputs)
})


function alertIfEmpty(){
// remove success class
all_inputs.forEach(input =>{
    if(input.parentElement.classList.contains("success")){
        input.parentElement.classList.remove("success")
    }
})
//add error class
required_inputs.forEach(input =>{
    if(input.value.trim()==""){
        input.parentElement.classList.add("error")
        complete = false
    }
  
})

}

all_inputs.forEach(input =>{   
    input.addEventListener("keyup",()=>{
        if(input.parentElement.classList.contains("error")){
            input.parentElement.classList.remove("error")
            input.parentElement.querySelector("p").textContent = ``
            input.placeholder=="tel"? input.parentElement.querySelector("p").textContent = `optional `:null
        }
        alertIfNotValid(all_inputs[0],"Minimum Length 3",/\w{3,}/gi)
        alertIfNotValid(all_inputs[1],"Minimum Length 3",/\w{3,}/gi)
        alertIfNotValid(all_inputs[2],"email must contains @.. .com",/\w+@\w+.com$/g)
        alertIfNotValid(all_inputs[3],"Minimum Length 8 characters,contains at least one letter", /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        alertIfNotValid(all_inputs
            [4],"Minimum Length 7 numbers", /\d{7,}/)
    })

    })


    function alertIfNotValid(input,msg,regex){
        let match = input.value.match(regex)
       if(input.value.trim()!==""){
        if(!match){ 
            input.parentElement.querySelector("p").textContent = msg 
           input.parentElement.classList.add("error")
           input.parentElement.classList.remove("success")
            complete = false
         } else{
            input.parentElement.classList.add("success")
            checkbox.style.pointerEvents ="all"
            complete = true
           
         }
       }
       
    }

checkbox.addEventListener("click",isChecked)
function isChecked(){
  
    if(checkbox.checked){
       return true
    }
    return false
}

function addClientData (all_inputs){
    client = {
        fullName : all_inputs[0].value + " " + all_inputs[1].value,
        email : all_inputs[2].value ,
       password : all_inputs[3].value ,
       telephone :all_inputs[4].value ,
       save :isChecked(),
       isValid :`${complete}`,

    }

 if(client.save && client.isValid == "true"){
   clientsData.push(client)
   signUpPage.classList.add("hide")
   signInPage.classList.remove("hide")

    }
    
localStorage.setItem("clients",JSON.stringify(clientsData))
console.log(clientsData);
}

// sign in
let signInInputs = document.querySelectorAll("#log input")

signIn.addEventListener("submit",(e) =>{
    e.preventDefault()
signInInputs.forEach(input =>{
    input.addEventListener("keyup",()=>{
       input.parentElement.classList.remove("error") 
    })
    if(input.value.trim() == ""){
                input.parentElement.classList.add("error")
               
    }
});
findClientData()

emptyInputs(signInInputs)
})

function findClientData(){

    let client = clientsData.find(client =>{
        return client.fullName == signInInputs[0].value && 
               client.password == signInInputs[1].value
    })
    
    if(client){
        document.querySelector(".account").style.display = "none"
        changeClasses(signInInputs[0])
        changeClasses(signInInputs[1])
        setTimeout(()=>{
            signInPage.classList.add("hide")
            container.style.opacity = 1
            signInInputs[0].parentElement.classList.remove("success")
            signInInputs[1].parentElement.classList.remove("success")
        },500)
    //   document.querySelector(".account").classList.add("hide")
    //   document.querySelector(".sign-up").classList.add("hide")
      document.querySelector(".accountInfo span").classList.remove("hide")
      userInfoPage.querySelector(".name").textContent = client.fullName
      userInfoPage.querySelector(".Eadress").textContent = client.email
    }
 
    if(client === undefined && signInInputs[0].value !=="" ){    
       signIn.querySelectorAll("p")[0].textContent = "undefined user name"   
       signInInputs[0].parentElement.classList.add("error")
     }
     if(client === undefined && signInInputs[1].value !==""){
        signIn.querySelectorAll("p")[1].textContent = "undefined password"
       signInInputs[1].parentElement.classList.add("error")
     }
          
      console.log(client);
}

function changeClasses(input){
    if(input.parentElement.classList.contains("error")){
        input.parentElement.classList.remove("error")
        input.parentElement.classList.add("success")
     }
}
function emptyInputs(inputs){
    inputs.forEach(input =>{
        input.value = ""
    })
}

let links = document.querySelectorAll("form span")
links[0].addEventListener("click",()=>{goToOtherPage(signUpPage,signInPage)})
links[1].addEventListener("click",()=>{goToOtherPage(signInPage,signUpPage)})
function goToOtherPage(currentP,otherP){
    otherP.classList.remove("hide")
    otherP.style.zIndex = 7
    currentP.classList.add("hide") 
    
}
function activeSection(){
    document.querySelector('.container').style.opacity = 1;
             document.querySelector('nav').classList.add('hide')
             menu.classList.remove('open')
}

window.onscroll = function(){
    document.querySelector("header").style.background= "var(--colorOne)"
    document.querySelector("header").style.color= "var(--colorTwo)"
    console.log(this.scrollY);
    this.scrollY >= 1000 ? upBtn.style.right = "1em" :  upBtn.style.right = "-2em"
  
}
// scroll to top
upBtn.addEventListener("click",scrollUp)

function scrollUp(){
    window.scrollTo({
        top:0,
    })
    
}

// userInfoPage.innerHTML+= `
// <table>
// <tbody>
//   <tr>
//     <td><img src="/img/chair2.png" alt=""></td>
//     <td>title</td>
//     <td>remove</td>
//   </tr>
// </tbody>
// </table>
// `









