# weather_bot

Weather Bot is a Discord bot that provides real-time weather updates for any location. Simply ask the bot, and it will fetch the latest weather details for you.

## Features
- play ping-pong with the bot.
- Get current weather details for any city or location.
- Get current astronomical forecast for city or location.

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/timDeHof/weather_bot.git
   cd weather_bot
   npm install
   ```

2. Configuration:
   ```bash
   Rename the config.sample.json to config.json (assuming you have a configuration file) or rename the env.template to .env.
   Fill in your Discord bot token and any other necessary API keys.
   DISCORD_TOKEN=your_discord_token_here
   CLIENT_ID=your_discord_client_id
   GUILD_ID=your_server_guild_id
   WEATHER_API_KEY=your_openweather_api_key_here
   
   ```
## Usage
- /ping : bot replies with "Pong!"
- /forecast <location> <units> : Get the current weather for the specified city.
- /astro <location> : Get the astromical forecast for the specified city.

## Contributing

We welcome contributions! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

## License

This project is licensed under the [MIT License](LICENSE). (Assuming you're using the MIT License; adjust as necessary.)

## Contact
For any questions or feedback, please contact Tim De Hof.
