import 'dotenv/config'

const { DISCORD_BOT_TOKEN, DISCORD_CLIENT_TOKEN, SAUCE_NAO_TOKEN } = process.env;

if (!DISCORD_BOT_TOKEN || !DISCORD_CLIENT_TOKEN || ! SAUCE_NAO_TOKEN) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_BOT_TOKEN,
  DISCORD_CLIENT_TOKEN,
  SAUCE_NAO_TOKEN,
};