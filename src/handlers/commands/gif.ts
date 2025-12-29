import Eris from "eris"
import { searchGif } from "../../services/giphyService"

export async function gifCommand(bot: Eris.Client, interaction: Eris.CommandInteraction) {
  await bot.createInteractionResponse(interaction.id, interaction.token, {
    type: Eris.Constants.InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
  })

  const query = interaction.data.options?.[0].value as string

  if (!query) {
    await bot.editInteractionResponse(interaction.token, {
      content: "Please provide a GIF name to search for.",
    })
    return
  }

  try {
    const gifUrl = await searchGif(query)

    if (!gifUrl) {
      await bot.editInteractionResponse(interaction.token, {
        content: `No GIF found for "${query}". Try a different search term!`,
      })
      return
    }

    await bot.editInteractionResponse(interaction.token, {
      content: `Here's a GIF for "${query}":\n${gifUrl}`,
      embeds: [
        {
          title: `GIF: ${query}`,
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
    console.error("Error in gif command:", error)
    await bot.editInteractionResponse(interaction.token, {
      content: "An error occurred while searching for the GIF.",
    })
  }
}
