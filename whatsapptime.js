const re = /^(\d\d?):(\d\d) ([aApP])\.?\s?[mM]\.?$/
const reToday = /^last seen today at (\d\d?):(\d\d) ([aApP])\.?\s?[mM]\.?$/
const reYesterday = /^last seen yesterday at (\d\d?):(\d\d) ([aApP])\.?\s?[mM]\.?$/

function conv12to24(str) {
	var hr = parseInt(str.match(re)[1])
	const mi = parseInt(str.match(re)[2])
	if (hr == 12 && str.match(re)[3].toLowerCase() === "a") { hr = 0 }
	const add = str.match(re)[3].toLowerCase() === "p" && hr != 12

	return (hr + 12 * add).toString().padStart(2, "0") + ":" + mi.toString().padStart(2, "0")
}

function lastseentodayconv12to24(str) {
	const timepart = str.substring(19)
	const convtime = conv12to24(timepart)

	return ("last seen today at " + convtime)
}

function lastseenyesterdayconv12to24(str) {
	const timepart = str.substring(23)
	const convtime = conv12to24(timepart)

	return ("last seen yesterday at " + convtime)
}

function changeMessageTime() {
	[
		...document.body.getElementsByTagName("span"),
		...document.body.getElementsByTagName("div")
	].filter(e => e.innerText.match(re))
		.forEach(e => { if (e.innerText.length > 0) { e.innerText = conv12to24(e.innerText) } })
}
function changeLastSeenTodayTime() {
	[
		...document.body.getElementsByTagName("span"),
		...document.body.getElementsByTagName("div")
	].filter(e => e.innerText.match(reToday))
		.forEach(e => { if (e.innerText.length > 0) { e.innerText = lastseentodayconv12to24(e.innerText) } })
}
function changeLastSeenYesterdayTime() {
	[
		...document.body.getElementsByTagName("span"),
		...document.body.getElementsByTagName("div")
	].filter(e => e.innerText.match(reYesterday))
		.forEach(e => { if (e.innerText.length > 6) { e.innerText = lastseenyesterdayconv12to24(e.innerText) } })
}

setInterval(() => {
	changeMessageTime();
	changeLastSeenTodayTime();
	changeLastSeenYesterdayTime();
}, 500)