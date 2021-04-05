
const apiUrl = "https://script.google.com/macros/s/AKfycbzc0eg0WHXP4_Tcx435XPz2ECT3MaMPZE8jmhx70-6PtvUDoq5ylt2eUVstGb9zmo2-/exec";



function searchFunc() {
  let searchInput = document.getElementById("searchField").value;
  
  if(searchInput.length > 4 ) {
    const isEmailValid = emailValidation(searchInput);
    

    if(isEmailValid)
    {
      getData(searchInput)
    }
    else
    {
      alert("Invalid Email")
    }
    
  
  }

  
  // let resultArry = data.filter(function(r){
  //   return r[3].toString().toLowerCase() === searchInput.toString().toLowerCase()
  // })

  // let searchResultBox = document.getElementById("searchResults");
  // let templatetBox = document.getElementById("rowTemplate");
  // let template = templatetBox.content;

  // searchResultBox.innerHTML = "";


  // resultArry.forEach(function(r,i){

  // let tr = template.cloneNode(true)

  // let idCol = tr.querySelector(".sn")
  // let storNameCol = tr.querySelector(".storeName")
  // let fnCol = tr.querySelector(".firstName")
  // let lnCol = tr.querySelector(".lastName")
  // let emailCol = tr.querySelector(".email")
  // let feinCol = tr.querySelector(".fien")
  // let phnCol = tr.querySelector(".phn")
  // let addCol = tr.querySelector(".addrs")
  // let subCol = tr.querySelector(".sub")
  // let blcCol = tr.querySelector(".blc")
  // let tlcCol = tr.querySelector(".tlc")
  // let localeCol = tr.querySelector(".locale")
  // let subSrcCol = tr.querySelector(".subSrc")

  // idCol.textContent = i+1;
  // storNameCol.textContent = r[0]
  // fnCol.textContent = r[1]
  // lnCol.textContent = r[2]
  // emailCol.textContent = r[3]
  // feinCol.textContent = r[4]

  // phnCol.textContent = r[5]
  // console.log(i)
  // addCol.textContent = r[6]
  // subCol.textContent = r[7]

  // blcCol.href = r[8]
  // tlcCol.href = r[9]
  // localeCol.textContent = r[10]
  // subSrcCol.href = r[11]
  // searchResultBox.appendChild(tr);
  // });
}

time()
function time() {
setTimeout(function() {
    document.body.classList.remove("loading-body")
    document.getElementsByClassName("spinner-box")[0].remove();
    document.getElementsByClassName("container-self")[0].style.display = "block";
}, 500)

}

// doPost test
async function getData(input) {
  
  const response = await fetch(apiUrl, {
        method: 'POST', 
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        body: JSON.stringify({email:input}) 
      }).then(data => data.json()
        .then(d => {
        console.log(d)
      })
              }
  // axios({
  //   method: 'post',
  //   url: apiUrl,
  //   mode: 'cors',
  //   data: {
  //     email: input
  //   }
  // })
  //   .then(res => console.log(res))
  //   .then(res => console.log(res))
    
  
  
}

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
