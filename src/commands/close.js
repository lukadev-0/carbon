const client = require('../client')
const { closeChannel, getChannelOwner } = require('../handleHelpChannels')
const { post, update } = require('../interactionHandler')

module.exports = async (int) => {
	await post(int, 'Closing your channel...')
	const channel = client.channels.fetch(int.channel_id)
	console.log(getChannelOwner(channel), int.member.user.id)
	console.log(getChannelOwner(channel) === int.member.user.id)
	if (getChannelOwner(channel) === int.member.user.id) {
		closeChannel(channel)
		await update(int, 'Closed your channel.')
	}
}
