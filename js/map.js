var outdoors_layer = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var tpotresc_layer = L.tileLayer('https://api.topotresc.com/tiles/{z}/{x}/{y}.png', {attribution: 'Tiles © <a href="https://www.topotresc.com/">topotresc</a>'})

var atesLayer = L.tileLayer.wms('https://geoserver.atesmaps.org/wms?TRANSPARENT=true&', {
    layers: ' ATES:ates_all',
    transparent: true,
    format: 'image/png',
    attribution: '<a htef="https://atesmaps.org">Atesmaps</a>'
});

// ----
const serveiTopoCache = L.tileLayer.wms("https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wms/service?", {
layers: 'topo',
format: 'image/jpeg',
continuousWorld: true,
attribution: 'Institut Cartogràfic i Geològic de Catalunya',
});

const serveiOrtoCache = L.tileLayer.wms("https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wms/service?", {
layers: 'orto',
format: 'image/jpeg',
continuousWorld: true,
attribution: 'Institut Cartogràfic i Geològic de Catalunya',
});


const ortoHibridaICGC = L.tileLayer('https://geoserveis.icgc.cat/styles/icgc_orto_hibrida/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
// ----

var map = L.map('map', {layers: [outdoors_layer]})
map.on('load', function() {
    loadWebcams();
    loadRefus();
    getBPAData();
});
map.setView([41.75, 1.65], 8);
// refusLayer selected by default
//map.addLayer(refusLayer);

var baseMaps = {
    "Relleu topogràfic": outdoors_layer,
    "Topogràfica hibrida": tpotresc_layer,
    "Satel·lit": Esri_WorldImagery,
    "Topogràfic": serveiTopoCache,
    "Ortofoto": serveiOrtoCache,
    "Ortofoto hibrida": ortoHibridaICGC,
};

var overlayMaps = {
    "Refugis": refusLayer,
    "Gruix de neu": GNLayer,
    "Radar Pluja i Neu": plujaneu_layer,
    "Cartografia ATES": atesLayer,

};

map.on('overlayadd', function (e) {
    if (e.name === 'Radar Pluja i Neu') {
       onLayerAddPlujaoNeu(e);
    }
    if (e.name === 'Gruix de neu') {
        openGNPopups();
    }
});

map.on('overlayremove', function (e) {
    if (e.name === 'Radar Pluja i Neu') {
       onRemoveLayerAddPlujaoNeu(e);
    }
    if (e.name === 'Gruix de neu') {
        closeGNPopups();
    }
});


var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

var cimIcon = L.icon({
    iconUrl: 'svg/pic.svg',
    iconSize:     [29, 57], // size of the icon
    iconAnchor:   [10, 25], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -30] // point from which the popup should open relative to the iconAnchor
});


var markers = new Array(cims.length);
var gpx_open = new Array();

function setMarkers() {
    for (let i=0; i<cims.length; i++) {
        let cim = cims[i];

        function generatePopupText(c, i) {
            let popup_text = new String();
            popup_text += "<section><header><h2 class='peak_names'>" + c.name;
            //console.log(i, cims[i], bpa_data)
            if (cims[i].zona_allaus_cat !== undefined) {
                    popup_text += "<a href='https://bpa.icgc.cat/' target='_blank'><img title='Veure bulletí complet' id='bpa-svg' src='";
                    let perill = bpa_data[cims[i].zona_allaus_cat - 1].grau_perill_primari;
                    popup_text += bpa_icons[perill] + "'></a>";

                }
            popup_text += "</h2><p class='p-height'><a class='peak_height'>(" + c.height + "m)</a></p>";
            popup_text += "</header><hr>"



            for (let j=0; j<c.routes.length; j++) {
                let route = c.routes[j];
                popup_text += "<article>"

                if (route.origin != '') {
                    popup_text += "<p><b>Inici</b>: " + route.origin + "</p>"
                }
                popup_text += "<div class='box' style='color:" + GPX_COLORS[j] + "'>&#9632;</div>";
                if (route.description != '') {
                    popup_text += "<p class='route_description'>" + route.description + "</p>";

                }
                popup_text += "<b>Ressenyes:</b><ul class='links'>"
                for (let x=0; x<route.links.length; x++) {
                    let link = route.links[x];
                    popup_text += "<li><a class='route_link' target=”_blank” href='" + link + "'>" + link + "</a></li>";
                }
                popup_text += "</ul></article><hr></section>";
            }
            return popup_text;
        }

        let popup = new L.popup().setLatLng([cim.lat, cim.lon]).setContent(generatePopupText(cim, i));
        
        markers[i] = L.marker([cim.lat, cim.lon], {icon: cimIcon}).addTo(map).bindPopup(popup).on('popupopen', function (e) {
                for (let j=0; j<cims[i].routes.length; j++) {
                    if (cims[i].routes[j].gpx_object !== undefined) {
                        cims[i].routes[j].gpx_object.addTo(map);
                    } else {
                        if (cim.routes[j].gpx === undefined || cim.routes[j].gpx.lenth === 0) {
                            continue;
                        }
                        cims[i].routes[j].gpx_object = new L.GPX(cim.routes[j].gpx[0], {
                            async: true,
                            marker_options: {
                                startIconUrl: '',
                                endIconUrl: '',
                                shadowUrl: ''
                            },
                            polyline_options: {
                                color: GPX_COLORS[j]
                            }
                        }).addTo(map);
                    }
                    gpx_open.push(cims[i].routes[j].gpx_object);
                }
            });
    } 
}


map.on('click', function(event) {
    while (x = gpx_open.pop()) {
        x.removeFrom(map);
    }
    document.getElementById("wc-overlay").style.visibility = 'hidden';
});