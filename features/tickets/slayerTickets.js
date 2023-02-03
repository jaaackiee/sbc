const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = async (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.channel.id !== "1067870551563059211") return;

        let id;
        switch(interaction.customId) {
            case "rev":
                id = "1067875956791984138";
                break;
            case "tara":
                id = "1067877646769344523";
                break;
            case "sven":
                id = "1067877660312731699";
                break;
            case "eman":
                id = "1067877074485915658";
                break;
            default:
                return;
        }

        await interaction.guild.channels.create({
            name: interaction.customId + "-" + interaction.user.username,
                parent: "1069469477277794334",
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: id,
                        allow: [PermissionFlagsBits.ViewChannel]
                    }
                ]
        }).then((channel) => {
            const closeButton = new ActionRowBuilder()
                .addComponents(new ButtonBuilder().setCustomId("close").setLabel("Close").setStyle("Primary").setEmoji("🔒"))
                .addComponents(new ButtonBuilder().setCustomId("claim").setLabel("Claim").setStyle("Primary").setEmoji("📌"));
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription("Welcome **" + interaction.user.username + "**!\nPlease state your IGN (In-Game Name) and which tier you would like.\nA carrier will be with you as soon as possible. Thank you. 🙌");
            channel.send({
                content: "<@&" + id + "> -- <@" + interaction.user.id + ">",
                embeds: [embed],
                components: [closeButton]
            });

            interaction.reply({
                content: "Ticket created: <#" + channel.id + ">",
                ephemeral: true
            });
        });
    });
}