const owofire = require('owofire')
const { post, update } = require('../interactionHandler')

module.exports = async (int) => {
	await post(int, 'OwOfying...')
	update(int, owofire(int.data.options[0].value))
}
