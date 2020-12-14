const fs = require("fs")

module.exports = function () {
	fs.readFileSync("index.js")
	console.log("success!")
}