const GN_BASE_DOMAIN = 'https://data.skimo.cat/'
const GN_DATA_URL = GN_BASE_DOMAIN + '/GN.json'

var GNPopups;
var GNLayer = L.layerGroup();

function loadGN() {
	fetch(GN_DATA_URL)
	.then(res => res.json())
	.then((out) => {
		let gn = out;
		let gn_popups = new Array();
		for (let i=0; i<Object.keys(gn).length; i++) {
		    let curr_gn = gn[Object.keys(gn)[i]];

		    if (curr_gn.gruix === null) continue;

		    gn_popups.push(L.popup({
		    	    closeOnClick: false,
    				autoClose: false,
    				closeButton: false,
    				className: 'custom-popup'
		    })
		    .setLatLng([curr_gn.lat,curr_gn.lon])
		    .setContent('<p>' + curr_gn.gruix + 'cm</p>')
		    );
		}
		GNPopups = gn_popups;
	})
	.catch(err => { throw err });
}

function openGNPopups() {
	for (let i=0; i<GNPopups.length; i++) {
		GNPopups[i].openOn(map);
	}
}

function closeGNPopups() {
	for (let i=0; i<GNPopups.length; i++) {
		GNPopups[i].removeFrom(map);
	}
}

loadGN();