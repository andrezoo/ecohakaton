
let map = document.getElementById('map')

let ma = [];

map.style.width = window.innerWidth
map.style.height = window.innerHeight

window.addEventListener('resize', function(event) {
    let map = document.getElementById('map')
    map.style.width = window.innerWidth
    map.style.height = window.innerHeight
}, true);

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    console.log('Ваше текущее местоположение:');
    console.log(`Широта: ${crd.latitude}`);
    console.log(`Долгота: ${crd.longitude}`);
    console.log(`Плюс-минус ${crd.accuracy} метров.`);
};

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);

DG.then(function () {
    map = DG.map('map', {
        center: [51.16866, 71.47268],
        zoom: 14,
        zoomControl: false,
        fullscreenControl: false
    });

    var req = new XMLHttpRequest();
    req.onload = function(){
        var lines = this.responseText.split("\n")
        while(ma.length){
            ma[ma.length-1].removeFrom(map);
            ma.pop();
        }
        for (let index = 0; index < lines.length; index++) {
            const element = lines[index].split("\r");
            const addr = element[0];
            const lat = element[1];
            const lng = element[2];
            ma.push(DG.marker([parseFloat(lat), parseFloat(lng)]));//            addTo(map).bindPopup(addr);
            ma[ma.length-1].addTo(map).bindPopup(addr);
        }
    }
    req.open("get", "script/locget.php?lat=51.16866&lng=71.47268&range=1", true);
    req.send();

});

let aboutbtn = document.body.querySelector('#aboutbtn')
let servicebtn = document.body.querySelector('#servicebtn')
let contactsbtn = document.body.querySelector('#contactsbtn')


document.getElementById('pmenu').onclick = function(){
    document.body.querySelector('section[name="about"]').setAttribute('active', true);
} 

aboutbtn.onclick = function(){
    document.body.querySelector('section[name="about"]').setAttribute('active', true);
    document.getElementById("about").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}
servicebtn.onclick = function(){
    document.body.querySelector('section[name="about"]').setAttribute('active', true);
    document.getElementById("service").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}
contactsbtn.onclick = function(){
    document.body.querySelector('section[name="about"]').setAttribute('active', true);
    document.getElementById("contacts").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}