let mainData;
let resultArry;
const apiUrl = "https://script.google.com/macros/s/AKfycbwchVOxBVGBQslCB9dtkLhKyj4pyihAxsWCTUBqJgZqd1ipJ8zqrVLFncAe8nBGxZId/exec";



function searchFunc() {
  let searchInput = document.getElementById("searchField").value;
  
  if(searchInput.length > 4 ) {

    const isEmailValid = emailValidation(searchInput);
    
    if(isEmailValid)
    {
      filterData(searchInput)
    }
    else
    {
      alert("Invalid Email")
    }  
  }


  
}


function showUi() {

    document.body.classList.remove("loading-body")
    document.getElementsByClassName("spinner-box")[0].remove();
    document.getElementsByClassName("container-self")[0].style.display = "block";

}

// doPost test

  


  fetch(apiUrl)
      .then(d => d.json())
      .then(d => {
          mainData = Object.values(d[0].data)    
          showUi();
      });

// let header = document.createElement("p");
// fetch(apiUrl)
//     .then(d => d.json())
//     .then(d => {
//         header.innerHTML = d[0].status
//         document.getElementById('cont').prepend(header)
          
//     });


document.querySelector('.btn').addEventListener('click', searchFunc)



function emailValidation(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function populateTable(resultArry) {
  let searchResultBox = document.getElementById("searchResults");
  let templatetBox = document.getElementById("rowTemplate");
  let template = templatetBox.content;

  searchResultBox.innerHTML = "";


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
  let subCol = tr.querySelector(".sub")
  let blcCol = tr.querySelector(".blc")
  let tlcCol = tr.querySelector(".tlc")
  let localeCol = tr.querySelector(".locale")
  let subSrcCol = tr.querySelector(".subSrc")

  idCol.textContent = i+1;
  storNameCol.textContent = r.store
  fnCol.textContent = r.firstName
  lnCol.textContent = r.lastName
  emailCol.textContent = r.email
  feinCol.textContent = r.fien

  phnCol.textContent = r.phn 
  
  addCol.textContent = r.addrs
  subCol.textContent = r.sub

  blcCol.href = r.blc
  tlcCol.href = r.tlc
  localeCol.textContent = r.locale
  subSrcCol.href = r.subSrc
  searchResultBox.appendChild(tr);
   });
}

function filterData(email) {
  resultArry = mainData.filter(function(r){
    return r.email.toString().toLowerCase() === email.toString().toLowerCase()})
    console.log(resultArry)
    populateTable(resultArry)
}
