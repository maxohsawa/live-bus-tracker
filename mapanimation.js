let mapDiv = document.getElementById('map');
mapDiv.style.width = window.innerWidth + 'px';
mapDiv.style.height = window.innerHeight + 'px';

mapboxgl.accessToken = 'pk.eyJ1IjoibWF4b2hzYXdhIiwiYSI6ImNrb245ODZzejBqdTEycG5ycmZleDd3MjgifQ.SjZurMEWLiL31dhFqONGgg';

var map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [-71.091542, 42.358862],
    zoom: 13
});

var markers = [];

async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

async function run(){
  
    const locations = await getBusLocations();
    // console.log(new Date());
    // console.log('longitude: ' + locations[0].attributes.longitude);
    // console.log('latitude: ' + locations[0].attributes.latitude)

    locations.forEach( (bus, i) => {
        markers[i].setLngLat({
            lng: bus.attributes.longitude,
            lat: bus.attributes.latitude
        }).addTo(map);
    });

    // marker.setLngLat({
    //     lng: locations[0].attributes.longitude, 
    //     lat: locations[0].attributes.latitude
    // });

    setTimeout(run, 15000);
}

async function initialize(){

    const locations = await getBusLocations();

    locations.forEach( (bus, i) => {
        markers.push(new mapboxgl.Marker().setLngLat({
            lng: locations[i].attributes.longitude,
            lat: locations[i].attributes.latitude
        }).addTo(map));
    });

}

initialize();

run();