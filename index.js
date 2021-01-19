import("./util1").then(module => module.test())

export const a = "hello"

const hot = module.hot
if (hot) {
	// Save the state (mostly prefix) before the reload
	hot.dispose((data) => {
		data.state = "test"
	})
	// Import ourselves again to actually replace ourselves and all the dependencies
	hot.accept(() => {
		console.log("Requiring new index.js")
		require(module.id)
	})
}