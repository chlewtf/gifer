# Discord GIF Bot

A simple Discord bot built with Eris and TypeScript that fetches and shares GIFs using the Giphy API.

## Features

- `/gif [query]` - Search for a GIF by name
- `/randomgif` - Get a random GIF

## Setup Instructions

### 1. Get Your Giphy API Key

1. Visit [https://developers.giphy.com/](https://developers.giphy.com/)
2. Sign up for a free account
3. Create a new application to get your API key
4. Copy your API key

### 2. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" tab and click "Add Bot"
4. Under TOKEN, click "Copy" to copy your bot token
5. Go to OAuth2 > URL Generator and select:
   - Scopes: `bot` and `applications.commands`
   - Permissions: `Send Messages`, `Use Slash Commands`
6. Copy the generated URL and open it in your browser to invite the bot to your server

### 3. Configure Environment Variables

1. Create a `.env` file in the root directory (copy from `.env.example`)
2. Add your Discord bot token: `DISCORD_TOKEN=your_token_here`
3. Add your Giphy API key: `GIPHY_API_KEY=your_key_here`

### 4. Install Dependencies and Run

```bash
npm install
npm run dev
```

## Commands

- `/gif <query>` - Search for a GIF. Example: `/gif cat`
- `/randomgif` - Get a random GIF from Giphy

# License
Licensed under MIT. Chle & contributors. All rights reserved.
