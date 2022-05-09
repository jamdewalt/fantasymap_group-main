//Here we declare map variable globally so all functions have access
var map;
var biomesLayer;
var stateLayer;
var riverLayer;
var citiesLayer;
var routes;
var oceans;
var shallowoceans

//array for autocomplete function
var countries = ["Dypvik","Elavara","Kaldravard","Hyandell","Fiabaile","Zarthos","Mazolu","The Sunken City","Drey Leonia","Waymouth Point","Crownsport","Fort Drocaster","Skystead","Veka","Skograhelm","Caraignatra", "Mystwick","Easthaven","Jasrabad","Lochmara","Kilvar","Adderaunt","Dredgehelm"];

//Create map function
function createMap(){
//Create the map

var southWest = L.latLng(-20, -50),
    northEast = L.latLng(35, 60),
    bounds = L.latLngBounds(southWest, northEast);

map = L.map('map', {
  center: [10, 10],
  zoom: 4,
  minZoom: 4,
  maxZoom: 5,
  maxBounds: bounds
});


//Add OSM base tilelayer in this case watercolor
L.tileLayer('', {
        'attribution': 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

var popup = L.popup({
  closeButton: true,
  autoClose: true
  })
  .setLatLng(map.getBounds().getCenter())
  .setContent('<p>Welcome to Atlantis, a fantasy world visualized. Please feel free to explore!</p>')
  .openOn(map);

autocomplete(document.getElementById("myInput"), countries);
oceans(map)
shallowoceans(map)
states(map)
rivers(map)
addablelayers(map)
createLegend(map)
cities(map)

};

//River Section
function rivers(map){
  var riverstyle = {
    fillColor: "#3944bc",
    color: "#3944bc",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  };
  var riverLayer = new L.GeoJSON.AJAX("data/Atlantis_rivers.geojson",{
      style: riverstyle,onEachFeature: function (feature, layer) {
          layer.bindTooltip(feature.properties.name,{});
      }}).addTo(map);
}


// State Section
function states(map){
  function StateStyle(feature) {
    return {
      fillColor: feature.properties.Color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
  }
  var stateLayer = new L.GeoJSON.AJAX("data/Atlantis_states.geojson",{style: StateStyle
    ,onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.State,{direction: "center",permanent:true, className: 'labelstyle'});
    }
  }).addTo(map);
};

//City Section
function cities(map){
  var citiesLayer = new L.GeoJSON.AJAX("data/Atlantis_cities.geojson", {pointToLayer: function(feature, latlng){
            return citypointToLayer(feature, latlng)},
             onEachFeature: function(feature,layer)
                    {
                    layer.on("mouseover",function(e){
                        layer.setStyle({fillColor: 'green'})
                    });
                    layer.on("mouseout",function(e){
                        layer.setStyle({fillColor: '#000'});
                    });
                    }
      }).addTo(map);
  };

function cityPopupContent(properties){
  //Using object oriented programming to create different parts of the popup
  this.properties = properties;
  this.cityname = this.properties["Burg"]
  this.population = this.properties["Population"]
  this.state = this.properties["State Full Name"]
  this.pronounce = this.properties["Pronunciation info"]
  this.cityinfo = this.properties["Place info"]
  //Creates the format for the popup
  this.formatted = "<p><b>City: </b> " + this.cityname + "</p><p><b>Population: </b>" + this.population + "</p>" + "<p><b>In the State: </b>" + this.state + "</p>"+ "<p><b>Some Extra Pronunciation Information: </b>" + this.pronounce + "</p>"+ "<p><b>Fun Facts About the City: </b>" + this.cityinfo + "</p>"  ;
};


function citypointToLayer(feature, latlng){
  var capitalIcon = L.icon({
    iconUrl: 'img/capital.png',
    iconSize: [15, 15], // size of the icon
  });
    var citystyle = {
      radius: 3,
      fillColor: "#000",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 1
    };
    if (feature.properties.Capital=="capital"){
      var layer=L.marker(latlng, {icon: capitalIcon});
    } else{
      var layer = L.circleMarker(latlng, citystyle);
    }
    //Build popup content string
    var citypopupContent = new cityPopupContent(feature.properties);
    //Bind the popup to the circle marker
    layer.bindPopup(citypopupContent.formatted, {
        offset: new L.Point(0,-5)
    });

    //Return the circle marker to the L.geoJson pointToLayer option
    return layer;
};

//Shallow Ocean Section
function shallowoceans(map){
  var shallowoceansstyle = {
    fillColor: "#25c8d1",
    color: "#25c8d1",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };
  var shallowoceansLayer = new L.GeoJSON.AJAX("data/Atlantis_shallowocean.geojson",{
      style: shallowoceansstyle
  }).addTo(map);
}

//Ocean Section
function oceans(map){
  var oceansstyle = {
    fillColor: "#56acb1",
    color: "#56acb1s",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };
  var oceansLayer = new L.GeoJSON.AJAX("data/Atlantis_ocean.geojson",{
      style: oceansstyle
  }).addTo(map);
}

//Overlay Layers
function addablelayers(map){
  function biomeStyle(feature) {
    return {
      fillColor: feature.properties.Color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 1
    }
  };
  var biomesLayer = new L.GeoJSON.AJAX("data/Atlantis_biomes.geojson",{style: biomeStyle});
  var routestyle = {
    fillColor: "#1b100c",
    color: "#1b100c",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  };
  function religionStyle(feature) {
    return {
      fillColor: feature.properties.Color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 1
      
    }
  };
  var religionLayer = new L.GeoJSON.AJAX("data/Atlantis_religions.geojson",{style: religionStyle,onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.Religion,{direction: "center", permanent: true, className: 'labelstyle'});
  }});
  var routestyle = {
    fillColor: "#1b100c",
    color: "#1b100c",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  };
  function territoryStyle(feature) {
    return {
      fillColor: feature.properties.Color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 1
    }
  };
  var territoryLayer = new L.GeoJSON.AJAX("data/Atlantis_territory.geojson",{style: territoryStyle});

  var routes = new L.GeoJSON.AJAX("data/Atlantis_routes.geojson",{style: routestyle,onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.id,{});
  }});
  var mixed = {
    "Biomes": biomesLayer, // BaseMaps
    "Travel Routes": routes,
    "Religions": religionLayer,
    "Before Split Territories": territoryLayer,
  };
  L.control.layers(null, mixed).addTo(map);
};

//autocomplete function for search bar
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
    new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
});
}

function createLegend(map){
  var LegendControl = L.Control.extend({
      options: {
          position: "bottomright"
      },
      onAdd: function(){
          var container = L.DomUtil.create('div', 'second-legend-control-container');
          var svg = '<svg id = "attribute-legend" width = "200px" height = "400px">';

          //cities circle
          var circles = ["black"];
          var radius = 3;
          var cy = 30 - radius;
          svg += '<circle class = "legend-circle" id = "' + circles + '"r="' + radius + '"cy="' + cy + '" fill = "#000000" fill-opacity = "1" stroke = "#000000" cx = "15" />';
          var textY = 31;
          svg += '<text id="' + circles + '"text" x="37" y="' + textY + '">' + " Cities" + '</text>';

          //biome colors and labeling
          var biomeType = ["Glacier", "Mountain", "Tundra", "Grassland", "Taiga", "Savanna", "Deciduous Forest", "Temperate Rainforest", "Tropical Forest", "Hot Desert", "Wetland", "Tropical Rainforest", "Volcanic"];
          var biomeColor = ["#d5e7eb", "#661d00", "#96784b", "#c8d68f", "#4b6b32", "#d2d082", "#29bc56", "#409c43", "#b6d95d", "#fbe79f", "#0b9131", "#7dcb35", "#ff7648"];

          //loops to add biomes to the legend
          for(i=0; i<biomeType.length; i++) {

            var textY = 335 - 8-(i*20);
            svg += '<text id="' + circles + '"text" x="37" y="' + textY + '">' + biomeType[i] + '</text>';

          }
          //loops to add colored circles next to biome type
          for(var j=0; j<biomeColor.length; j++){

            var radius = 8;
            var cy = 330- radius-(j*20);
            svg += '<circle class = "legend-circle" id = "' + biomeColor[j] + '"r="' + radius + '"cy="' + cy + '" fill ="'+ biomeColor[j] +'"fill-opacity = "1" stroke = "#000000" cx = "16" />';

          }
          //river line and text
          svg += '<line x1="6" y1="10" x2="26" y2="10" style="stroke: #3944bc;"/>'
          svg += '<text id="' + circles + '"text" x="37" y="' + 14 + '">' + "Rivers" + '</text>';

          //capitol icon      
          svg += '<image href="img/capital.png" height="15" width="15" x="8" y="' + 36 + '"/>'
          svg += '<text id="' + circles + '"text" x="37" y="' + 48 + '">' + "Capitols" + '</text>';

          svg += "</svg>";

          container.insertAdjacentHTML('beforeend', svg);

          return container;
      }
  });

  map.addControl(new LegendControl());

};

document.addEventListener('DOMContentLoaded',createMap)
