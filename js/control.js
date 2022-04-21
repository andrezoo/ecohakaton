
let map = document.getElementById('map')

let currentPoint = [];
let currentObject = [];

document.getElementById('contextmenu').style.display="none"
document.getElementById('contextcreate').style.display="none"
document.getElementById('contextaddr').style.display="none"

function openMenu(e){
    document.getElementById('contextmenu').style.display="block"
    document.getElementById('contextmenu').style.top=e.pageY
    document.getElementById('contextmenu').style.left=e.pageX
}
function openCreate(e){
    document.getElementById('contextcreate').style.display="block"
    document.getElementById('contextcreate').style.top=e.pageY
    document.getElementById('contextcreate').style.left=e.pageX
}

document.addEventListener("contextmenu", function(e){
    e.preventDefault();
    if(e.target.classList.contains('leaflet-marker-icon')) {
        openMenu(e)
        document.getElementById('contextcreate').style.display="none"
        document.getElementById('contextaddr').style.display="none"
    }
}, false);

document.addEventListener("click", function(e){
    currentObject = e.target
    if(e.target.parentNode !==document.getElementById('contextmenu')){
        if(!e.target.classList.contains('leaflet-marker-icon')){
            document.getElementById('contextmenu').style.display="none"
        }
    } else{
        document.getElementById('contextcreate').style.display="none"
        document.getElementById('contextaddr').style.display="none"
    }
});

document.getElementById('c-create').onclick = function(e){
    console.log(currentPoint)
    document.getElementById('contextcreate').style.display="none"
    document.getElementById('contextaddr').style.display="block"
    document.getElementById('contextaddr').style.top=e.pageY
    document.getElementById('contextaddr').style.left=e.pageX
}

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
    /**map.on("click", function(e){
        mn[0].removeFrom(map);
        mn[0].setLatLng(e.latlng);
        mn[0].addTo(map);
        console.log(e.latlng);
    })**/

    document.getElementById('c-remove').onclick = function(e){
        var req = new XMLHttpRequest();
        req.onload = function(e){
            console.log(this.responseText)
        }
        let str = currentObject._popup._bodyContent;
        req.open("get", encodeURI("script/marker.php?action=remove&addr="+str));
        req.send();
        document.getElementById('contextcreate').style.display="none"
        document.getElementById('contextaddr').style.display="none"
        document.getElementById('contextmenu').style.display="none"
    }

    document.getElementById('c-inputbtn').onclick = function(e){
        if(!document.getElementById('c-input').value) {
            document.getElementById('c-input').value="Мусорный бак"
        } else{
            var req = new XMLHttpRequest();
            req.onload = function(){
                let marker = DG.marker([parseFloat(lat), parseFloat(lng)]);
                marker.on('contextmenu', function(e){
                    currentObject = this
                })
                ma.push(marker);
                ma[ma.length-1].addTo(map).bindPopup(document.getElementById('c-input').value);
                document.getElementById('c-input').value ='';
            }
            let str = document.getElementById('c-input').value;
            req.open("get", encodeURI("script/marker.php?action=make&lat="+mn[0]._latlng.lat+"&lng="+mn[0]._latlng.lng+"&addr="+str));
            req.send();
        }
        document.getElementById('contextcreate').style.display="none"
        document.getElementById('contextaddr').style.display="none"
        document.getElementById('contextmenu').style.display="none"
    }

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
            let marker = DG.marker([parseFloat(lat), parseFloat(lng)]);
            marker.on('contextmenu', function(e){
                currentObject = this
            })
            ma.push(marker);
            ma[ma.length-1].addTo(map).bindPopup(addr);
        }
    }
    map.on('contextmenu', function(e){
        console.log(e)
    })
    map.on('click', function(e) {
        openCreate(e.originalEvent)
        currentPoint = e.latlng
        mn[0].removeFrom(map);
        mn[0].setLatLng(e.latlng);
        mn[0].addTo(map);
    })
    map.on('move', function(e) {
        document.getElementById('contextmenu').style.display="none"
        document.getElementById('contextcreate').style.display="none"
        document.getElementById('contextaddr').style.display="none"
    });
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
