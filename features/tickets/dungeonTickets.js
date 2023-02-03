const { PermissionFlagsBits } = require("discord.js");

module.exports = async (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.channel.id !== "1067870512493105232") return;

        let id;
        switch (interaction.customId) {
            case "f4": {
                id = "1069847263364517898";
            } case "f5": {
                id = "1069847218481287188";
            } case "f6": {
                id = "1069847169470844948";
            } case "f7": {
                id = "1069846966399410226";
            } default: {
                return;
            }
        }

        await interaction.guild.channels.create({
            name: interaction.customId + "-" + interaction.user.username,
                parent: "1069455511377952910",
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
                .setDescription("Welcome **" + interaction.user.username + "**!\nPlease state your IGN (In-Game Name) and which score you would like.\nA carrier will be with you as soon as possible. Thank you. 🙌");
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