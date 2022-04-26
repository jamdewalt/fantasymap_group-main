//Here we declare map variable globally so all functions have access
var map;
var minValue;
var dataStats = {};
function StateStyle(feature) {
  return {
    fillColor: feature.properties.Color,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
}
var citystyle = {
  radius: 3,
  fillColor: "#000",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 1
};
var riverstyle = {
  fillColor: "#3944bc",
  color: "#3944bc",
  weight: 1,
  opacity: 1,
  fillOpacity: 1
};
//Create map function
function createMap(){
//Create the map
map = L.map('map', {
  center: [10, 10],
  zoom: 4
});

//Add OSM base tilelayer in this case watercolor
L.tileLayer('', {
        'attribution': 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

baselayers(map)
addablelayers(map)
};
function baselayers(map){
  var stateLayer = new L.GeoJSON.AJAX("data/Atlantis_states.geojson",{
      style: StateStyle
  }).addTo(map);

  var riverLayer = new L.GeoJSON.AJAX("data/Atlantis_rivers.geojson",{
      style: riverstyle
  }).addTo(map);

  var citiesLayer = new L.GeoJSON.AJAX("data/Atlantis_cities.geojson", {pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, citystyle);
      }
  }).addTo(map);
};

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
