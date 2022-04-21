let map = document.getElementById('map')

let ma = [];
let mad = [];

map.style.width = window.innerWidth
map.style.height = window.innerHeight

window.addEventListener('resize', function(event) {
    let map = document.getElementById('map')
    map.style.width = window.innerWidth
    map.style.height = window.innerHeight
}, true);

/**var options = {
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

navigator.geolocation.getCurrentPosition(success, error, options);**/

function calcZoom(z){
    return z*0.03/16
}

DG.then(function () {
    //создаём карту
    map = DG.map('map', {
        center: [51.16866, 71.47268],
        zoom: 15,
        minZoom: 10,
        zoomControl: false,
        fullscreenControl: false
    });
    
    map.geoclicker.enable();
    var req = new XMLHttpRequest();
    req.onload = function(){
        var lines = this.responseText.split("\n")
        for (let index = 0; index < lines.length; index++) {
            const element = lines[index].split("\r");
            const addr = element[0];
            const lat = element[1];
            const lng = element[2];
            mad.push(addr);
            ma.push(DG.marker([parseFloat(lat), parseFloat(lng)]));
            ma[ma.length-1].addTo(map).bindPopup(addr);
        }
    }
    let latlng = map.getCenter()
    req.open("get", `script/locget.php?lat=${latlng.lat}&lng=${latlng.lng}&range=0.15`, true);
    req.send();
    map.on('moveend', function(e) {
        let bounds = map.getBounds()
        // var erqe = new XMLHttpRequest();
        // erqe.onload = function(){
        //     var lines = this.responseText.split("\n")
        //     console.log(map.getMarkers())
        //     while(ma.length){
        //         ma[ma.length-1].removeFrom(map);
        //         ma.pop();
        //     }
        //     for (let index = 0; index < lines.length; index++) {
        //         const element = lines[index].split("\r");
        //         const addr = element[0];
        //         const lat = element[1];
        //         const lng = element[2];
        //         ma.push(DG.marker([parseFloat(lat), parseFloat(lng)]));
        //         ma[ma.length-1].addTo(map).bindPopup(addr);
        //     }
        // }
        let latlng = map.getCenter();
        for (let index = 0; index < ma.length; index++) {
            const element = ma[index];
            element.addTo(map).bindPopup(mad[index]);
        }
        // erqe.open("get", `script/locget.php?lat=${latlng.lat}&lng=${latlng.lng}&range=${calcZoom(map.getZoom())}`, true);
        // erqe.send();
    });
});

let aboutbtn = document.body.querySelector('#aboutbtn')
let servicebtn = document.body.querySelector('#servicebtn')
let contactsbtn = document.body.querySelector('#contactsbtn')
let homebtn = document.body.querySelector('#homebtn')

document.getElementById('docs').onclick = function(){
    this.style.height = "auto"
    document.querySelector('#docs>div').style.pointerEvents = 'auto'; 
    document.querySelector('#docs>div').style.opacity = 1; 
}

document.getElementById('pmenu').onclick = function(){
    if(document.body.querySelector('section[mainpage]').getAttribute('active')=='false') document.body.querySelector('section[mainpage]').setAttribute('active', true)
    else document.body.querySelector('section[mainpage]').setAttribute('active', false)
} 

homebtn.onclick = function(){
    document.body.querySelector('section[mainpage]').setAttribute('active', false);
}
aboutbtn.onclick = function(){
    document.body.querySelector('section[mainpage]').setAttribute('active', true); 
    setTimeout(function(){
        document.getElementById("about").scrollIntoView({behavior: "smooth", block: "center"});
    },450);
}
servicebtn.onclick = function(){
    document.body.querySelector('section[mainpage]').setAttribute('active', true);
    setTimeout(function(){
        document.getElementById("service").scrollIntoView({behavior: "smooth", block: "center"});
    },450);
}
contactsbtn.onclick = function(){
    document.body.querySelector('section[mainpage]').setAttribute('active', true);
    document.getElementById("contacts").scrollIntoView({behavior: "smooth", block: "start"});
}