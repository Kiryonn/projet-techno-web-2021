document.getElementById("carte").style.height = screen.height/2 + "px"

let mymap = L.map('carte').setView([43.9277552, 2.147899], 13)

L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZWNsYWlyODEiLCJhIjoiY2trd2xpN2JoMGh2bjJ4bzRjdm44bWh3YyJ9.BwA8e30C3b5EX37ZPxd-UA'
    }
).addTo(mymap)




let maison = L.icon({iconUrl: "res/img/home.png", popupAnchor:  [16, -10]})

let group = L.markerClusterGroup()

marqueurs.forEach(element => {
    // let point = L.marker([element.lat, element.lng], {icon: maison}).addTo(mymap); // sans cluster
    let point = L.marker([element.latitude, element.longitude], {icon: maison})  // cluster
    group.addLayer(point)  // cluster
})
mymap.addLayer(group)  // cluster


function nbEtoiles(nb){
    res = "";
    while(nb > 0){
        if(nb === 0.5){
            res += '<i class="star half icon"></i>';
            nb -= 0.5;
        } else{
            res += '<i class="star icon"></i>';
            nb -= 1.0;
        }
    }
    return res;
};