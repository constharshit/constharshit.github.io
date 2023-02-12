//First we get values from the user
//We will pass the values input to our server Flask
//We use a GET request by first creating a endpoint
// We have our backend server on local port which manages the main calls to an API
// Most of the work is done by our script

//Initializing the values to be used
///////////////////////////////////
var userKeyword;
var userDistance;
var userCategory;
var userLocation;
var locationChecked;
var segmentID;
var finalLatitude;
var finalLongitude;
const defaultDistance = 10;
// var disabled = true;

/////////////////////////////////////////

function clearDynamicData() {
  if (document.getElementById("nothing").classList.contains("nothing")) {
    document.getElementById("nothing").classList.remove("nothing");
  }
  if (document.contains(document.getElementById("results"))) {
    document.getElementById("results").innerHTML = "";
  }
  if (document.contains(document.getElementById("headings"))) {
    document.getElementById("headings").innerHTML = "";
  }
  if (document.contains(document.getElementById("nothing"))) {
    document.getElementById("nothing").innerHTML = "";
  }
  if (
    document.getElementById("container-3").classList.contains("container-3")
  ) {
    document.getElementById("container-3").classList.remove("container-3");
  }
  if (
    document.getElementById("container-2").classList.contains("container-2")
  ) {
    document.getElementById("container-2").classList.remove("container-2");
  }
  if (document.getElementById("helperFor").classList.contains("helperFor")) {
    document.getElementById("helperFor").classList.remove("helperFor");
  }

  if (document.contains(document.getElementById("concertDetails"))) {
    document.getElementById("concertDetails").innerHTML = "";
  }
  if (document.contains(document.getElementById("seatLayout"))) {
    document.getElementById("seatLayout").innerHTML = "";
  }
  if (document.contains(document.getElementById("nameOfConcert"))) {
    document.getElementById("nameOfConcert").innerHTML = "";
  }
  if (document.contains(document.getElementById("showVenueButton"))) {
    document.getElementById("showVenueButton").innerHTML = "";
  }
  if (document.contains(document.getElementById("top"))) {
    document.getElementById("top").innerHTML = "";
  }
  if (document.contains(document.getElementById("left"))) {
    document.getElementById("left").innerHTML = "";
  }
  if (document.contains(document.getElementById("right"))) {
    document.getElementById("right").innerHTML = "";
  }
  if (
    document.getElementById("container-4").classList.contains("container-4")
  ) {
    document.getElementById("container-4").classList.remove("container-4");
  }
  if (
    document.getElementById("verticalLine").classList.contains("verticalLine")
  ) {
    document.getElementById("verticalLine").classList.remove("verticalLine");
  }
  if (
    document.getElementById("wrapperBorder").classList.contains("wrapperBorder")
  ) {
    document.getElementById("wrapperBorder").classList.remove("wrapperBorder");
  }
  if (document.getElementById("middle")) {
    document.getElementById("middle").innerHTML = "";
  }
  if (document.getElementById("container-4").classList.contains("change1")) {
    document.getElementById("container-4").classList.remove("change1");
  }
}

function trigger() {
  clearDynamicData();
  // document
  //   .getElementById("searchButton")
  //   .addEventListener("click", disableButton);
  // setTimeout(function () {
  //   document.getElementById("searchButton").disabled = false;
  // }, 1000);

  document.getElementById("headings").innerHTML = "";

  var googleMapsURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var ipinfoURL = "https://ipinfo.io?token=32b42d235a510b";

  userKeyword = document.getElementById("keyword").value;

  userCategory = document.getElementById("category").value;
  userDistance = document.getElementById("distance").value;
  locationChecked = document.getElementById("auto-detect").checked;
  userLocation = document.getElementById("location").value;
  if (userKeyword != "" && (locationChecked || userLocation != "")) {
    if (!userDistance) {
      userDistance = defaultDistance;
    }
    if (userCategory == "music") {
      segmentID = "KZFzniwnSyZfZ7v7nJ";
    }
    if (userCategory == "sports") {
      segmentID = "KZFzniwnSyZfZ7v7nE";
    }
    if (userCategory == "artsandtheatre") {
      segmentID = "KZFzniwnSyZfZ7v7na";
    }
    if (userCategory == "film") {
      segmentID = "KZFzniwnSyZfZ7v7nn";
    }
    if (userCategory == "miscellaneous") {
      segmentID = "KZFzniwnSyZfZ7v7n1";
    }
    if (userCategory == "default") {
      segmentID = "";
    }
    console.log(
      "User-values",
      userKeyword,
      userCategory,
      userDistance,
      "locationCheck->",
      locationChecked,
      location,
      segmentID
    );
    var fetchIP = fetch(ipinfoURL);
    fetchIP
      .then((res) => res.json())
      .then(function (response) {
        console.log("IPAPiResponse", response);
        console.log("-------------");
        var loc = response.loc.split(",");
        var userLatitudeIP = loc[0];
        var userLongitudeIP = loc[1];
        console.log("Lattitudes based on IP", userLatitudeIP, userLongitudeIP);
        if (locationChecked) {
          clearDynamicData();
          callServer(userLatitudeIP, userLongitudeIP);
        }
      });

    if (!locationChecked) {
      googleMapsURL =
        googleMapsURL +
        userLocation +
        "&key=AIzaSyAwWx8kdZRnHtyfARa1W8xMCSltVp8m-_k";
      var fetchCoordinates = fetch(googleMapsURL);
      fetchCoordinates
        .then((response) => response.json())
        .then(function (theData) {
          console.log("GoogleMaps ", theData);
          console.log("-------------");
          if (theData.results.length > 0) {
            var latData = theData.results[0].geometry.location.lat;
            var longData = theData.results[0].geometry.location.lng;
            console.log("Latitudes of Google Maps", latData, longData);
            clearDynamicData();
            callServer(latData, longData);
          } else {
            if (
              document
                .getElementById("container-2")
                .classList.contains("container-2")
            ) {
              document
                .getElementById("container-2")
                .classList.remove("container-2");
            }
            clearDynamicData();
            document.getElementById("container-2").classList.add("container-2");
            document.getElementById("nothing").classList.add("nothing");
            var noOutput = document.getElementById("nothing");
            noOutput.innerHTML = "<h3>No Records found</h3>";
          }
        });
    }
  }
}

function callServer(lat, long) {
  if (document.contains(document.getElementById("headings"))) {
    document.getElementById("headings").innerHTML = "";
  }
  console.log("lat to server function is", lat);
  console.log("long to server function is", long);
  var serverURL = "https://trojansrock.wl.r.appspot.com/display?";
  // var serverURL = "https://trojansrock.wl.r.appspot.com/display?";
  finalLatitude = lat;
  finalLongitude = long;
  serverURL =
    serverURL +
    "keyword=" +
    userKeyword +
    "&category=" +
    segmentID +
    "&distance=" +
    userDistance +
    "&latitude=" +
    finalLatitude +
    "&longitude=" +
    finalLongitude;
  console.log("testing URL to server", serverURL);

  var dataToServer = fetch(serverURL);
  dataToServer
    .then((response) => response.json())
    .then(function (finalData) {
      console.log("Server Response");
      console.log(finalData);

      console.log("number of results", finalData["result"]);
      if (finalData["result"].length > 0) {
        if (document.getElementById("nothing").classList.contains("nothing")) {
          document.getElementById("nothing").classList.remove("nothing");
        }
        if (
          document
            .getElementById("container-2")
            .classList.contains("container-2")
        ) {
          document
            .getElementById("container-2")
            .classList.remove("container-2");
        }
        var finalResults = finalData["result"];
        var headingRow = document.createElement("tr");
        headingRow.innerHTML =
          "<th>Date</th><th>Icon</th><th onclick='" +
          "sortTable(2)" +
          "'>Event</th><th onclick='" +
          "sortTable(3)" +
          "'>Genre</th><th onclick='" +
          "sortTable(4)" +
          "'>Venue</th>";
        document.getElementById("headings").innerHTML = "";
        clearDynamicData();
        document.getElementById("container-2").classList.add("container-2");

        document.getElementById("headings").appendChild(headingRow);
        var count = 0;
        if (finalResults.length > 20) {
          count = 20;
        } else {
          count = finalResults.length;
        }
        for (var i = 0; i < count; i++) {
          var nameOfTheEvent = finalResults[i]["name"];
          var imageURL = finalResults[i]["imageURL"];
          var localDate = finalResults[i]["localDate"];
          var localTime = finalResults[i]["localTime"];
          var genre = finalResults[i]["genre"];
          var venueName = finalResults[i]["venueName"];
          var idOfEvent = finalResults[i]["id"];
          var tempRow = document.createElement("tr");
          var tempRowData =
            "<td id='date'>" + localDate + "<br>" + localTime + "</td>";
          tempRowData +=
            "<td id='logo'><img id='logoImg' src=" + imageURL + "></td>";
          tempRowData +=
            "<td id='event' class='selectable' onClick=seatMap('" +
            idOfEvent +
            "')><p>" +
            nameOfTheEvent +
            "</p></td>";
          if (genre == "undefined" || genre == "Undefined") {
            tempRowData += "<td id='genre'>" + " " + "</td>";
          } else {
            tempRowData += "<td id='genre'>" + genre + "</td>";
          }
          tempRowData += "<td id='venue'>" + venueName + "</td>";
          tempRow.innerHTML = tempRowData;
          document.getElementById("results").appendChild(tempRow);
        }
      } else {
        if (
          document
            .getElementById("container-2")
            .classList.contains("container-2")
        ) {
          document
            .getElementById("container-2")
            .classList.remove("container-2");
        }
        document.getElementById("container-2").classList.add("container-2");
        document.getElementById("nothing").classList.add("nothing");
        var noOutput = document.getElementById("nothing");
        noOutput.innerHTML = "<h3>No Records found</h3>";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//this table has been used from https://codepen.io/andrese52/pen/ZJENqp

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("theTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //Change i=0 if you have the header th a separate table.
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      console.log("xxx", x.text);
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function seatMap(eventID) {
  if (document.getElementById("container-4").classList.contains("change1")) {
    document.getElementById("container-4").classList.remove("change1");
  }
  if (document.contains(document.getElementById("nothing"))) {
    document.getElementById("nothing").innerHTML = "";
  }
  if (
    document.getElementById("container-3").classList.contains("container-3")
  ) {
    document.getElementById("container-3").classList.remove("container-3");
  }
  if (document.getElementById("helperFor").classList.contains("helperFor")) {
    document.getElementById("helperFor").classList.remove("helperFor");
  }

  if (document.contains(document.getElementById("concertDetails"))) {
    document.getElementById("concertDetails").innerHTML = "";
  }
  if (document.contains(document.getElementById("seatLayout"))) {
    document.getElementById("seatLayout").innerHTML = "";
  }
  if (document.contains(document.getElementById("nameOfConcert"))) {
    document.getElementById("nameOfConcert").innerHTML = "";
  }
  if (document.contains(document.getElementById("showVenueButton"))) {
    document.getElementById("showVenueButton").innerHTML = "";
  }
  if (document.contains(document.getElementById("top"))) {
    document.getElementById("top").innerHTML = "";
  }
  if (document.contains(document.getElementById("left"))) {
    document.getElementById("left").innerHTML = "";
  }
  if (document.contains(document.getElementById("right"))) {
    document.getElementById("right").innerHTML = "";
  }
  if (
    document.getElementById("container-4").classList.contains("container-4")
  ) {
    document.getElementById("container-4").classList.remove("container-4");
  }
  if (
    document.getElementById("verticalLine").classList.contains("verticalLine")
  ) {
    document.getElementById("verticalLine").classList.remove("verticalLine");
  }
  if (
    document.getElementById("wrapperBorder").classList.contains("wrapperBorder")
  ) {
    document.getElementById("wrapperBorder").classList.remove("wrapperBorder");
  }

  if (document.getElementById("middle")) {
    document.getElementById("middle").innerHTML = "";
  }
  var eventURL = "https://trojansrock.wl.r.appspot.com/event?";
  // var eventURL = "https://trojansrock.wl.r.appspot.com/";
  eventURL = eventURL + "eventID=" + eventID;
  var dataToServer = fetch(eventURL);
  dataToServer
    .then((response) => response.json())
    .then(function (finalData) {
      console.log("Server Response");
      console.log(finalData);
      console.log("number of results", finalData["result_event"].length);
      if (finalData["result_event"].length > 0) {
        // var color;
        // if(finalResults[0]["nameOfEvent"] == "onsale" )
        // {
        //   color="green";
        // }
        var finalResults = finalData["result_event"];
        document.getElementById("container-3").classList.add("container-3");
        document.getElementById("helperFor").classList.add("helperFor");

        var leftData = document.getElementById("concertDetails");
        var rightData = document.getElementById("seatLayout");
        var openDiv = "<div>";
        var closeDiv = "</div>";
        var leftHTML =
          openDiv +
          "<h3>Date</h3>" +
          "<p>" +
          finalResults[0]["localDate"] +
          " " +
          finalResults[0]["localTime"] +
          "</p>" +
          closeDiv; //Date field
        if (finalResults[0]["upcomingEventsLink"]) {
          leftHTML += openDiv + "<h3>Artist/Team</h3>";
          leftHTML +=
            "<a id='artistLink' target='_blank' href='" +
            finalResults[0]["upcomingEventsLink"] +
            "'>" +
            finalResults[0]["nameOfEvent"] +
            "</a>" +
            closeDiv;
        }
        leftHTML += openDiv + "<h3>Venue</h3>";
        leftHTML += "<p>" + finalResults[0]["venueName"] + "</p>" + closeDiv;
        if (
          finalResults[0]["segment"] ||
          finalResults[0]["genre"] ||
          finalResults[0]["subGenre"] ||
          finalResults[0]["type"] ||
          finalResults[0]["subType"]
        ) {
          leftHTML += openDiv + "<h3>Genres</h3>";

          leftHTML += "<p>";
          if (
            finalResults[0]["segment"] &&
            finalResults[0]["segment"] != "undefined" &&
            finalResults[0]["segment"] != "Undefined"
          ) {
            leftHTML += finalResults[0]["segment"];
          }
          if (
            finalResults[0]["genre"] &&
            finalResults[0]["genre"] != "undefined" &&
            finalResults[0]["genre"] != "Undefined"
          ) {
            leftHTML += " | " + finalResults[0]["genre"];
          }
          if (
            finalResults[0]["subGenre"] &&
            finalResults[0]["subGenre"] != "undefined" &&
            finalResults[0]["subGenre"] != "Undefined"
          ) {
            leftHTML += " | " + finalResults[0]["subGenre"];
          }
          if (
            finalResults[0]["type"] &&
            finalResults[0]["type"] != "undefined" &&
            finalResults[0]["type"] != "Undefined"
          ) {
            leftHTML += " | " + finalResults[0]["type"];
          }
          if (
            finalResults[0]["subType"] &&
            finalResults[0]["subType"] != "undefined" &&
            finalResults[0]["subType"] != "Undefined"
          ) {
            leftHTML += " | " + finalResults[0]["subType"];
          }
          leftHTML += "</p>" + closeDiv;
        }

        if (finalResults[0]["minPrice"] || finalResults[0]["maxPrice"]) {
          leftHTML += openDiv + "<h3>Price Ranges</h3>";
          leftHTML += "<p>";
          if (finalResults[0]["minPrice"]) {
            leftHTML += finalResults[0]["minPrice"];
          }
          if (finalResults[0]["maxPrice"]) {
            leftHTML += " - " + finalResults[0]["maxPrice"];
          }
          leftHTML += " USD</p>" + closeDiv;
        }
        var color = "orange";
        var status;
        if (finalResults[0]["ticketStatus"] == "onsale") {
          color = "green";
          status = "On Sale";
        }
        if (finalResults[0]["ticketStatus"] == "offsale") {
          color = "red";
          status = "Off Sale";
        }
        if (finalResults[0]["ticketStatus"] == "cancelled") {
          color = "black";
          status = "Cancelled";
        }
        if (finalResults[0]["ticketStatus"] == "postponed") {
          color = "orange";
          status = "Postponed";
        }
        if (finalResults[0]["ticketStatus"] == "rescheduled") {
          color = "orange";
          status = "Rescheduled";
        }

        leftHTML += openDiv + "<h3>Ticket Status</h3>";
        leftHTML += "<p id='" + color + "'>" + status + "</p>" + closeDiv;
        leftHTML += openDiv + "<h3>Buy Ticket At:</h3>";
        leftHTML +=
          "<a id='bookingLink' target='_blank' href=' " +
          finalResults[0]["bookingURL"] +
          "'>Ticketmaster</a>" +
          closeDiv;
        leftData.innerHTML = leftHTML;
        console.log("concertDetails HTML", leftHTML);

        if (finalResults[0]["seatmapUrl"]) {
          rightHTML =
            "<img id='seatmap' src=" + finalResults[0]["seatmapUrl"] + ">";
          rightData.innerHTML = rightHTML;
        }

        headerHTML = "<h2>" + finalResults[0]["fullName"] + "</h2>";
        document.getElementById("nameOfConcert").innerHTML = headerHTML;
        var name = finalResults[0]["venueName"];

        var venueHTML =
          "<button>Show Venue Details</button>" +
          "<div style='cursor: pointer;' onclick=\"venueDetails('" +
          name +
          "')\" id='#arrowHead'>&nbsp;" +
          closeDiv;
        console.log("showVenueHTML=", venueHTML);
        document.getElementById("showVenueButton").innerHTML = venueHTML;
        // scroll functionality
        const scrollingElement = document.scrollingElement || document.body;
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function venueDetails(venueName) {
  if (document.contains(document.getElementById("top"))) {
    document.getElementById("top").innerHTML = "";
  }
  if (document.contains(document.getElementById("left"))) {
    document.getElementById("left").innerHTML = "";
  }
  if (document.contains(document.getElementById("right"))) {
    document.getElementById("right").innerHTML = "";
  }
  if (
    document.getElementById("container-4").classList.contains("container-4")
  ) {
    document.getElementById("container-4").classList.remove("container-4");
  }
  if (document.getElementById("container-4").classList.contains("change1")) {
    document.getElementById("container-4").classList.remove("change1");
  }
  if (
    document.getElementById("verticalLine").classList.contains("verticalLine")
  ) {
    document.getElementById("verticalLine").classList.remove("verticalLine");
  }
  if (
    document.getElementById("wrapperBorder").classList.contains("wrapperBorder")
  ) {
    document.getElementById("wrapperBorder").classList.remove("wrapperBorder");
  }

  if (document.contains(document.getElementById("showVenueButton"))) {
    document.getElementById("showVenueButton").innerHTML = "";
  }
  if (document.getElementById("middle")) {
    document.getElementById("middle").innerHTML = "";
  }

  console.log("data in showVenue", venueName);
  var venueURL =
    "https://trojansrock.wl.r.appspot.com/venue?venueName=" + venueName;
  var dataToServer = fetch(venueURL);
  dataToServer
    .then((response) => response.json())
    .then(function (finalData) {
      console.log("Server Response");
      console.log(finalData);
      console.log("number of results ooo", finalData["result_event"].length);
      var finalResults = finalData["result_event"][0];
      var openDiv = "<div>";
      var closeDiv = "</div>";
      var space =
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

      document.getElementById("verticalLine").classList.add("verticalLine");
      document.getElementById("wrapperBorder").classList.add("wrapperBorder");
      if (finalResults["venueLOGO"]) {
        document.getElementById("container-4").classList.add("container-4");
        document.getElementById("wrapperBorder").style.gridTemplateRows =
          "20% 30% 50%";
      } else {
        document.getElementById("container-4").classList.add("change1");

        document.getElementById("wrapperBorder").style.gridTemplateRows =
          "30% 0% 70%";
      }

      topHTML =
        openDiv +
        "<h2>&nbsp;&nbsp;" +
        finalResults["name"] +
        "&nbsp;&nbsp;</h2><hr>" +
        closeDiv;
      document.getElementById("top").innerHTML = topHTML;

      leftHTML =
        openDiv +
        "<p><strong>Address: </strong>" +
        finalResults["address"] +
        "<br>" +
        space +
        finalResults["city"] +
        ", " +
        finalResults["stateCode"] +
        "<br>" +
        space +
        finalResults["postalCode"] +
        "</p>" +
        closeDiv;
      leftHTML +=
        openDiv +
        "<a id='googleMaps' target='_blank' href='https://www.google.com/maps/search/?api=1&query=" +
        finalResults["name"] +
        "'>Open in Google Maps</a>" +
        closeDiv;
      document.getElementById("left").innerHTML = leftHTML;
      if (finalResults["venueLOGO"]) {
        middleHTML =
          "<img id='venueLOGO' src=" + finalResults["venueLOGO"] + ">";
        document.getElementById("middle").innerHTML = middleHTML;
      }

      rightHTML =
        "<a id='upcomingEvent' target='_blank' href='" +
        finalResults["upcomingEvents"] +
        "'>More events at this venue</a>";
      document.getElementById("right").innerHTML = rightHTML;
      const scrollingElement = document.scrollingElement || document.body;
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    })
    .catch((error) => {
      console.log(error);
    });
}

function clearAll() {
  clearDynamicData();
  document.getElementById("keyword").value = "";
  document.getElementById("distance").value = "";
  document.getElementById("category").value = "default";
  document.getElementById("auto-detect").checked = false;
  document.getElementById("location").value = "";
  document.getElementById("location").style.display = "block";
  myFunction();
}

function myFunction() {
  var checkBox = document.getElementById("auto-detect");
  var text = document.getElementById("location");

  if (checkBox.checked == true) {
    text.style.display = "none";
    text.removeAttribute("required");
  } else {
    text.style.display = "block";

    text.setAttribute("required", "");
  }
}
