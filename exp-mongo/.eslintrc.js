module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 12
	},
	"rules": {
		'semi': ['error', 'always'],
		"object-curly-newline": ["error", {
			"ObjectExpression": "always",
			"ObjectPattern": {
				"multiline": true 
			},
			"ImportDeclaration": "never",
			"ExportDeclaration": {
				"multiline": true, "minProperties": 3 
			}
		}],
		"indent": ["error", "tab"],
		"brace-style": ["error", "1tbs"]
	}  
};
