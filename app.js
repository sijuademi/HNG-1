"use strict";
const score = document.querySelector(".score");
score.textContent = 0;

let colours, displayedColour;

setTimeout(() => {
	init();
	document.querySelector(".display-message").style.display = "none";
	document.querySelector(".container").style.display = "block";
}, 3000);

const startGameTimer = function () {
	const tick = function () {
		document.querySelector(".timer").textContent = time;
		if (time === 0) {
			clearInterval(timer);
			document.querySelector(".display-message").style.display = "none";
			document.querySelector(".container").style.display = "block";
		}
		time--;
	};
	let time = 3;
	tick();
	const timer = setInterval(tick, 1000);
	return timer;
};
startGameTimer();

const init = function () {
	const generateRandomColours = function () {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return `rgb(${r}, ${g}, ${b})`;
	};

	colours = Array.from({ length: 6 }, generateRandomColours);
	// Outputs an array of 6 random numbers

	colours.forEach((colour, i) => {
		document.querySelectorAll(".color-box")[i].style.backgroundColor = colour;
	});
	displayedColour = colours[Math.floor(Math.random() * 6)];
	document.querySelector(".color-display").style.backgroundColor =
		displayedColour;
};

document.querySelectorAll(".color-box").forEach(function (el) {
	el.addEventListener("click", function (e) {
		console.log(this.style.backgroundColor);
		console.log(displayedColour);
		if (this.style.backgroundColor === displayedColour) {
			document.querySelector(".message").classList.add("animation");
			document.querySelector(".message").textContent = "CORRECT! 🎉🎉🎉";
			document.querySelector(".message").style.color = "green";

			setTimeout(() => {
				document.querySelector(".message").textContent = "";
			}, 1000);
		} else {
			document.querySelector(".message").textContent = "INCORRECT! 🎉🎉🎉";
			document.querySelector(".message").classList.remove("animation");
			document.querySelector(".message").style.color = "red";
			document.querySelector(".container").style.opacity = 0.5;
			setTimeout(() => {
				document.querySelector(".message").textContent = "";
				document.querySelector(".container").style.opacity = 1;
			}, 1000);
		}
		if (this.style.backgroundColor === displayedColour) {
			score.textContent = parseInt(score.textContent) + 1;
		} else {
			score.textContent > 0
				? (score.textContent = parseInt(score.textContent) - 1)
				: score.textContent;
		}
		setTimeout(() => {
			init();
		}, 1000);
	});
});

document.querySelector(".reset").addEventListener("click", function () {
	score.textContent = 0;
	init();
	document.querySelector(".display-message").style.display = "block";
	document.querySelector(".container").style.display = "none";

	startGameTimer();
});
