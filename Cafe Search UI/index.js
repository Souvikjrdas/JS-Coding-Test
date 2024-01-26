let ele = document.getElementById("div1");
let p = document.createElement("p");
let userInputElement = document.getElementById("searchCafe");
let tableElement = null;
const cafeNamesList = [];
const cafeLocationList = [];
const cafeList = [];
userInputElement.addEventListener("keyup", filterCafeList);

function getCafeList() {
  //GET request to fetch the Cafe Names
  fetch(
    "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json"
  )
    .then((result) => {
      return result.json();
    })
    .then((cafeNames) => {
      cafeNames.cafes.forEach((ele) => {
        cafeNamesList.push(ele);
      });

      //GET request to fetch the Cafe location details

      fetch(
        "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json"
      )
        .then((places) => {
          return places.json();
        })
        .then((cafePlaces) => {
          cafePlaces.places.forEach((location) => {
            cafeLocationList.push(location);
          });

          //call function to create a table based on the fetched data
          createTableCafelist(cafeNamesList);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

//create Table using Cafe data
function createTableCafelist(cafeNames) {
  let cafeNamesWithLocation = [];

  //consist of cafe names and their location
  cafeNamesWithLocation = cafeNames.map((cafe) => {
    let place = cafeLocationList.find(function (element) {
      return element.id == this;
    }, cafe.location_id);
    if (place !== undefined)
      return {
        name: cafe.name,
        street_no: place.street_no,
        locality: place.locality,
        postal_code: place.postal_code,
        lat: place.lat,
        long: place.long,
      };
  });

  if (cafeNamesWithLocation.length != 0) {
    //create table to display cafe list
    if (tableElement != null) {
      tableElement.remove();
    }
    p.remove();
    tableElement = document.createElement("table");
    tableElement.className =
      "table table-sm table-striped table-dark table-hover table-bordered";
    ele.append(tableElement);
    let tableHead = document.createElement("thead");
    tableElement.append(tableHead);
    tableHead.insertAdjacentHTML(
      "beforeend",
      `<th>Name</th>
        <th>Locality</th>
        <th>Street No</th>
        <th>Postal Code</th>`
    );
    let tableBody = document.createElement("tbody");
    tableElement.append(tableBody);
    cafeNamesWithLocation.forEach((cafeNamesWithLocationItems) => {
      tableBody.insertAdjacentHTML(
        "beforeend",
        `<tr>
            <td>${cafeNamesWithLocationItems.name}</td>
            <td>${cafeNamesWithLocationItems.locality}</td>
            <td>${cafeNamesWithLocationItems.street_no}</td>
            <td>${cafeNamesWithLocationItems.postal_code}</td>
        </tr>`
      );
    });
  } else {
    tableElement.remove();
    p.remove();
    p.innerText = "Sorry! No record found";
    ele.append(p);
    console.log("No data");
  }
}

//filter cafe results based on the user input keyword
function filterCafeList() {
  let cafeNames = cafeNamesList;
  let userInput = userInputElement.value.trim();

  //filter based on user input
  if (userInput != "") {
    cafeNames = cafeNamesList.filter((item) => {
      return item.name.toLowerCase().includes(userInput.toLowerCase());
    });
  }
  createTableCafelist(cafeNames);
}

//fetch API request to get the cafe names and location when the page loads.
getCafeList();
