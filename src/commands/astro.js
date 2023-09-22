const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require("moment");

const { fetchForecast } = require("../requests/forecast");

const data = new SlashCommandBuilder()
  .setName("astronomy")
  .setDescription("Replies with the astronomical information for the day!!")
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "The location can be a Zipcode, Latitude/Longitude (decimal degree) or city name",
      )
      .setRequired(true);
  });

async function execute(interaction) {
  await interaction.deferReply();
  const location = interaction.options.getString("location");

  try {
    const { locationName, weatherData } = await fetchForecast(location);
    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Astronomical forecast for ${locationName}...`)
      .setTimestamp()
      .setFooter({ text: "Powered by the weatherapi.com API" });

    for (const day of weatherData) {
      embed.addFields({
        name: moment(day.date).format("MMMM Do YYYY"),
        value: `🌅 Sunrise: ${day.sunriseTime}\n🌇 Sunset: ${day.sunsetTime}\n 🌔 Moonrise: ${day.moonriseTime}\n🌒 Moonset: ${day.moonsetTime}`,
      });
    }
    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    const errorMessage = error.message || "An unknown error occurred.";
    await interaction.editReply(errorMessage);
  }
}

module.exports = {
  data,
  execute,
};
