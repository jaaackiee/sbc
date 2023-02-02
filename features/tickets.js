const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports = async (client) => {
    client.on("interactionCreate", async (interaction) => {
        // apply
        if (interaction.channel.id === "1066436300309274705") {
            await interaction.guild.channels.create({
                name: interaction.customId + "-" + interaction.user.username,
                parent: "1069475144076116038",
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: "1066154578850103346",
                        allow: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    }
                ]
            }).then((channel) => {
                const closeButton = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder().setCustomId("close").setLabel("Close").setStyle("Secondary").setEmoji("🔒"));
                const embed = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription("Welcome **" + interaction.user.username + "**!\nPlease specify which role you are applying for (dungeon carrier or slayer carrier).\nStaff will be here as soon as possible to assist you. Thank you. 🙌");
                channel.send({
                    content: "<@&1066154578850103346> -- <@" + interaction.user.id + ">",
                    embeds: [embed],
                    components: [closeButton]
                });
            });
            // dungeon
        } else if (interaction.channel.id === "1066436300309274705") {
            await interaction.guild.channels.create({ name: interaction.customId + "-" + interaction.user.username, parent: "1069455511377952910" });
            // slayer
        } else if (interaction.channel.id === "1066436300309274705") {
            await interaction.guild.channels.create({ name: interaction.customId + "-" + interaction.user.username, parent: "1069469477277794334" });
        }
    });
}