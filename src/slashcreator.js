const slash = require('@daimond113/discord-slash-commands')
const discordClient = require('./client')
const client = new slash(process.env.TOKEN, discordClient.user.id)
const guildid = '799341812686127134'

client
	.createCommand(
		{
			name: 'meme',
			description: 'Get a meme from reddit!',
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})

client
	.createCommand(
		{
			name: 'owofy',
			description: 'Owofy your message!',
			options: [
				{
					name: 'Text',
					description: 'Text to owofy',
					type: 3,
					required: true,
				},
			],
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})

client
	.createCommand(
		{
			name: 'randomQuote',
			description: 'Get a random quote!',
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})

client
	.createCommand(
		{
			name: 'report',
			description: 'Report a user for breaking the rules.',
			options: [
				{
					name: 'User',
					description: 'User to report',
					type: 6,
					required: true,
				},
				{
					name: 'Reason',
					description: 'Report reason',
					type: 3,
					required: true,
				},
			],
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})

client
	.createCommand(
		{
			name: 'suggest',
			description: 'Suggest something',
			options: [
				{
					name: 'Suggestion',
					description: 'Your suggestion',
					type: 3,
					required: true,
				},
			],
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})

client
	.createCommand(
		{
			name: 'respondToSuggestion',
			description: 'Respond to a suggestion',
			options: [
				{
					name: 'MessageID',
					description: 'Message ID of the suggestion',
					type: 3,
					required: true,
				},
				{
					name: 'Implemented',
					description: 'Is this suggestion implemented?',
					type: 3,
					required: true,
					choices: [
						{
							name: 'Considered',
							value: 'Considered',
						},
						{
							name: 'Accepted',
							value: 'Accepted',
						},
						{
							name: 'Denied',
							value: 'Denied',
						},
					],
				},
				{
					name: 'Comment',
					description: 'A comment on this suggestion',
					type: 3,
					required: true,
				},
			],
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})

client
	.createCommand(
		{
			name: 'music',
			description: 'Play music',
			options: [
				{
					name: 'Command',
					description: 'Command to use',
					type: 3,
					required: true,
					choices: [
						{
							name: 'Play',
							value: 'play',
						},
						{
							name: 'Pause',
							value: 'pause',
						},
						{
							name: 'Disconnect',
							value: 'disconnect',
						},
						{
							name: 'Resume',
							value: 'resume',
						},
					],
				},
				{
					name: 'toplay',
					description: 'A video title to play (ONLY VALID IN THE PLAY COMMAND)',
					type: 3,
					required: true,
				},
			],
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})

client
	.createCommand(
		{
			name: 'avatar',
			description: "Get someone's avatar!",
			options: [
				{
					name: 'User',
					description: 'User to get avatar from',
					type: 6,
					required: true,
				},
			],
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})

client
	.createCommand(
		{
			name: 'eval',
			description: 'Run code (OWNER ONLY)',
			options: [
				{
					name: 'Code',
					description: 'Code to run',
					type: 3,
					required: true,
				},
			],
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})

client
	.createCommand(
		{
			name: 'close',
			description: 'Close your help channel',
		},
		guildid
	)
	.catch((err) => {
		console.log(err.message)
	})
