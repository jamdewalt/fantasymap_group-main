//Here we declare map variable globally so all functions have access
var map;
var minValue;
var dataStats = {};

//Create map function
function createMap(){
/*
  mapboxgl.accessToken = 'pk.eyJ1IjoiZXNhbTIwIiwiYSI6ImNsMW8xZGwzNDBkNWczY210djNvYml1OXUifQ.L_PC7U15MvJfggwW1XvNlg';
  map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/esam20/cl288aokd003z14nwn3tjmy6u', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
  });
*/
//Create the map
map = L.map('map', {
  center: [9, 10],
  zoom: 2
});

//Add OSM base tilelayer in this case watercolor
L.tileLayer('', {
        'attribution': 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

var stateLayer = new L.GeoJSON.AJAX("data/Atlantis_states.geojson");
stateLayer.addTo(map);
var riverLayer = new L.GeoJSON.AJAX("data/Atlantis_rivers.geojson");
riverLayer.addTo(map);
var citiesLayer = new L.GeoJSON.AJAX("data/Atlantis_cities.geojson");
citiesLayer.addTo(map);
var biomesLayer = new L.GeoJSON.AJAX("data/Atlantis_biomes.geojson");
biomesLayer.addTo(map);

};

/*
//Import GeoJSON data
function getData(map){
       //Load the data
       fetch("data/Atlantis_cities.geojson")
           .then(function(response){
               return response.json();
           })
           .then(function(json){
                //Create an attributes array and call other functions
               //calcStats(json);
               //var attributes = processData(json);
               //minValue = calculateMinValue(json);
               createPropSymbols(json);
               //createSequenceControls(attributes);
               //createLegend(attributes);
           })
   };
   function pointToLayer(latlng){
       //Create circle marker layer
       var layer = L.marker(latlng);

       //Return the circle marker to the L.geoJson pointToLayer option
       return layer;
   };
   function createPropSymbols(data){
       //create a Leaflet GeoJSON layer and add it to the map
       L.geoJson(data, {
         pointToLayer: function(latlng){
             return pointToLayer(latlng);
              }
       }).addTo(map);
   };
*/
document.addEventListener('DOMContentLoaded',createMap)
