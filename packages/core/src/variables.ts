import { ActivityType } from 'discord.js'

export default {
    GUILD: process.env.GUILD!,
    OWNER_ID: process.env.OWNER_ID!,
    CATEGORY_FREE_ID: process.env.CATEGORY_FREE_ID!,
    CATEGORY_TAKEN_ID: process.env.CATEGORY_TAKEN_ID!,
    HELP_INACTIVITY_TIME: process.env.HELP_INACTIVITY_TIME!,
    REACTION_ROLE_CHANNEL: process.env.REACTION_ROLE_CHANNEL!,
    WELCOME_CHANNEL: process.env.WELCOME_CHANNEL!,
    COOLDOWN_ID: process.env.COOLDOWN_ID!,
    CHAT_HISTORY: process.env.CHAT_HISTORY!,
    REPORT_CHANNEL: process.env.REPORT_CHANNEL!,
    SUGGESTION_CHANNEL: process.env.SUGGESTION_CHANNEL!,
    GOODBYE_CHANNEL: process.env.GOODBYE_CHANNEL!,
    SERVER_URL: process.env.SERVER_URL!,
    OVERRIDE_REGEX: process.env.OVERRIDE_REGEX!,
    BOT_STATUS: process.env.BOT_STATUS!,
    BOT_STATUS_TYPE: process.env.BOT_STATUS_TYPE! as ActivityType,
}
