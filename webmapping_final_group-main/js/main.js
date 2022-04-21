//Here we declare map variable globally so all functions have access
var map;
var minValue;
var dataStats = {};

//Create map function
function createMap(){

  mapboxgl.accessToken = 'pk.eyJ1IjoiZXNhbTIwIiwiYSI6ImNsMW8xZGwzNDBkNWczY210djNvYml1OXUifQ.L_PC7U15MvJfggwW1XvNlg';
  const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/esam20/cl288aokd003z14nwn3tjmy6u', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
  });
  //Call getData function
  getData(map);
};
//Import GeoJSON data
function getData(map){
       //Load the data
       fetch("data/Atlantis.geojson")
           .then(function(response){
               return response.json();
           })
           .then(function(json){
                //Create an attributes array and call other functions
               //calcStats(json);
               var attributes = processData(json);
               //minValue = calculateMinValue(json);
              // createPropSymbols(json, attributes);
               //createSequenceControls(attributes);
               //createLegend(attributes);
           })
   };
   function processData(data){
       //Empty array to hold attributes
       var attributes = [];

       //Properties of the first feature in the dataset
       var properties = data.features[0].properties;

       //Push each attribute name into attributes array
       for (var attribute in properties){
           //Only take attributes with Tourist values
           if (attribute.indexOf("Tour") > -1){
               attributes.push(attribute);
           };
       };

       //Check result
       console.log(attributes);

       return attributes;
   };

document.addEventListener('DOMContentLoaded',createMap)
