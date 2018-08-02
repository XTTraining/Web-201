
/* Google Map */
function init_map() {
    var myOptions = {
        zoom: 12,
        center: new google.maps.LatLng(41.87887610000001,-87.63591500000001),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
    var marker = new google.maps.Marker({ map: map, position: new google.maps.LatLng(41.87887610000001,-87.63591500000001) });
    var infowindow = new google.maps.InfoWindow(
        { content: '<strong>Spice House</strong><br>233 S Wacker Dr,<br>60606, Chicago<br>' }
    );

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
    infowindow.open(map, marker);

}
google.maps.event.addDomListener(window, 'load', init_map);