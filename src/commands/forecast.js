const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require("moment");
const { fetchForecast } = require("../requests/forecast");

const data = new SlashCommandBuilder()
  .setName("forecast")
  .setDescription("Replies with the weather forecast!")
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "The location can be a Zipcode, Latitude/Longitude (decimal degree) or city name",
      )
      .setRequired(true);
  })
  .addStringOption((option) => {
    return option
      .setName("units")
      .setDescription(
        "The desired unit system of the results: ei 'metric' or 'imperial'",
      )
      .setRequired(false)
      .addChoices(
        { name: "metric", value: "metric" },
        { name: "imperial", value: "imperial" },
      );
  });

async function execute(interaction) {
  await interaction.deferReply();
  const location = interaction.options.getString("location");
  const units = interaction.options.getString("units") || "imperial";
  const isMetric = units === "metric";
  try {
    const { locationName, weatherData } = await fetchForecast(location);

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Weather forecast for ${locationName}...`)
      .setDescription(`Using the ${units} system.`)
      .setTimestamp()
      .setFooter({ text: "Powered by the weatherapi.com API" });

    for (const day of weatherData) {
      const temperatureMin = isMetric
        ? day.temperatureMinC
        : day.temperatureMinF;
      const temperatureMax = isMetric
        ? day.temperatureMaxC
        : day.temperatureMaxF;
      embed.addFields({
        name: moment(day.date).format("MMMM Do YYYY"),
        value: `⬇️ Low: ${temperatureMin}°, ⬆️ High: ${temperatureMax}°`,
      });
    }

    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    await interaction.editReply(error);
  }
}

module.exports = {
  data,
  execute,
};
