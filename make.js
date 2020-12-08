import path from "path"
import nollup from 'nollup'
import fs from "fs/promises"
import {constants as fsConstants} from "fs"

(async function () {
	const bundle = await nollup({
		input: [
			"index.js"
		],
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
    fork("build/index.js")
})()