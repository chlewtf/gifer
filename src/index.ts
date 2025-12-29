import Eris from "eris"
import dotenv from "dotenv"
import { registerSlashCommands } from "./commands/registry"
import { handleSlashCommand } from "./handlers/slashCommandHandler"

dotenv.config()

const bot = new Eris(process.env.DISCORD_TOKEN || "", {
  intents: ["guilds", "guildMessages", "directMessages"],
})

bot.on("ready", async () => {
  console.log(`Bot logged in as ${bot.user.username}#${bot.user.discriminator}`)

  // Register slash commands
  try {
    await registerSlashCommands(bot)
    console.log("Slash commands registered successfully")
  } catch (error) {
    console.error("Failed to register slash commands:", error)
  }
})

bot.on("interactionCreate", async (interaction) => {
  if (interaction.type === Eris.Constants.InteractionTypes.APPLICATION_COMMAND) {
    try {
      await handleSlashCommand(bot, interaction)
    } catch (error) {
      console.error("Error handling slash command:", error)
      try {
        await bot.createInteractionResponse(interaction.id, interaction.token, {
          type: Eris.Constants.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "An error occurred while processing your command.",
            flags: 64, // Ephemeral message
          },
        })
      } catch (responseError) {
        console.error("Failed to send error response:", responseError)
      }
    }
  }
})

bot.connect()
