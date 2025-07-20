const wise = document.querySelector(".wise");
const foolish = document.querySelector(".foolish");
const joyful = document.querySelector(".joyful");
const gloomy = document.querySelector(".gloomy");
const timid = document.querySelector(".timid");
const forceful = document.querySelector(".forceful");
const snappish = document.querySelector(".snappish");
const haughty = document.querySelector(".haughty");


const mcInParty = true;
const buttonNanjo = document.querySelector(".buttonNanjo");
let nanjoInParty = false;
const buttonMark = document.querySelector(".buttonMark");
let markInParty = false;
const buttonYukino = document.querySelector(".buttonYukino");
let yukinoInParty = false;
const buttonElly = document.querySelector(".buttonElly");
let ellyInParty = false;
const buttonMaki = document.querySelector(".buttonMaki");
let makiInParty = false;
const buttonBrown = document.querySelector(".buttonBrown");
let brownInParty = false;
const buttonAyase = document.querySelector(".buttonAyase");
let ayaseInParty = false;
const buttonReiji = document.querySelector(".buttonReiji");
let reijiInParty = false;
let partySize = 1;
const member1 = document.querySelector(".member1");
const member2 = document.querySelector(".member2");
const member3 = document.querySelector(".member3");
const member4 = document.querySelector(".member4");
const member5 = document.querySelector(".member5");

async function grabBlob() {
	const request = new Request("./db.json");
	const response = await fetch(request);
	blob = await response.json();

	return blob;
}

let blob = grabBlob();

function updateMembers() {
	console.log(blob["memberHTML"]["MC"]);
}

function toggleNanjo() {
	if (nanjoInParty === false) {
		nanjoInParty = true;
		partySize += 1;
		buttonNanjo.classList.add("activeButton");
	} else if (nanjoInParty === true) {
		nanjoInParty = false;
		partySize -= 1;
		buttonNanjo.classList.remove("activeButton");
	}
	updateMembers()
}
buttonNanjo.addEventListener("click", toggleNanjo);	
function toggleMark() {
	if (markInParty === false) {
		markInParty = true;
		partySize += 1;
		buttonMark.classList.add("activeButton");
	} else if (markInParty === true) {
		markInParty = false;
		partySize -= 1;
		buttonMark.classList.remove("activeButton");
	}
	updateMembers()
}
buttonMark.addEventListener("click", toggleMark);	
function toggleYukino() {
	if (yukinoInParty === false) {
		yukinoInParty = true;
		partySize += 1;
		buttonYukino.classList.add("activeButton");
	} else if (yukinoInParty === true) {
		yukinoInParty = false;
		partySize -= 1;
		buttonYukino.classList.remove("activeButton");
	}
	updateMembers()
}
buttonYukino.addEventListener("click", toggleYukino);	
function toggleElly() {
	if (ellyInParty === false) {
		ellyInParty = true;
		partySize += 1;
		buttonElly.classList.add("activeButton");
	} else if (ellyInParty === true) {
		ellyInParty = false;
		partySize -= 1;
		buttonElly.classList.remove("activeButton");
	}
	updateMembers()
}
buttonElly.addEventListener("click", toggleElly);	
function toggleMaki() {
	if (makiInParty === false) {
		makiInParty = true;
		partySize += 1;
		buttonMaki.classList.add("activeButton");
	} else if (makiInParty === true) {
		makiInParty = false;
		partySize -= 1;
		buttonMaki.classList.remove("activeButton");
	}
	updateMembers()
}
buttonMaki.addEventListener("click", toggleMaki);	
function toggleBrown() {
	if (brownInParty === false) {
		brownInParty = true;
		partySize += 1;
		buttonBrown.classList.add("activeButton");
	} else if (brownInParty === true) {
		brownInParty = false;
		partySize -= 1;
		buttonBrown.classList.remove("activeButton");
	}
	updateMembers()
}
buttonBrown.addEventListener("click", toggleBrown);	
function toggleAyase() {
	if (ayaseInParty === false) {
		ayaseInParty = true;
		partySize += 1;
		buttonAyase.classList.add("activeButton");
	} else if (ayaseInParty === true) {
		ayaseInParty = false;
		partySize -= 1;
		buttonAyase.classList.remove("activeButton");
	}
	updateMembers()
}
buttonAyase.addEventListener("click", toggleAyase);	
function toggleReiji() {
	if (reijiInParty === false) {
		reijiInParty = true;
		partySize += 1;
		buttonReiji.classList.add("activeButton");
	} else if (reijiInParty === true) {
		reijiInParty = false;
		partySize -= 1;
		buttonReiji.classList.remove("activeButton");
	}
	updateMembers()
}
buttonReiji.addEventListener("click", toggleReiji);	