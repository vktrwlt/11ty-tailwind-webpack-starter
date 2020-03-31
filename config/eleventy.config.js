const path = require("path")
const fs = require("fs")
const projectVars = require("../src/11ty/_data/project")
const paths = require("./paths")
module.exports = function (eleventyConfig) {
	const manifestPath = path.resolve(paths.dist, "manifest.json")

	// if production get manifest with hashes
	const manifest = projectVars.development
		? {
				"main.js": "/js/main.js",
				"main.css": "/css/main.css",
		  }
		: JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }))

	// Layout aliases
	eleventyConfig.addLayoutAlias("default", "layouts/default.njk")

	// Adds a universal shortcode to embed bundled CSS. In Nunjack templates: {% cssBundle %}
	eleventyConfig.addShortcode("cssBundle", function () {
		return manifest["main.css"]
	})

	// Adds a universal shortcode to embed bundled JS. In Nunjack templates: {% jsBundle %}
	eleventyConfig.addShortcode("jsBundle", function () {
		return manifest["main.js"]
	})

	// Reload the page every time the JS/CSS are changed.
	eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] })

	// Include our static assets for every build
	eleventyConfig.addPassthroughCopy({ "src/images": "images" })
	eleventyConfig.addPassthroughCopy("robots.txt")

	// minify the html output when running in prod
	if (projectVars.production) {
		eleventyConfig.addTransform(
			"htmlmin",
			require("../build/scripts/minify-html")
		)
	}

	return {
		dir: {
			input: "src/11ty/pages",
			output: "dist",
			includes: "../_includes",
			data: "../_data",
		},
	}
}
