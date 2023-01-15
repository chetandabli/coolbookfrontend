import {navbar} from "../components/navbar.js"

document.getElementById("navbar").innerHTML = navbar();

let nameofbookowner = localStorage.getItem("nameofbookowner")
if(nameofbookowner){
    document.getElementById("logoutorloginbutton").innerHTML = "";
    document.getElementById("logoutorloginbutton").innerHTML = `<a class="nav-link" href="#">${nameofbookowner}</a><button type="button" id="logoutbutton" class="btn btn-primary">Logout</button>`
    document.getElementById("logoutbutton").addEventListener("click", ()=>{
        localStorage.removeItem("nameofbookowner");
        localStorage.removeItem("token");
        document.getElementById("navbar").innerHTML = navbar();
        if(window.location.pathname == "/books.html"){
            location.reload()
        }
        
    })
}

