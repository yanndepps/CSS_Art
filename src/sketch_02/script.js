// Analog Clock
// © https://codingartistweb.com
// ---
// get each hand elements and assign them to vars
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let seconds = document.getElementById("seconds");

// set the clock every 1000ms -> 1second
let setClock = setInterval(() => {
	let dateNow = new Date(); // create a date obj

	let hr = dateNow.getHours(); // gets the hours. num between 0 -> 23
	let min = dateNow.getMinutes(); // gets the minutes. num between 0 -> 59
	let sec = dateNow.getSeconds(); // gets the seconds. num between 0 -> 59

	/*
	* 360 degrees in one rotation -> (360/12) -> 30 degrees in one hour
	* 6 degrees for each minutes -> (360/60)
	* same calc for seconds
	*/
	let calcHr = (hr * 30) + (min / 2);
	let calcMin = (min * 6) + (sec / 10);
	let calcSec = sec * 6;
	console.log(calcSec);

	// use the deg values to rotate each hands
	hour.style.transform = `rotate(${calcHr}deg)`
	minute.style.transform = `rotate(${calcMin}deg)`
	seconds.style.transform = `rotate(${calcSec}deg)`
}, 1000);
