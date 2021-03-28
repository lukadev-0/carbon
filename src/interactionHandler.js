const { MessageEmbed } = require('discord.js')
const { patch, post } = require('axios')
const client = require('./client')

/**
 * @param {string} msg
 * @param {MessageEmbed} embed
 * @param {number} type
 */

module.exports.post = async (int, msg, embed, type = 5) => {
	let data
	if (msg && embed) {
		data = { embeds: [embed], content: msg }
	} else if (msg) {
		data = { content: msg }
	} else if (embed) {
		data = { embeds: [embed] }
	}
	await client.api
		.interactions(int.id, int.token)
		.callback.post({ data: { type: type, data: data } })
		.catch(() => {})
}

/**
 * @param {string} msg
 * @param {MessageEmbed} embed
 */

module.exports.update = async (int, msg, embed) => {
	let data
	if (msg && embed) {
		data = { embeds: [embed], content: msg }
	} else if (msg) {
		data = { content: msg }
	} else if (embed) {
		data = { embeds: [embed] }
	}
	await patch(
		`https://discord.com/api/v8/webhooks/${client.user.id}/${int.token}/messages/@original`,
		data,
		{
			headers: {
				Autorization: `Bot ${process.env.TOKEN}`,
			},
		}
	).catch(() => {
		this.post(int, msg, embed)
	})
}

/**
 * @param {string} msg
 * @param {MessageEmbed} embed
 */

module.exports.followUp = async (int, msg, embed) => {
	let data
	if (msg && embed) {
		data = { embeds: [embed], content: msg }
	} else if (msg) {
		data = { content: msg }
	} else if (embed) {
		data = { embeds: [embed] }
	}
	await post(
		`https://discord.com/api/v8/webhooks/${client.user.id}/${int.token}`,
		data,
		{
			headers: {
				Autorization: `Bot ${process.env.TOKEN}`,
			},
		}
	)
}
