//Here we declare map variable globally so all functions have access
var map;
var biomesLayer;
var stateLayer;
var riverLayer;
var citiesLayer;
var routes;


//Create map function
function createMap(){
//Create the map
map = L.map('map', {
  center: [10, 10],
  zoom: 4,
  minZoom: 4,
  maxZoom: 7
});

//Add OSM base tilelayer in this case watercolor
L.tileLayer('', {
        'attribution': 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

states(map)
cities(map)
rivers(map)
addablelayers(map)
};

//River Section
function rivers(map){
  var riverstyle = {
    fillColor: "#3944bc",
    color: "#3944bc",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };
  var riverLayer = new L.GeoJSON.AJAX("data/Atlantis_rivers.geojson",{
      style: riverstyle
  }).addTo(map);
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
        layer.bindTooltip(feature.properties.State);
    }
  }).addTo(map);
};

//City Section
function cities(map){
  var citiesLayer = new L.GeoJSON.AJAX("data/Atlantis_cities.geojson", {pointToLayer: function(feature, latlng){
            return citypointToLayer(feature, latlng);
             }
      }).addTo(map);
  };

function cityPopupContent(properties){
  //Using object oriented programming to create different parts of the popup
  this.properties = properties;
  this.cityname = this.properties["Burg"]
  this.population = this.properties["Population"]
  //Creates the format for the popup
  this.formatted = "<p><b>City:</b> " + this.cityname + "</p><p><b>Population:</b>" + this.population + "</p>" ;
};

function citypointToLayer(feature, latlng){
    var citystyle = {
      radius: 3,
      fillColor: "#000",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 1
    };
    var layer = L.circleMarker(latlng, citystyle);
    //Build popup content string
    var citypopupContent = new cityPopupContent(feature.properties);
    //Bind the popup to the circle marker
    layer.bindPopup(citypopupContent.formatted, {
        offset: new L.Point(0,-5)
    });

    //Return the circle marker to the L.geoJson pointToLayer option
    return layer;
};



//Overlay Layers
function addablelayers(map){
  var biomesLayer = new L.GeoJSON.AJAX("data/Atlantis_biomes.geojson");
  var routes = new L.GeoJSON.AJAX("data/Atlantis_routes.geojson");
  var mixed = {
    "Biomes": biomesLayer, // BaseMaps
    "Travel Routes": routes,
  };
  L.control.layers(null, mixed).addTo(map);
};

document.addEventListener('DOMContentLoaded',createMap)
