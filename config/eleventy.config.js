const path = require("path")
const paths = require("./paths")
const fs = require("fs")
const projectVars = require("../src/11ty/_data/project")
const pluginPWA = require("eleventy-plugin-pwa")
module.exports = function (eleventyConfig) {
	const assetsPath = path.resolve(paths.dist, "assets/assets.json")

	// if production get assets with hashes
	const assets = projectVars.development
		? {
				"main.js": "/assets/js/main.js",
				"main.css": "/assets/css/main.css",
		  }
		: JSON.parse(fs.readFileSync(assetsPath, { encoding: "utf8" }))

	// Layout aliases
	eleventyConfig.addLayoutAlias("default", "layouts/default.njk")

	// Adds a universal shortcode to embed bundled CSS. In Nunjack templates: {% mainCssBundle %}
	eleventyConfig.addShortcode("mainCssBundle", function () {
		return assets["main.css"]
	})

	// Adds a universal shortcode to embed bundled JS. In Nunjack templates: {% mainJsBundle %}
	eleventyConfig.addShortcode("mainJsBundle", function () {
		return assets["main.js"]
	})

	// minify the html output when running in prod
	if (projectVars.production) {
		eleventyConfig.addPlugin(pluginPWA)
		eleventyConfig.addTransform(
			"htmlmin",
			require("../build/scripts/minify-html")
		)
	}

	// Copy `src/static/` to `dist/`
	eleventyConfig.addPassthroughCopy({ "src/static/": "/" })
	eleventyConfig.addPassthroughCopy({
		"src/assets/images": "/assets/images",
	})

	return {
		dir: {
			input: "src/11ty/pages",
			output: "dist",
			includes: "../_includes",
			data: "../_data",
		},
	}
}
