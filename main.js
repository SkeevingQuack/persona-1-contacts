const buttonWise = document.querySelector(".buttonWise");
const buttonFoolish = document.querySelector(".buttonFoolish");
const buttonJoyful = document.querySelector(".buttonJoyful");
const buttonGloomy = document.querySelector(".buttonGloomy");
const buttonTimid = document.querySelector(".buttonTimid");
const buttonForceful = document.querySelector(".buttonForceful");
const buttonSnappish = document.querySelector(".buttonSnappish");
const buttonHaughty = document.querySelector(".buttonHaughty");
let personality = [];

const buttonGender = document.querySelector(".buttonGender");
let currentGender = "FEMALE";

const demonList = document.querySelector(".demonList");

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

const memberList = [document.querySelector(".member1"),
				 document.querySelector(".member2"),
				 document.querySelector(".member3"),
				 document.querySelector(".member4"),
				 document.querySelector(".member5")];

async function grabBlob() {
	const request = new Request("./db.json");
	const response = await fetch(request);
	blob = await response.json();

	return blob;
}
let blob = grabBlob();

function compareSkill(character, skill, query) {
	query = query.split('>');
	return (character === query[0] && skill === query[1]);
}

function dictifyEmotions(fourTuple) {
	/* Triple version
	let result = [];
	for (index in fourTuple['happy']) { 
		result.push(fourTuple['happy'][index].split('>').push('Happy'));
	}
	for (index in fourTuple['eager']) {
		result.push(fourTuple['eager'][index].split('>').push('Eager'));
	}
	for (index in fourTuple['angry']) {
		result.push(fourTuple['angry'][index].split('>').push('Angry'));
	}
	for (index in fourTuple['scared']) {
		result.push(fourTuple['scared'][index].split('>').push('Scared'));
	}
	*/
	let result = {};
	for (index in fourTuple['happy']) { 
		result[fourTuple['happy'][index]] = 'Happy';
	}
	for (index in fourTuple['eager']) {
		result[fourTuple['eager'][index]] = 'Eager';
	}
	for (index in fourTuple['angry']) {
		result[fourTuple['angry'][index]] = 'Angry';
	}
	for (index in fourTuple['scared']) {
		result[fourTuple['scared'][index]] = 'Scared';
	}
	return result;
}


function updateResults() {
	let contacts = blob['personalities'];
	let result;

	for (index in contacts) {
		let contact = contacts[index];
		let personalityMatch = JSON.stringify(contact['personality']) == JSON.stringify(personality);
		let genderMatch = contact['gender'] == currentGender || contact['gender'] == "IRRELEVANT";
		if (personalityMatch && genderMatch) {
			result = contact;
			break;
		}
	}
	let demons;
	let emotions;
	if (result === undefined) {
		demons = [];
		emotions = {};
	} else {
		demons = result['demons'];
		emotions = dictifyEmotions(result['emotions']);
	}
	demonList.innerText = demons.join(", ");

	for (row in memberList) {
		let character = memberList[row].children[0].innerText;
		for (let col = 1; col < 5; col++) {
			let node = memberList[row].children[col];
			let key = character + '>' + node.innerText;

			switch(emotions[key]) {
				// can use .remove() and .add() if necessary
				case undefined: 
					node.classList = 'nothing'; 
					break;
				case 'Angry':
					node.classList = 'angry'; 
					break;
				case 'Happy':
					node.classList = 'happy'; 
					break;
				case 'Eager':
					node.classList = 'eager';
					break;
				case 'Scared':
					node.classList = 'scared';
					break;
				}
			}
		}
}

function toggleGender() {
	if (currentGender === "FEMALE") {
		currentGender = "MALE";
		buttonGender.innerText = "♂";
	} else {
		currentGender = "FEMALE";
		buttonGender.innerText = "♀";
	}
	updateResults();
}
buttonGender.addEventListener("click", toggleGender);

function updateTraits() {
	if (personality.length === 4) {
		if (personality.includes('Wise') === false) {buttonWise.disabled = true;}
		if (personality.includes('Foolish') === false) {buttonFoolish.disabled = true;}
		if (personality.includes('Joyful') === false) {buttonJoyful.disabled = true;}
		if (personality.includes('Gloomy') === false) {buttonGloomy.disabled = true;}
		if (personality.includes('Timid') === false) {buttonTimid.disabled = true;}
		if (personality.includes('Forceful') === false) {buttonForceful.disabled = true;}
		if (personality.includes('Snappish') === false) {buttonSnappish.disabled = true;}
		if (personality.includes('Haughty') === false) {buttonHaughty.disabled = true;}
	} else if (personality.length < 4) {
		buttonWise.disabled = false;
		buttonFoolish.disabled = false;
		buttonJoyful.disabled = false;
		buttonGloomy.disabled = false;
		buttonTimid.disabled = false;
		buttonForceful.disabled = false;
		buttonSnappish.disabled = false;
		buttonHaughty.disabled = false;
	} else {
		console.log("panic!!");
	}
	updateResults();
}

function updateMembers() {
	let positionCounter = 0;
	if (mcInParty) {
		memberList[positionCounter].innerHTML = blob['memberHTML']['MC'];
		positionCounter += 1;
	}

	if (nanjoInParty) {
		memberList[positionCounter].innerHTML = blob['memberHTML']['Nanjo'];
		positionCounter += 1;
	} else if (partySize === 5) {
		buttonNanjo.disabled = true;
	} else {
		buttonNanjo.disabled = false;
	}
	if (markInParty) {
		memberList[positionCounter].innerHTML = blob['memberHTML']['Mark'];
		positionCounter += 1;
	} else if (partySize === 5) {
		buttonMark.disabled = true;
	} else {
		buttonMark.disabled = false;
	}
	if (yukinoInParty) {
		memberList[positionCounter].innerHTML = blob['memberHTML']['Yukino'];
		positionCounter += 1;
	} else if (partySize === 5) {
		buttonYukino.disabled = true;
	} else {
		buttonYukino.disabled = false;
	}
	if (ellyInParty) {
		memberList[positionCounter].innerHTML = blob['memberHTML']['Elly'];
		positionCounter += 1;
	} else if (partySize === 5) {
		buttonElly.disabled = true;
	} else {
		buttonElly.disabled = false;
	}
	if (makiInParty) {
		memberList[positionCounter].innerHTML = blob['memberHTML']['Maki'];
		positionCounter += 1;
	} else if (partySize === 5) {
		buttonMaki.disabled = true;
	} else {
		buttonMaki.disabled = false;
	}
	if (brownInParty) {
		memberList[positionCounter].innerHTML = blob['memberHTML']['Brown'];
		positionCounter += 1;
	} else if (partySize === 5) {
		buttonBrown.disabled = true;
	} else {
		buttonBrown.disabled = false;
	}
	if (ayaseInParty) {
		memberList[positionCounter].innerHTML = blob['memberHTML']['Ayase'];
		positionCounter += 1;
	} else if (partySize === 5) {
		buttonAyase.disabled = true;
	} else {
		buttonAyase.disabled = false;
	}
	if (reijiInParty) {
		memberList[positionCounter].innerHTML = blob['memberHTML']['Reiji'];
		positionCounter += 1;
	} else if (partySize === 5) {
		buttonReiji.disabled = true;
	} else {
		buttonReiji.disabled = false;
	}

	while (positionCounter < 5) {
		memberList[positionCounter].innerHTML = '<th> </th><td> </td><td> </td><td> </td><td> </td>';
		positionCounter += 1;
	}
	updateResults();
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

function toggleWise() {
	if (personality.includes('Wise')) {
		personality = personality.filter((trait) => trait != 'Wise');
		buttonWise.classList.remove("activeButton");
	} else {
		personality.push('Wise');
		buttonWise.classList.add('activeButton');
	}
	updateTraits();
}
buttonWise.addEventListener("click", toggleWise);
function toggleFoolish() {
	if (personality.includes('Foolish')) {
		personality = personality.filter((trait) => trait != 'Foolish');
		buttonFoolish.classList.remove("activeButton");
	} else {
		personality.push('Foolish');
		buttonFoolish.classList.add('activeButton');
	}
	updateTraits();
}
buttonFoolish.addEventListener("click", toggleFoolish);
function toggleJoyful() {
	if (personality.includes('Joyful')) {
		personality = personality.filter((trait) => trait != 'Joyful');
		buttonJoyful.classList.remove("activeButton");
	} else {
		personality.push('Joyful');
		buttonJoyful.classList.add('activeButton');
	}
	updateTraits();
}
buttonJoyful.addEventListener("click", toggleJoyful);
function toggleGloomy() {
	if (personality.includes('Gloomy')) {
		personality = personality.filter((trait) => trait != 'Gloomy');
		buttonGloomy.classList.remove("activeButton");
	} else {
		personality.push('Gloomy');
		buttonGloomy.classList.add('activeButton');
	}
	updateTraits();
}
buttonGloomy.addEventListener("click", toggleGloomy);
function toggleTimid() {
	if (personality.includes('Timid')) {
		personality = personality.filter((trait) => trait != 'Timid');
		buttonTimid.classList.remove("activeButton");
	} else {
		personality.push('Timid');
		buttonTimid.classList.add('activeButton');
	}
	updateTraits();
}
buttonTimid.addEventListener("click", toggleTimid);
function toggleForceful() {
	if (personality.includes('Forceful')) {
		personality = personality.filter((trait) => trait != 'Forceful');
		buttonForceful.classList.remove("activeButton");
	} else {
		personality.push('Forceful');
		buttonForceful.classList.add('activeButton');
	}
	updateTraits();
}
buttonForceful.addEventListener("click", toggleForceful);
function toggleSnappish() {
	if (personality.includes('Snappish')) {
		personality = personality.filter((trait) => trait != 'Snappish');
		buttonSnappish.classList.remove("activeButton");
	} else {
		personality.push('Snappish');
		buttonSnappish.classList.add('activeButton');
	}
	updateTraits();
}
buttonSnappish.addEventListener("click", toggleSnappish);
function toggleHaughty() {
	if (personality.includes('Haughty')) {
		personality = personality.filter((trait) => trait != 'Haughty');
		buttonHaughty.classList.remove("activeButton");
	} else {
		personality.push('Haughty');
		buttonHaughty.classList.add('activeButton');
	}
	updateTraits();
}
buttonHaughty.addEventListener("click", toggleHaughty);
