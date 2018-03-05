// function that detects whether localStorage is both supported and available
function storageAvailable(type) {
try {
	var storage = window[type],
		x = '__storage_test__';
	storage.setItem(x, x);
	storage.removeItem(x);
	return true;
}
catch(e) {
	return e instanceof DOMException && (
		// everything except Firefox
		e.code === 22 ||
		// Firefox
		e.code === 1014 ||
		// test name field too, because code might not be present
		// everything except Firefox
		e.name === 'QuotaExceededError' ||
		// Firefox
		e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
		// acknowledge QuotaExceededError only if there's something already stored
		storage.length !== 0;
	}
}

function definevar() {
	if (storageAvailable('localStorage')) {
		vpacijent = localStorage.getItem("spacijent");
		vpregled = localStorage.getItem("spregled");
		vrazlog = localStorage.getItem("srazlog");
		vsadasnja = localStorage.getItem("ssadasnja");
		vdosadasnja = localStorage.getItem("sdosadasnja");
		vterapija = localStorage.getItem("sterapija");
		valergije = localStorage.getItem("salergije");
		vnstatus = localStorage.getItem("snstatus");
		vsstatus = localStorage.getItem("ssstatus");
		vzakljucak = localStorage.getItem("szakljucak");
	}
	else {
		vpacijent = document.getElementById("text-pacijent").value;
		vpregled = document.getElementById("rendered-form").elements.namedItem("radio-group-pregled").value;
		vrazlog = document.getElementById("text-razlog").value;
		vsadasnja = document.getElementById("textarea-sadanja").value;
		vdosadasnja = document.getElementById("textarea-dosadasnje").value;
		vterapija = document.getElementById("textarea-terapija").value;
		valergije = document.getElementById("text-alergije").value;
		vnstatus = document.getElementById("textarea-nstatus").value;
		vsstatus = document.getElementById("textarea-sstatus").value;
		vzakljucak = document.getElementById("textarea-zakljucak").value;
	}
}

// učitaj (localStorage ili value)
function citaj() {
	document.getElementById("rpacijent").innerHTML = vpacijent;
	document.getElementById("rpregled").innerHTML = vpregled;
	document.getElementById("rrazlog").innerHTML = vrazlog;
	document.getElementById("rsadasnja").innerHTML = vsadasnja;
	document.getElementById("rdosadasnja").innerHTML = vdosadasnja;
	document.getElementById("rterapija").innerHTML = vterapija;
	document.getElementById("ralergije").innerHTML = valergije;
	document.getElementById("rnstatus").innerHTML = vnstatus;
	document.getElementById("rsstatus").innerHTML = vsstatus;
	document.getElementById("rzakljucak").innerHTML = vzakljucak;
}
// šalje tekst u localStorage
function spremi() {
	localStorage.setItem("sppregled", "true");
	localStorage.setItem("spacijent", document.getElementById("text-pacijent").value);
	localStorage.setItem("spregled", document.getElementById("rendered-form").elements.namedItem("radio-group-pregled").value);
	localStorage.setItem("srazlog", document.getElementById("text-razlog").value);
	localStorage.setItem("ssadasnja", document.getElementById("textarea-sadanja").value);
	localStorage.setItem("sdosadasnja", document.getElementById("textarea-dosadasnje").value);
	localStorage.setItem("sterapija", document.getElementById("textarea-terapija").value);
	localStorage.setItem("salergije", document.getElementById("text-alergije").value);
	localStorage.setItem("snstatus", document.getElementById("textarea-nstatus").value);
	localStorage.setItem("ssstatus", document.getElementById("textarea-sstatus").value);
	localStorage.setItem("szakljucak", document.getElementById("textarea-zakljucak").value);
	
	$( "#warnezavrsen" ).addClass( "d-none" )
}

// završava nalaz, šalje tekst u localStorage, otvara modal s učitanim lS
function zavrsi() {
	if (storageAvailable('localStorage')) {
		spremi();
	}
	else {}
	
	definevar();
	citaj();
}

// označi tekst u <pre>
function selectText( containerid ) {
	var node = document.getElementById( containerid );
	if ( document.selection ) {
		var range = document.body.createTextRange();
		range.moveToElementText( node  );
		range.select();
	} else if ( window.getSelection ) {
		var range = document.createRange();
		range.selectNodeContents( node );
		window.getSelection().removeAllRanges();
		window.getSelection().addRange( range );
	}
}

// vrijeme početka 
function addZero(i) {
	if (i < 10) { i = "0" + i;}
	return i;
}
function time() {
	var d = new Date();
	var h = addZero(d.getHours());
	var m =  addZero(d.getMinutes());
	document.getElementById("time").innerHTML =  h + ":" + m;
}

// predefinirani statusi
function mnstatus() {
	document.getElementById('textarea-nstatus').value += "Pri svijesti, orjentiran. Govor uredan. Vratom ne koči. Lice bez asimetrije i ispada osjeta. Bulbomotorika ureda, bez nistagmusa. Zjenice izokorične, fotoreaktibilne. Bez ispada ostalih kranijskih živaca. Ekstremitete održava u AG položaju, GMS 5/5. MTR 2+ simetrični, patološke ne izazivam. Bez ispada površinskog osjeta. Hod uredan, Romberg održava, bez dismetrije. Sfinktere kontrolira.";
}
function znstatus() {
	document.getElementById('textarea-nstatus').value += "Pri svijesti, orjentirana. Govor uredan. Vratom ne koči. Lice bez asimetrije i ispada osjeta. Bulbomotorika ureda, bez nistagmusa. Zjenice izokorične, fotoreaktibilne. Bez ispada ostalih kranijskih živaca. Ekstremitete održava u AG položaju, GMS 5/5. MTR 2+ simetrični, patološke ne izazivam. Bez ispada površinskog osjeta. Hod uredan, Romberg održava, bez dismetrije. Sfinktere kontrolira.";
}
function lnstatus() {
	document.getElementById('textarea-nstatus').value += "Urednog stanja svijesti. Vratom ne koči. Donje ekstremitete održava u položaju po Mingazziniju, GMS 5/5. Plantarna i dorzalna fleksija stopala uredne. RPT 2+ simetrični, RAT 2+ simetrični, patološke ne izazivam. Lasegue obostrano negativan. Bez ispada površinskog osjeta. Hod uredan. Sfinktere kontrolira.";
}
function ohbpssstatus() {
	document.getElementById('textarea-sstatus').value += "Somatski status: Kardiopulmonalno komp. Afeb. | EKG: ";
}
function hnassstatus() {
	document.getElementById('textarea-sstatus').value += "Somatski status: Kardiopulmonalno komp. Afeb. | RR: | puls: | EKG: ";
}

// page reload + brisanje localStoragea
function reloadPage() {	
	location.reload();
	
	window.scrollTo(0, 0);
	
	localStorage.removeItem("sppregled");
	localStorage.removeItem("spacijent");
	localStorage.removeItem("spregled");
	localStorage.removeItem("srazlog");
	localStorage.removeItem("ssadasnja");
	localStorage.removeItem("sdosadasnja");
	localStorage.removeItem("sterapija");
	localStorage.removeItem("salergije");
	localStorage.removeItem("snstatus");
	localStorage.removeItem("ssstatus");
	localStorage.removeItem("szakljucak");
}

// ukoliko postoji nalaz koji nije pobrisan, otvara modal s lS
if (localStorage.getItem("sppregled") == "true") {
	definevar();
	citaj();
	
	document.getElementById("text-pacijent").value = vpacijent;
	document.getElementById("text-razlog").value = vrazlog;
	document.getElementById("textarea-sadanja").value = vsadasnja;
	document.getElementById("textarea-dosadasnje").value = vdosadasnja;
	document.getElementById("textarea-terapija").value = vterapija;
	document.getElementById("text-alergije").value = valergije;
	document.getElementById("textarea-nstatus").value = vnstatus;
	document.getElementById("textarea-sstatus").value = vsstatus;
	document.getElementById("textarea-zakljucak").value = vzakljucak;
	
	$( "#warnezavrsen" ).removeClass( "d-none" )

	$(document).ready(function () {
		$('.bd-nalaz-modal-lg').modal('show');
	});
}

function demo() {
	document.getElementById("text-pacijent").value = "Ivan Horvat";
	document.getElementById("prvi").checked = true;
	document.getElementById("text-razlog").value = "Bol u donjem dijelu leđa sa širenjem u lijevu nogu.";
	document.getElementById("textarea-sadanja").value = "Zadnja 3 tjedna osjeća bolnost lijevo lumbalno sa širenjem u lijevu nogu, do koljena. Tegobama prethodila fizička aktivnost. Nije prije imao sličnih tegoba. Nekad zna osjetitit trnce u spomenutom području. Negira smetnje sfinktera.";
	document.getElementById("textarea-dosadasnje").value = "Apendektomiran 2012.g. Artroskopija desnog koljena 2014.g. Gastritis.";
	document.getElementById("textarea-terapija").value = "Peptoran tbl pp";
	document.getElementById("text-alergije").value = "Negira";
	document.getElementById("textarea-nstatus").value = "Urednog stanja svijesti. Vratom ne koči. Donje ekstremitete održava u položaju po Mingazziniju, GMS 5/5. Plantarna i dorzalna fleksija stopala uredne. RPT 2+ simetrični, RAT 2+ simetrični, patološke ne izazivam. Lasegue terminalno pozitivan lijevo. Bez ispada površinskog osjeta. Hod uredan. Sfinktere kontrolira.";
	document.getElementById("textarea-sstatus").value = "Kardiopulmonalno komp. Afeb.";
	document.getElementById("textarea-zakljucak").value = "Bez akutnog neurološkog zbivanja. Mirovanje i pošteda. Analgetska terapija u slčaju jačih bolova. Izbjegavati provocirajući položaj. Lagana medicinska gimnastika. Uputiti fizijatru u slučaju perzistiranja tegoba.";
}
