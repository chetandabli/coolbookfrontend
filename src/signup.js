const signup = document.getElementById("signupForm");

signup.addEventListener("submit", async(event)=>{
    event.preventDefault();
    let signupName = signup.signupName;
    let signupEmail = signup.signupEmail;
    let signupNumber = signup.signupNumber;
    let signupPassword = signup.signupPassword;

    let obj = {
        "name" : signupName.value,
        "email" :signupEmail.value,
        "number" : signupNumber.value,
        "password": signupPassword.value
    };
    const res = await postData(obj)
    if(res.message == "Resgistration done"){
        alert(res.message);
        location.replace("login.html")
    }else{
        alert(res.message);
    }
});

async function postData(obj){
    try {
        const res = await fetch("https://panicky-colt-sunbonnet.cyclic.app/register", {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.json()
    } catch (error) {
        console.log("error: ", error);
        return 
    }
}