var mymap = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.googleapis.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(mymap);

getDetails();

var search = document.getElementsByClassName("searchButton")[0];

search.onclick = getDetails;


function getDetails(){
    var IP = document.getElementsByClassName("search-input")[0].value;

    // var endpoint = "https://geo.ipify.org/api/v2/country,city?apiKey=at_ABDJtwpNitW8FQLs9wWW5FIsgc6Wg&ipAddress=" + IP;
    // fetch('https://api.ipify.org?format=json').then(response => {})

    fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_ABDJtwpNitW8FQLs9wWW5FIsgc6Wg&ipAddress=" + IP).then(response => {
        return response.json();
    }).then(data => {

        var loc = document.getElementsByClassName("location-result")[0];
        var zone = document.getElementsByClassName("timezone-result")[0];
        var ISP = document.getElementsByClassName("ISP-result")[0];
        var Ip = document.getElementsByClassName("IP-result")[0];

        ISP.innerHTML = data.isp;
        loc.innerHTML = data.location.country + " , " + data.location.region;
        zone.innerHTML = data.location.city + " , " + data.location.timezone;
        Ip.innerHTML = data.ip;

        var markerIcon = L.icon({
            iconUrl: 'images/icon-location.svg', 
            iconSize: [32, 43], 
            iconAnchor: [16, 32], 
        });

        mymap.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                mymap.removeLayer(layer);
            }
        });

        var latitude = data.location.lat;
        var longitude = data.location.lng;
        L.marker([latitude, longitude],{ icon: markerIcon }, 10 ).addTo(mymap); 
        // L.marker([0,0,13]).addTo(mymap);
        mymap.setView([latitude, longitude], 14).addTo(mymap);
        marker.bindPopup("<b>${data.location.city}, ${data.location.country}").openPopup();

    })
}