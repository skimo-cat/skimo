// Pluja o neu

const max_range_steps = 30;

// https://static-m.meteo.cat/tiles/plujaneu/{any}/{mes}/{dia}/{hora}/{minut}/{z}/000/000/{x}/000/000/{y}.png
var fillTo=function(a,b){null===b&&(b=3);var c=b-a.toString().length;b="";for(var d=0;d<c;d++)b=b.concat("0");return b.concat(a)};
var range_element = document.getElementById('plujaoneu-range');
var plujaneu_layer = L.tileLayer('https://static-m.meteo.cat/tiles/plujaneu/{any}/{mes}/{dia}/{hora}/{minut}/{z}/000/000/{x}/000/000/{y}.png', {attribution: '© <a href="https://www.meteo.cat/">Meteocat</a>', opacity:0.85, maxNativeZoom:7});
plujaneu_layer.getTileUrl = function(a) {let r=range_values[max_range_steps-1-range_element.value]; return L.Util.template(this._url,L.extend({any:r.any,mes:fillTo(r.mes, 2),dia:fillTo(r.dia, 2),hora:fillTo(r.hora, 2),minut:fillTo(r.min, 2),z:fillTo(a.z,2),x:fillTo(a.x,3),y:fillTo(Math.abs(a.y-127),3)}))};

const increment_mins = 6;
const possibles_mins = new Array();
for (let i=0; i<60; i+=increment_mins) {
	possibles_mins.push(increment_mins*i);
}

var range_values = new Array();

setRangeValues();

function setRangeValues() {
	while (range_values.pop()) {};
	let curr_date = new Date();
	let dia = curr_date.getUTCDate();
	let any = curr_date.getUTCFullYear();
	let mes = curr_date.getUTCMonth() + 1;
	let hora = curr_date.getUTCHours();
	let curr_min = curr_date.getUTCMinutes();
	let min = possibles_mins[0];
	for (let i=1; i<possibles_mins.length; i++) {
		if (curr_min < possibles_mins[i]) {
			break;
		}
		min = possibles_mins[i];
	}
	curr_date.setUTCMinutes(min);

	for (let i=1; i<max_range_steps; i++) {
		dia = curr_date.getUTCDate();
		any = curr_date.getUTCFullYear();
		mes = curr_date.getUTCMonth() + 1;
		hora = curr_date.getUTCHours();
		min = curr_date.getUTCMinutes();
		range_values.push({'any': any, 'dia': dia, 'mes': mes, 'hora': hora, 'min': min, 'utctime': curr_date.getTime()});
		curr_date = new Date(curr_date.getTime() - (increment_mins * 60 * 1000));
	}
}

function logoOverlaps() {
	return window.screen.width < 445;
}

function setDateText(r) {
	let t = new Date(r.utctime);
	let dia = t.getDate();
	let any = t.getFullYear();
	let mes = t.getMonth() + 1;
	let hora = t.getHours();
	let min = t.getMinutes();
	document.getElementById("plujaoneu-text").innerHTML = fillTo(dia, 2) + "/" + fillTo(mes, 2) + "/" + any + " " + fillTo(hora, 2) + ":" + fillTo(min, 2);
}

function onLayerAddPlujaoNeu(e) {
	setRangeValues();
	let r = range_values[max_range_steps - 1 - range_element.value];
	setDateText(r);
	document.getElementById('plujaoneu-overlay').style.display = 'block';
	if (logoOverlaps()) {
		document.getElementById('logo-overlay').style.display = 'none';
	}
}

function updatePlujaoNeuTiles () {
	plujaneu_layer.redraw();
	let r = range_values[max_range_steps - 1 - range_element.value];
	setDateText(r);
}

function onRemoveLayerAddPlujaoNeu(e) {
	document.getElementById('plujaoneu-overlay').style.display = 'none';
	document.getElementById('logo-overlay').style.display = 'block';
}