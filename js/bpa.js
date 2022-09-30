// https://bpa.icgc.cat/api/apiext/butlletiglobal?values=2022-03-10;1
// https://bpa.icgc.cat/zones/zones.geojson

var bpa_data;

const zonesAllausCat = [
	{"name": "Aran", "id": 1 },
	{"name": "Cadí", "id": 5 },
	{"name": "Pallaresa", "id": 3 },
	{"name": "Perafita", "id": 4 },
	{"name": "Prepirineu", "id": 6 },
	{"name": "Ribagorça", "id": 2 },
	{"name": "Ter", "id": 7 }
]

const bpa_icons_prefix = 'img/icons-avalanche/svg/'
const bpa_icons = [
	'Icon-Avalanche-Danger-Level-No-Rating-EAWS.svg',
	'Icon-Avalanche-Danger-Level-Dry-Snow-1-EAWS.svg',
	'Icon-Avalanche-Danger-Level-Dry-Snow-2-EAWS.svg',
	'Icon-Avalanche-Danger-Level-Dry-Snow-3-EAWS.svg',
	'Icon-Avalanche-Danger-Level-Dry-Snow-4-5-EAWS.svg',
	'Icon-Avalanche-Danger-Level-Dry-Snow-4-5-EAWS.svg'
].map(function (x) {return bpa_icons_prefix + x});

function getBPAData() {
	let curr_date = new Date();
	let dia = curr_date.getDate();
	let any = curr_date.getFullYear();
	let mes = curr_date.getMonth() + 1;

	BPA_DATA_URL = "https://bpa.icgc.cat/api/apiext/butlletiglobal?values=" + any + "-" + fillTo(mes, 2) + "-" + fillTo(dia, 2) + ";1";
	fetch(BPA_DATA_URL)
	.then(res => res.json())
	.then((out) => {
		bpa_data = out;
	})
	.catch(err => { throw err });
}

getBPAData();

// Refresh BPA data every 30 minutes just in case
window.setInterval(function(){
  getBPAData();
}, 30 * 60 * 1000);

function getBPAimageCAT(region) {

	let url = "";
}