let mainData;
let resultArry;
const apiUrl = "https://script.googleusercontent.com/a/macros/juicesupplycompany.com/echo?user_content_key=NJ2IDOTdefuJgJrHT9c0nsparjplzzKVvm92_kFSe48PHxmr7hnEHV--taHVZOnjwBWoshCi2b3AVGmJDR7BiBU1VTYmYJZOOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKCPN61pSWtBEo-3pL4KcNPpXa3lSn6LDfpoAPxoDu5zVzmjbbMW9ZEiTq4_eFHiiEYGJVVrrcLn94tlJBvksOqimzBIu5f_SQ2y2dH5QhfK7s76CDEpq_XZZPpA76_vnHbHqLXJsnpwzNz9Jw9Md8uu&lib=MWCVIWCdHMAb33AphfpbKETJdmpy7TQ7w";


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

//hide loading screen
function showUi() {

    document.body.classList.remove("loading-body")
    document.getElementsByClassName("spinner-box")[0].remove();
    document.getElementsByClassName("container-self")[0].style.display = "block";

}

//fetch data 
  fetch(apiUrl)
      .then(d => d.json())
      .then(d => {
          mainData = Object.values(d[0].data)    
          showUi();
      });



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

function filterData(email) {
  resultArry = mainData.filter(function(r){
    return r.email.toString().toLowerCase() === email.toString().toLowerCase()})
    console.log(resultArry)
    populateTable(resultArry)
}
