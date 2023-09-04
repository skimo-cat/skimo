const GPX_COLORS = ['blue', 'red', 'magenta', 'lime', 'gold']

var cims = [];

function getCims() {
	fetch(API_DOMAIN + "/cims/all")
	.then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				if (data.status != "ok") {
					alert(data.message);
					return;
				}
				getBPAData();
				cims = data.cims;
			});
		} else {
			alert("Error del servidor");
		}
	})
	.catch(err => {
		alert("Error del servidor");
	})
	// Markers are set in getBPAData
	//.finally(() => {setMarkers()});
}

getCims();