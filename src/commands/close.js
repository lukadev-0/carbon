const client = require('../client')
const { closeChannel, getChannelOwner } = require('../handleHelpChannels')
const { post, update } = require('../interactionHandler')

module.exports = async (int) => {
	await post(int, 'Closing your channel...')
	const channel = await client.channels.fetch(int.channel_id)
	if (getChannelOwner(channel) === int.member.user.id) {
		closeChannel(channel)
		await update(int, 'Closed your channel.')
	}
  else {
    await update(int, "This isn't your channel or it's not even a help channel!")
  }
}
