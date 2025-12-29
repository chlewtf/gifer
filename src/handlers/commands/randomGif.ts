import Eris from "eris"
import { getRandomGif } from "../../services/giphyService"

export async function randomGifCommand(bot: Eris.Client, interaction: Eris.CommandInteraction) {
  await bot.createInteractionResponse(interaction.id, interaction.token, {
    type: Eris.Constants.InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
  })

  try {
    const gifUrl = await getRandomGif()

    if (!gifUrl) {
      await bot.editInteractionResponse(interaction.token, {
        content: "Failed to fetch a random GIF. Please try again later.",
      })
      return
    }

    await bot.editInteractionResponse(interaction.token, {
      content: "Here's a random GIF for you!",
      embeds: [
        {
          title: "Random GIF",
          image: {
            url: gifUrl,
            height: 300,
            width: 300,
          },
          color: 0x1f47b6,
        },
      ],
    })
  } catch (error) {
    console.error("Error in randomGif command:", error)
    await bot.editInteractionResponse(interaction.token, {
      content: "An error occurred while fetching a random GIF.",
    })
  }
}
