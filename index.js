let data;


//   function setDataForSearch(){

//     google.script.run.withSuccessHandler(function(dataReturned){
//       data = dataReturned.slice();
//     }).getDataForSearch();        
//   }
//   setDataForSearch();

//   document.getElementById("searchField").addEventListener("input",SearchFunc);
//https://script.google.com/macros/s/AKfycbyGCYL5p1EXVEhRuL66OO8oxUf3cmSKCQTqyNmL2Tqu4LhF9D7ESz-MicdDcGxMUmnc/exec
const apiUrl = "https://script.google.com/macros/s/AKfycbyPGVXSJDOUeI4ie6h05KhyKfUkY-JPio_VOXyG_E5k2FBuuWlSRygFKyXHaHm-UVqn/exec";


// let header = document.createElement("p");
// fetch(apiUrl)
//     .then(d => d.json())
//     .then(d => {
//         header.innerHTML = d[0].status
//         document.getElementById('cont').prepend(header)
          
//     });

function SearchFunc() {

    let searchInput = document.getElementById("searchField").value;



    let resultArry = data.filter(function(r){
    return r[3].toString().toLowerCase() === searchInput.toString().toLowerCase()
})


console.log(resultArry.length)

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
storNameCol.textContent = r[0]
fnCol.textContent = r[1]
lnCol.textContent = r[2]
emailCol.textContent = r[3]
feinCol.textContent = r[4]

phnCol.textContent = r[5]
console.log(i)
addCol.textContent = r[6]
subCol.textContent = r[7]

blcCol.href = r[8]
tlcCol.href = r[9]
localeCol.textContent = r[10]
subSrcCol.href = r[11]
searchResultBox.appendChild(tr);
});
}

time()
function time() {
setTimeout(function() {
    document.body.classList.remove("loading-body")
    document.getElementsByClassName("spinner-box")[0].remove();
    document.getElementsByClassName("container-self")[0].style.display = "block";
}, 3000)

}

function addRow() {
    fetch(apiUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({name:"rean"}) // body data type must match "Content-Type" header
      });
}

document.getElementById('btn').addEventListener('click', addRow)



