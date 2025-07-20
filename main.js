const wise = document.querySelector(".wise");
const foolish = document.querySelector(".foolish");
const joyful = document.querySelector(".joyful");
const gloomy = document.querySelector(".gloomy");
const timid = document.querySelector(".timid");
const forceful = document.querySelector(".forceful");
const snappish = document.querySelector(".snappish");
const haughty = document.querySelector(".haughty");

const buttonMC = document.querySelector(".buttonMC");
let enabledMC = 0;
const member1 = document.querySelector(".member1");

function replaceMember() {
	if (enabledMC === 0) {
		enabledMC = 1;
		member1.innerHTML = "<th>MC</th><td>Persuade</td><td>Taunt</td><td>Invite</td><td>Sing</td>"
	} else if (enabledMC === 1) {
		enabledMC = 0;
		member1.innerHTML = "<th></th><td></td><td></td><td></td><td></td>";
	}
}

buttonMC.addEventListener("click", replaceMember);	