import { ActivityType, Snowflake } from 'discord.js'

export default {
    GUILD: process.env.GUILD! as Snowflake,
    OWNER_ID: process.env.OWNER_ID! as Snowflake,
    CATEGORY_FREE_ID: process.env.CATEGORY_FREE_ID! as Snowflake,
    CATEGORY_TAKEN_ID: process.env.CATEGORY_TAKEN_ID! as Snowflake,
    HELP_INACTIVITY_TIME: process.env.HELP_INACTIVITY_TIME!,
    REACTION_ROLE_CHANNEL: process.env.REACTION_ROLE_CHANNEL! as Snowflake,
    WELCOME_CHANNEL: process.env.WELCOME_CHANNEL! as Snowflake,
    COOLDOWN_ID: process.env.COOLDOWN_ID! as Snowflake,
    CHAT_HISTORY: process.env.CHAT_HISTORY! as Snowflake,
    REPORT_CHANNEL: process.env.REPORT_CHANNEL! as Snowflake,
    SUGGESTION_CHANNEL: process.env.SUGGESTION_CHANNEL! as Snowflake,
    GOODBYE_CHANNEL: process.env.GOODBYE_CHANNEL! as Snowflake,
    REDIRECT_SERVER_URL: process.env.REDIRECT_SERVER_URL!,
    OVERRIDE_REGEX: process.env.OVERRIDE_REGEX!,
    BOT_STATUS: process.env.BOT_STATUS!,
    BOT_STATUS_TYPE: process.env.BOT_STATUS_TYPE! as ActivityType,
}
