function conv12to24(str) {
	const re = /^(\d\d?):(\d\d) ([ap])m$/
	const hr = parseInt(str.match(re)[1])
	const mi = parseInt(str.match(re)[2])
	const add = str.match(re)[3] === "p"

	return ((hr + 12 * add) % 24).toString().padStart(2, "0") + ":" + mi.toString().padStart(2, "0")

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
	].filter(e => e.innerText.match(/^\d\d?:\d\d [ap]m$/))
		.forEach(e => { if (e.innerText.length > 0) { e.innerText = conv12to24(e.innerText) } })
}
function changeLastSeenTodayTime() {
	[
		...document.body.getElementsByTagName("span"),
		...document.body.getElementsByTagName("div")
	].filter(e => e.innerText.match(/^last seen today at \d\d?:\d\d [ap]m$/))
		.forEach(e => { if (e.innerText.length > 0) { e.innerText = lastseentodayconv12to24(e.innerText) } })
}
function changeLastSeenYesterdayTime() {
	[
		...document.body.getElementsByTagName("span"),
		...document.body.getElementsByTagName("div")
	].filter(e => e.innerText.match(/^last seen yesterday at \d\d?:\d\d [ap]m$/))
		.forEach(e => { if (e.innerText.length > 0) { e.innerText = lastseenyesterdayconv12to24(e.innerText) } })
}

setInterval(() => {
	changeMessageTime();
	changeLastSeenTodayTime();
	changeLastSeenYesterdayTime();
}, 500)