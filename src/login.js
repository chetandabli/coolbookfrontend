const login = document.getElementById("loginForm");

login.addEventListener("submit", async(event)=>{
    event.preventDefault();
    let loginEmail = login.loginEmail;
    let loginPassword = login.loginPassword;
    let loginCheckBox = login.loginCheckBox;

    let obj = {
        "email" : loginEmail.value,
        "password" :loginPassword.value,
        "checkbox": loginCheckBox.checked
    };
    let res = await postData(obj);
    if(res.message == "Login done"){
        alert("Login Done!");
        localStorage.setItem("token", res.token)
        localStorage.setItem("nameofbookowner", res.name)
        location.replace("index.html")
    }else{
        alert(res.message)
    }
});

async function postData(obj){
    try {
        const res = await fetch("https://panicky-colt-sunbonnet.cyclic.app/login", {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await res.json()
    } catch (error) {
        console.log("error: ", error);
        return 
    }
}