import nollup from 'nollup'
import fs from "fs/promises"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonJs from "@rollup/plugin-commonjs"
import devServer from "nollup/lib/dev-server.js"

const bundler = nollup // change to "rollup" to see a difference

;(async function () {
	// const bundle = await bundler({
	// 	input: [
	// 		"index.js",
	// 	],
	// 	plugins: [nodeResolve(), commonJs()]
	// })

	await fs.writeFile("build/index.html", `<!doctype html>
<head>
<script src="index.js" type="module" ></script>
</head>`)


	devServer({
		hot: true,
		port: 9001,
		config: {
			input: [
				"index.js",
			],
			plugins: [nodeResolve(), commonJs()],
			output: {
				dir: "build",
				format: "esm",
			}
		},
		contentBase: "build"
	})
	// console.log("Generating...")
	// const result = await bundle.generate({sourcemap: false, format: "esm"})
	//
	// try {
	// 	await fs.access("build", fsConstants.F_OK | fsConstants.W_OK)
	// } catch (e) {
	// 	console.log("ACCESS? ", e)
	// 	await fs.mkdir("build")
	// }
	//
	// for (const o of result.output) {
	// 	const filePath = path.join("build", o.fileName)
	// 	await fs.writeFile(filePath, o.code, {flag: 'w'})
	// }
// 	fs.writeFile("build/index.html", `<!DOCTYPE html>
// <script src="index.js"></script>`)
// 	console.log(`file://${path.resolve("build/index.html")}`)
// 	import("./build/index.js")
})()