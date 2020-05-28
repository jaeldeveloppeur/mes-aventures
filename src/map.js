let map;
let panorama;
const panoramaElement = document.querySelector("#panorama");
const resetMapButton = document.querySelector("#reset-map");
const backToMapButton = document.querySelector("#back-to-map");

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.858448607746126, lng: 2.2944759340564445},
        zoom: 4,
        // mapTypeId: 'satellite',
        styles : [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#523735"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#c9b2a6"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#dcd2be"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ae9e90"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#93817c"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a5b076"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#447530"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#fdfcf8"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f8c967"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#e9bc62"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e98d58"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#db8555"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#806b63"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8f7d77"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#b9d3c2"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#92998d"
                }
              ]
            }
          ]
    });

    panorama = new google.maps.StreetViewPanorama(
      document.getElementById('panorama'), {
        position: {lat: 48.858448607746126, lng: 2.2944759340564445},
        pov: {
          heading: 34,
          pitch: 10
        }
      });


    addMapListeners();

    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";
}

function  addMapListeners() {
  resetMapButton.addEventListener("click", resetMap);
  backToMapButton.addEventListener("click", backToMap);
}

function addMarkerOnMap(dream) {
    const marker = new google.maps.Marker({
        position: dream.coordinates,
        map: map,
        icon: dream.done ? "images/marker_done.png" : "images/marker.png"
    });

    marker.addListener('click', function() {
      zoomOn(marker.getPosition());
    });

    
}

function zoomOn(position){
  map.setZoom(20);
  map.setCenter(position);
  map.setMapTypeId("satellite")
}

function resetMap() {
  map.setZoom(3);
  map.setCenter({lat: 48.858448607746126, lng: 2.2944759340564445});
  map.setMapTypeId("roadmap")
}

function backToMap(){
  panoramaElement.style.display = "none";
  backToMapButton.style.display = "none";
  resetMapButton.style.display = "block";
}

function visitDreamOnMap(position){
  panorama.setPosition(position);
  panoramaElement.style.display = "block";
  backToMapButton.style.display = "block";
  resetMapButton.style.display = "none";
}

export {initMap, addMarkerOnMap, visitDreamOnMap};
