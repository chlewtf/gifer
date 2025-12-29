import Eris from "eris"

export async function registerSlashCommands(bot: Eris.Client) {
  const commands: Eris.ApplicationCommandOptions[] = [
    {
      name: "gif",
      description: "Search for a GIF by name",
      type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
      options: [
        {
          name: "query",
          description: "The GIF to search for",
          type: Eris.Constants.ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    },
    {
      name: "randomgif",
      description: "Get a random GIF",
      type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
    },
  ]

  try {
    // Get the bot's user ID
    const appId = bot.user.id

    // Register commands globally
    await Promise.all(commands.map((command) => bot.createGlobalApplicationCommand(appId, command)))

    console.log(`Registered ${commands.length} commands`)
  } catch (error) {
    console.error("Error registering commands:", error)
    throw error
  }
}
