document.querySelector(".btn").addEventListener("click", searchFunc);

function searchFunc() {
  document.getElementById("search").style.display = "flex";
  let searchBox = document.getElementById("searchField");
  let searchInput = searchBox.value;
  document.getElementsByClassName("table-container")[0].style.display = "none";
  if (!document.body.classList.contains("loading-body")) {
    document.body.classList.add("loading-body");
  }

  if (isEmail(searchInput)) {
    document.getElementById("search").style.display = "none";
    document.getElementsByClassName("spinner-box")[0].style.display = "flex";

    fetch("/search?email=" + searchInput).then((response) => {
      response.json().then((data) => {
        console.log(data);
        if (data.length === 0) {
          alert("No data associated with the provided email");
        } else {
          populateTable(data);
          document.body.classList.remove("loading-body");
          document.getElementsByClassName("table-container")[0].style.display =
            "block";
        }
        document.getElementsByClassName("spinner-box")[0].style.display =
          "none";

        document.getElementById("search").style.display = "flex";
      });
    });
  } else {
    alert("Invalid Email");
  }
  searchBox.value = "";
}

//hide loading screen
// function showUi() {

//     document.body.classList.remove("loading-body")
//     document.getElementsByClassName("spinner-box")[0].remove();
//     document.getElementsByClassName("container-self")[0].style.display = "block";

// }

function isEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function populateTable(resultArry) {
  let searchResultBox = document.getElementById("searchResults");
  searchResultBox.innerHTML = "";
  let templatetBox = document.getElementById("rowTemplate");
  let template = templatetBox.content;
  console.log(resultArry);
  resultArry.forEach(function (r, i) {
    let tr = template.cloneNode(true);

    let idCol = tr.querySelector(".sn");
    let storeCol = tr.querySelector(".store");
    let addressCol = tr.querySelector(".address");
    let cityCol = tr.querySelector(".city");
    let stateCol = tr.querySelector(".state");
    let zipCol = tr.querySelector(".zip");
    let licenseCol = tr.querySelector(".license");
    let expires_atCol = tr.querySelector(".expires_at");
    let tlcCol = tr.querySelector(".tlc");

    idCol.textContent = i + 1;
    storeCol.textContent = r.store;
    addressCol.textContent = r.address;
    cityCol.textContent = r.city;
    stateCol.textContent = r.state;
    zipCol.textContent = r.zip;
    licenseCol.textContent = r.license;
    expires_atCol.textContent = r.expires_at.split("T")[0];
    if (r.tlc.trim().length > 0) {
      tlcCol.href = r.tlc;
    } else {
      tlcCol.href = "javascript:alert('File Not Yet Available')";
    }

    searchResultBox.appendChild(tr);
  });
}
