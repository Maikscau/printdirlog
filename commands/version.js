const package = require('../package.json')

const printVersion = () => {
	console.log(package.version)
}

module.exports = {
	printVersion
}