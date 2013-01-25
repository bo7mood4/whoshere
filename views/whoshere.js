//could do:
markerArray = {};

function start(){
    var mapOptions = {
        center: new google.maps.LatLng(0,0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    if (typeof map === "undefined") map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);//google maps v3 wont let us clear this
    refresh();
    whoshereInterval = setInterval(refresh,60000);     
}

function end(){
    clearInterval(whoshereInterval);
}

function refresh(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geo_success,geo_error,{enableHighAccuracy:true});
    }
    else{
        document.getElementById("body").innerHTML="Geolocation is not supported by this browser.";
    }
}

function geo_success(position){//on successful coordinates
    $.ajax({
        type: "POST",
        url: "scripts/whoshere.php",
        data: {
                lat: position.coords.latitude,
                lng: position.coords.longitude 
              },
        success: processOthers,
        dataType: 'json'
    });
    
    var myCoordinates = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
}

function geo_error(){//non-successful coordinates
    document.getElementById("body").innerHTML = "could not get position";
}

function processOthers(data){
    console.log(data)
    if (data.error){
        alert(data.error);
    }
    else{
        for (var i = 0; i < data.length; i++){
            if (typeof (lowlat) === "undefined"){
                var lowlat = data[i]["lat"];
                var lowlng = data[i]["lng"];
                var highlat = data[i]["lat"];
                var highlng = data[i]["lng"];
            }
            else{
                if (lowlat > data[i]["lat"])lowlat = data[i]["lat"];
                if (lowlng > data[i]["lng"])lowlng = data[i]["lng"];
                if (highlat < data[i]["lat"])highlat = data[i]["lat"];
                if (highlng < data[i]["lng"])highlng = data[i]["lat"];
            }
            
            if (markerArray.hasOwnProperty(data[i]["name"])){
                markerArray[data[i]["name"]].setCenter(new google.maps.LatLng(data[i]["lat"],data[i]["lng"]));
            }
            else{
                markerArray[data[i]["name"]] = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i]["lat"],data[i]["lng"]),
                    map: map,
                    title:data[i]["name"]
                });
            }
        }
        console.log(highlng);
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(lowlat,lowlng));
        bounds.extend(new google.maps.LatLng(highlat,highlng));
        console.log("woohoo");
        map.fitBounds(bounds);
    }
}

start();
