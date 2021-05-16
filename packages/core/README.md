# About Carbon

Carbon, was originally split between two bots, one was for moderation and the other one was for other commands.
It was really hard to modify them, so I began fusing them. And now there is Carbon.

## Self-hosting Carbon

Carbon is currently hosted on [Repl.it](https://repl.it), because it has some guild-specific settings you need to self-host the bot.

To get started, clone the repo and install the required dependencies.

> **Note:** Make sure you have [Git][4] and [NPM][5] installed

```sh
git clone https://github.com/daimond113/carbon.git # clone the repo
cd carbon                                          # cd into it
npm i                                              # install dependencies
```

## Environment Variables

Carbon requires some environment variables to work.

| Name                  | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| BOT_STATUS            | status message of the bot                                              |
| BOT_STATUS_TYPE       | type for the bot's status [See ActivityType][1]                        |
| CATEGORY_FREE_ID      | id of the category where non-taken help channels are in                |
| CATEGORY_TAKEN_ID     | id of the category where taken help channels are in                    |
| CHAT_HISTORY          | id of a channel where chat history should be located                   |
| COOLDOWN_ID           | id of the help channel cooldown role                                   |
| GOODBYE_CHANNEL       | the id of a channel where all exiting people should get a exit message |
| GUILD                 | the guild id you want to use                                           |
| HELP_INACTIVITY_TIME  | the time of inactive help channels to get freed in milliseconds        |
| OVERRIDE_REGEX        | a regex of role names that override certain permissions                |
| OWNER_ID              | the owner id of the bot, the owner gets access to ownerOnly commands   |
| REACTION_ROLE_CHANNEL | the id of a channel where reaction roles should be located, check out [`src/others/reactionRoles.ts`][2] to config                                                                  |
| REPORT_CHANNEL        | the id of a channel where reports should be located                    |
| SERVER_URL            | the url of where the express server should redirect                    |
| SUGGESTION_CHANNEL    | the id of a channel where suggestions should be located                |
| TOKEN                 | the bot's token, you can get it from the Discord Developer Dashboard   |
| WELCOME_CHANNEL       | the id of a channel where all new people will get welcomed, be sure to check [`src/others/createImage.ts`][3] to modify the image                                                   |

## Scripts

| Name           | Description            |
| -------------- | ---------------------- |
| start          | Builds and starts node |
| builds         | Builds the project     |
| dev            | Starts nodemon         |
| test           | Starts Jest            |

[1]: https://discord.js.org/#/docs/main/stable/typedef/ActivityType
[2]: src/others/reactionRoles.ts
[3]: src/others/createImage.ts
[4]: https://git-scm.com/
[5]: https://npmjs.com/