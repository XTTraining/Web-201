module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true,
		"amd": true
    },
	"plugins": [
		"react"
	],
    "extends": "eslint:recommended",
    "parserOptions": {
		"ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "ecmaVersion": 2016,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ],
		"no-unused-vars": [
			"warn", 
			{ "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
		]
    }
};