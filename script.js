var mymap = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.googleapis.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(mymap);


// function getUserLocation(){

//     if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(function(position) {
//             var latitude = position.coords.latitude;
//             var longitude = position.coords.longitude;
    
//             // Fetch additional location details using IP geolocation service
//             fetch(`https://geo.ipify.org/api/v1?apiKey=YOUR_IPAPI_KEY&lat=${latitude}&lon=${longitude}`)
//                 .then(response => response.json())
//                 .then(locationData => {
//                     var ipAddress = locationData.ip;
//                     var city = locationData.location.city;
//                     var country = locationData.location.country;
    
//                     // Display IP address, city, and country
//                     document.getElementsByClassName("IP-result")[0].innerHTML = ipAddress;
//                     document.getElementsByClassName("locaton-result")[0].innerHTML = city;
    
//                     // Add a marker to the map
//                     var marker = L.marker([latitude, longitude]).addTo(mymap);
//                     mymap.setView([latitude, longitude], 12);
//                 })
//                 .catch(error => console.error('Error fetching location data:', error));
//         });
//     } else {
//         console.log("Geolocation is not available in this browser.");
//     }
// }





var search = document.getElementsByClassName("searchButton")[0];

search.onclick = () => {
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

        var lat = data.location.lat;
        var lng = data.location.lng;
        mymap.setView([lat, lng], -13); 
        L.marker([lat, lng], 10).addTo(mymap); 
        // L.marker([0,0,13]).addTo(mymap);
        mymap.setView([lat, lng], 15).addTo(mymap);

    })
}