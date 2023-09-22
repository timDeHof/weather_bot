const { REST, Routes } = require("discord.js");

const { token, client_id, guild_id } = require("../../config.json");

const rest = new REST({ version: "10" }).setToken(token);

async function clientReadyHandler(client) {
  console.log(`Logged in as ${client.user.tag}!`);

  try {
    console.log(`Started refreshing ${client.commands.size} commands!`);

    const data = await rest.put(
      Routes.applicationGuildCommands(client_id, guild_id),
      {
        body: client.commands.map((command) => {
          return command.data.toJSON();
        }),
      },
    );

    console.log(`Successfully reloaded ${data.length} commands!`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  clientReadyHandler,
};
