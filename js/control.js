
let map = document.getElementById('map')


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

var ma = [];
var mn = [];

DG.then(function () {
    map = DG.map('map', {
        center: [51.16866, 71.47268],
        zoom: 14,
        zoomControl: false,
        fullscreenControl: false
    });
    mn.push(new DG.marker([0, 0]));
    map.on("click", function(e){
        mn[0].removeFrom(map);
        mn[0].setLatLng(e.latlng);
        mn[0].addTo(map);
        console.log(e.latlng);
    })

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

let createbtn = document.getElementById('create');

createbtn.onclick = function() {
    console.log(mn[0])
    if(mn[0]._latlng.lat == 0) alert('Вы не выбрали место на карте. Нажмите на точку, где должен появиться бак')
    else {
        var req = new XMLHttpRequest();
        req.onload = function(){
            console.log(this.responseText);
            if (this.responseText == 'OK') alert('Бак успешно добавлен')
        }
        let str = document.querySelector('input[name="street"]').value;
        if(!str) str = 'Мусорный бак';
        req.open("get", encodeURI("script/marker.php?action=make&lat="+mn[0]._latlng.lat+"&lng="+mn[0]._latlng.lng+"&addr="+str));
        req.send();
    }
};

let aboutbtn = document.body.querySelector('#about')
let servicebtn = document.body.querySelector('#service')
let contactsbtn = document.body.querySelector('#contacts')

aboutbtn.onclick = function(){
    document.body.querySelector('section[name="about"]').setAttribute('active', true);
}
servicebtn.onclick = function(){
    document.body.querySelector('section[name="about"]').setAttribute('active', true);
}
contactsbtn.onclick = function(){
    document.body.querySelector('section[name="about"]').setAttribute('active', true);
}