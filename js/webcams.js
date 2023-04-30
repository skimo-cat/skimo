var webcams;
var selected_wc = undefined;

const WC_BASE_DOMAIN = 'https://img.skimo.cat/'
const WC_DATA_URL = WC_BASE_DOMAIN + '/img/data.json'

var webcamIcon = L.icon({
    iconUrl: 'svg/webcam.svg',
    //shadowUrl: 'leaf-shadow.png',

    //iconSize:     [19, 47], // size of the icon
    iconSize:     [16, 28], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, 25], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -30] // point from which the popup should open relative to the iconAnchor
});

function preloadImages() {
	let val = document.getElementById('wc-range').value;
	let elems_to_preload = Math.min(val, 5);
	for (let i=1; i<elems_to_preload+1; i++) {
		(new Image()).src = WC_BASE_DOMAIN + selected_wc.imgs[val-i].path;
	}

}

function setWCDate() {
	let val = document.getElementById('wc-range').value;
	let t = new Date(selected_wc.imgs[val].timestamp * 1000);

	let dia = t.getDate();
	let any = t.getFullYear();
	let mes = t.getMonth() + 1;
	let hora = t.getHours();
	let min = t.getMinutes();
	document.getElementById("wc-date").innerHTML = fillTo(dia, 2) + "/" + fillTo(mes, 2) + "/" + any + " " + fillTo(hora, 2) + ":" + fillTo(min, 2);

}

function updateWCImage() {
	document.getElementById("wc-error-message").style.display = 'none';
	let val = document.getElementById('wc-range').value;
	let url = selected_wc.imgs[val].path;
	preloadImages();
	setWCDate();
	document.getElementById('wc-img').src = WC_BASE_DOMAIN + url;
}

function loadWebcams() {
	fetch(WC_DATA_URL)
	.then(res => res.json())
	.then((out) => {
		webcams = out;
		let now = new Date();
		var webcam_markers = new Array();
		for (let i=0; i<webcams.length; i++) {
		    let wc = webcams[i];
			let last_img = wc.imgs[wc.imgs.length-1];
			// Only show webcams updated in the last 24h
			if (((now.getTime()/1000) - last_img.timestamp) > (60 * 60 * 24)) {
				console.log('Webcam ' + wc.original_name + ' is too old, skipping');
				continue;
			}
		    webcam_markers.push(L.marker([wc.lat, wc.lon], {icon: webcamIcon}).addTo(map).on('click', function (e) {
		    	selected_wc = wc;
		        //let url = wc.url + '?t=' + Math.trunc(new Date().getTime() / 1000 / 1800);
		        let initial_url = WC_BASE_DOMAIN + wc.imgs[wc.imgs.length-1].path;
		        document.getElementById('wc-range').min = 0;
		        document.getElementById('wc-range').max = wc.imgs.length - 1;
		        document.getElementById('wc-range').value = wc.imgs.length - 1;
		        // Preload images
		        preloadImages();
		        setWCDate();
		        if (document.getElementById("wc-img").src !== initial_url) {
		            // Loading stuff
		            document.getElementById("wc-img").style.display = 'none';
		            document.getElementById("wc-error-message").style.display = 'none';
		            //document.getElementById("wc-loading-message").style.display = 'inline';
		            document.getElementById("wc-spinner").style.display = 'block';
		            document.getElementById("wc-img").src = initial_url;
		            document.getElementById("wc-img").alt = 'Webcam ' + wc.original_name;
		        }

		        document.getElementById("wc-overlay").style.visibility = 'visible';
		        document.getElementById("wc-title").innerHTML = wc.original_name;
		        document.getElementById("wc-attribution").innerHTML = wc.attribution;

		    }));
		}

	})
	.catch(err => { throw err });
}

function onclickWCOveraly(e) {
	// this.style.visibility='hidden';
	if ((e.path !== undefined) && (e.path[0] !== document.querySelector("#wc-range"))) {
		document.getElementById('wc-overlay').style.visibility='hidden';
	}
}
