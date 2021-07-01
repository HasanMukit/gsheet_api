
document.querySelector('.btn').addEventListener('click', searchFunc)

function searchFunc() {
  document.getElementById('search').style.display = "flex"
  let searchBox = document.getElementById("searchField")
  let searchInput = searchBox.value
  document.getElementsByClassName("table-container")[0].style.display = "none";
  if(!document.body.classList.contains("loading-body"))
  {
    document.body.classList.add("loading-body")
  }
  
  
  
  if(isEmail(searchInput))
  {
    
    document.getElementById('search').style.display = "none"
    document.getElementsByClassName("spinner-box")[0].style.display = "flex";
    
    fetch('/search?email=' + searchInput).then((response) => {
      response.json().then((data) =>{
        if(data.length === 0) {
          alert("No data associated with the provided email")
        }
        else
        {
          populateTable(data)
          document.body.classList.remove("loading-body")
          document.getElementsByClassName("table-container")[0].style.display = "block";
          
        }
        document.getElementsByClassName("spinner-box")[0].style.display = "none";
    
        document.getElementById('search').style.display = "flex"
      })
    })
    
  }
  else
  {
    alert("Invalid Email")
  }
  searchBox.value = ""
}

//hide loading screen
// function showUi() {

//     document.body.classList.remove("loading-body")
//     document.getElementsByClassName("spinner-box")[0].remove();
//     document.getElementsByClassName("container-self")[0].style.display = "block";

// }


function isEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function populateTable(resultArry) {
  let searchResultBox = document.getElementById("searchResults");
  searchResultBox.innerHTML = ''
  let templatetBox = document.getElementById("rowTemplate");
  let template = templatetBox.content;



  resultArry.forEach(function(r,i){

  let tr = template.cloneNode(true)

  let idCol = tr.querySelector(".sn")
  let storNameCol = tr.querySelector(".storeName")
  let fnCol = tr.querySelector(".firstName")
  let lnCol = tr.querySelector(".lastName")
  let emailCol = tr.querySelector(".email")
  let feinCol = tr.querySelector(".fien")
  let phnCol = tr.querySelector(".phn")
  let addCol = tr.querySelector(".addrs")
  let blcCol = tr.querySelector(".blc")
  let tlcCol = tr.querySelector(".tlc")
  

  idCol.textContent = i+1;
  storNameCol.textContent = r.store
  fnCol.textContent = r.firstName
  lnCol.textContent = r.lastName
  emailCol.textContent = r.email
  feinCol.textContent = r.fien

  phnCol.textContent = r.phn 
  
  addCol.textContent = r.addrs
  

  r.blc.trim().length > 0 ? blcCol.href = r.blc : blcCol.href ="javascript:alert('File Not Yet Available')";

  r.tlc.trim().length > 0 ? tlcCol.href = r.tlc : tlcCol.href ="javascript:alert('File Not Yet Available')";
 
  
  searchResultBox.appendChild(tr);
   });
}


