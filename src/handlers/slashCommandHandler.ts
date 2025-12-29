import Eris from "eris"
import { gifCommand } from "./commands/gif"
import { randomGifCommand } from "./commands/randomGif"

export async function handleSlashCommand(bot: Eris.Client, interaction: Eris.CommandInteraction) {
  const { name } = interaction.data

  switch (name) {
    case "gif":
      await gifCommand(bot, interaction)
      break
    case "randomgif":
      await randomGifCommand(bot, interaction)
      break
    default:
      await bot.createInteractionResponse(interaction.id, interaction.token, {
        type: Eris.Constants.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Unknown command",
          flags: 64,
        },
      })
  }
}
