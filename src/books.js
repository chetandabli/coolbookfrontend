let token = localStorage.getItem("token") || false;

if (token) {
  getAllBook(token);
} else {
  alert("you Can't access this page without login!");
  location.replace("login.html");
}

async function getAllBook(token) {
  try {
    const res = await fetch(`https://panicky-colt-sunbonnet.cyclic.app/books`, {
      headers: {
        authorization: `${token}`,
      },
    });
    let data = await res.json();
    if (data.message) {
      alert(data.message);
      location.replace("login.html");
    } else {
      appendData(data);
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function appendData(data) {
  document.getElementById("container").innerHTML = "";
  let htmlData = [];
  data.forEach((el) => {
    let temp = `<div class="col-sm-6">
        <div class="card mb-1">
            <div class="card-header">
                ${el.category}
            </div>
            <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <p class="card-text">${el.summary}</p>
                <div>
                    <button type="button" data-id="${el._id}" class="btn btn-primary delbtn">Delete</button>
                    <button type="button" data-id="${el._id}" class="btn btn-primary updatebutton">Update Category</button>
                </div>
            </div>
        </div>
    </div>`;
    htmlData.push(temp)
  });
  document.getElementById("container").innerHTML = htmlData.join(" ");
  let allbtn=document.querySelectorAll(".delbtn")
  let updatebtn=document.querySelectorAll(".updatebutton")

for(var btn of allbtn){
  btn.addEventListener("click",(e)=>{
    let id=e.target.dataset.id
    deletedata(id)
  })
}
for(var btn of updatebtn){
  btn.addEventListener("click",(e)=>{
    let id=e.target.dataset.id
    updatebook(id)
  })
}
}


document.getElementById("addbookbutton").addEventListener("click", () => {
  let title = document.getElementById("booktitle");
  let category = document.getElementById("bookcategory");
  let summary = document.getElementById("booksummery");

  if (title.value == "" || category.value == "" || summary.value == "") {
    alert("Please fill all required details");
  } else {
    let obj = {
      title: title.value,
      category: category.value,
      summary: summary.value,
    };
    (async function temp(){
      if(await postbook(obj)){
        title.value = "";
        category.value = "";
        summary.value = "";
      }
    })()
    

  }
});

async function postbook(obj) {
  try {
    const res = await fetch(`https://panicky-colt-sunbonnet.cyclic.app/books`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    let data = await res.json();
    console.log(data)
    if (data.message == "Book Added") {
      document.getElementById("alert").innerHTML = `<div class="alert alert-success d-flex align-items-center"      role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill" />
            </svg>
            <div>
                ${obj.title}, Book has been added!
            </div>
        </div>`;

        setTimeout(() => {
            document.getElementById("alert").innerHTML = ""
        }, 3000);
        getAllBook(token)
        return true
    }else{
        document.getElementById("alert").innerHTML = `<div class="alert alert-warning d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
        Oh no! Book is not added please try again adding!
        </div>
      </div>`;

    setTimeout(() => {
        document.getElementById("alert").innerHTML = ""
    }, 3000); 
    }
  } catch (error) {
    console.log("error: ", error);
  }
}


async function deletedata(id){
  let res=await fetch(`https://panicky-colt-sunbonnet.cyclic.app/books/${id}`,{
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `${localStorage.getItem("token")}`,
    }
  });
  if(res.ok){
    getAllBook(token)
  }
}
async function updatebook(id){
  let obj = {
    category: prompt("Please type one of below category!\nHorror, Mystery, History, Economy, Psychology, War")
  }
  try {
    let res=await fetch(`https://panicky-colt-sunbonnet.cyclic.app/books/${id}`,{
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(obj)
  });
  if(res.ok){
    getAllBook(token)
  }
  } catch (error) {
    console.log(error)
  }
}