const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports = async (client) => {
    client.on("interactionCreate", async (interaction) => {
        // apply
        if (interaction.channel.id === "1067888604069761107") {
            await interaction.guild.channels.create({
                name: interaction.customId + "-" + interaction.user.username,
                parent: "1069475144076116038",
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: "1066154578850103346",
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
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

                interaction.reply({
                    content: "Ticket created: <#" + channel.id + ">",
                    ephemeral: true
                });
            });
        } else if (interaction.customId === "claim") {
            if (interaction.user.id === interaction.channel.topic) {
                return interaction.reply({
                    content: "You cannot claim your own ticket!",
                    ephemeral: true
                });
            }
            
            interaction.update({
                components: [
                    new ActionRowBuilder()
                        .addComponents(new ButtonBuilder().setCustomId("close").setLabel("Close").setStyle("Primary").setEmoji("🔒"))
                        .addComponents(new ButtonBuilder().setCustomId("claim").setLabel("Claim").setStyle("Primary").setEmoji("📌").setDisabled(true))
                        .addComponents(new ButtonBuilder().setCustomId(interaction.user.id).setLabel("Unclaim").setStyle("Primary").setEmoji("🔓"))
                ]
            });

            interaction.channel.send("Claimed by <@" + interaction.user.id + ">");

            interaction.channel.permissionOverwrites.edit(interaction.user, {
                SendMessages: true
            });
        } else if (interaction.customId === "close") {
            interaction.update({
                components: [
                    new ActionRowBuilder()
                        .addComponents(new ButtonBuilder().setCustomId("close").setLabel("Close").setStyle("Primary").setEmoji("🔒").setDisabled(true))
                ]
            });

            interaction.channel.send("Ticket closing in 10 seconds...");

            setTimeout(() => {
                interaction.channel.delete();
            }, 10 * 1000);
        } else if (interaction.customId === interaction.user.id) {
            interaction.update({
                components: [
                    new ActionRowBuilder()
                        .addComponents(new ButtonBuilder().setCustomId("close").setLabel("Close").setStyle("Primary").setEmoji("🔒"))
                        .addComponents(new ButtonBuilder().setCustomId("claim").setLabel("Claim").setStyle("Primary").setEmoji("📌"))
                ]
            });
            
            interaction.channel.permissionOverwrites.edit(interaction.user, {
                SendMessages: false
            });
        }
    });
}
