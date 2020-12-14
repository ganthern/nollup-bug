import path from "path"
import nollup from 'nollup'
import fs from "fs/promises"
import {constants as fsConstants} from "fs"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonJs from "@rollup/plugin-commonjs"
import {rollup} from "rollup"

const bundler = nollup // change to "rollup" to see a difference

;(async function () {
	const bundle = await bundler({
		input: [
			"index.js",
		],
		plugins: [nodeResolve(), commonJs()]
	})
	console.log("Generating...")
	const result = await bundle.generate({sourcemap: false, format: "esm"})

	try {
		await fs.access("build", fsConstants.F_OK | fsConstants.W_OK)
	} catch (e) {
		console.log("ACCESS? ", e)
		await fs.mkdir("build")
	}

	for (const o of result.output) {
		const filePath = path.join("build", o.fileName)
		await fs.writeFile(filePath, o.code, {flag: 'w'})
	}
// 	fs.writeFile("build/index.html", `<!DOCTYPE html>
// <script src="index.js"></script>`)
// 	console.log(`file://${path.resolve("build/index.html")}`)
	import("./build/index.js")
})()