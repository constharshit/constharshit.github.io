//First we get values from the user
//We will pass the values input to our server Flask
//We use a GET request by first creating a endpoint
// We have our backend server on local port which manages the main calls to an API
// Most of the work is done by our script

//Initializing the values to be used

let userKeyword;
let userDistance;
let userCategory;
let userLocation;
let userLatitude;
let userLongitude;
var googleMapsURL = "https://maps.googleapis.com/maps/api/geocode/json?";
var ipinfoURL = "https://ipinfo.io?token=32b42d235a510b";
function getCoordinatesIP() {
  ipOutput = fetch(ipinfoURL)
  .then(response => response.json())
  .then(data => console.log(data))
}

//Gets triggered on submitting the form
//We set the values of the user in this function
function trigger() {
  getCoordinatesIP();
  userKeyword = document.getElementById("keyword").value;
  userDistance = document.getElementById("distance").value;
  userCategory = document.getElementById("category").value;
  if (!document.getElementById("auto-detect").checked) {
    getCoordinatesMaps(document.getElementById("location").value);
  } else {
    getCoordinatesIP();
  }
}

function myFunction() {
  var checkBox = document.getElementById("auto-detect");
  var text = document.getElementById("location");

  if (checkBox.checked == true) {
    text.style.display = "none";
    text.removeAttribute("required");
  } else {
    text.style.display = "block";
    text.setAttribute("required");
  }
}

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  
 getCoordinatesIP();
});

function getCoordinatesMaps() {}


function trigger() {
  // let formData = new FormData(document.getElementById("main-form"))
  keyword = document.getElementById("keyword");
  alert(keyword);
  
  fetch("https://firsttry4098.uw.r.appspot.com/display?keyword=" + keyword)
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.log(error))

  //   .then(response => response.text())
  //   .then(data => console.log(data))
  //   .catch(error => console.log(error))
}
