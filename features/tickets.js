const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports = async (client) => {
    client.on("interactionCreate", async (interaction) => {
        // apply
        if (interaction.channel.id === "1067888604069761107") {
            await interaction.guild.channels.create({
                name: interaction.customId + "-" + interaction.user.username,
                parent: "1069475144076116038",
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
            // dungeon
        } else if (interaction.channel.id === "1067870512493105232") {
            /*
            switch(interaction.customId) {
                case "f4":

            }
            */
            await interaction.guild.channels.create({
                name: interaction.customId + "-" + interaction.user.username,
                parent: "1069455511377952910",
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
                        id: "1066543680648913018",
                        allow: [PermissionFlagsBits.ViewChannel]
                    }
                ]
            }).then((channel) => {
                const closeButton = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder().setCustomId("close").setLabel("Close").setStyle("Primary").setEmoji("🔒"))
                    .addComponents(new ButtonBuilder().setCustomId("claim").setLabel("Claim").setStyle("Primary").setEmoji("📌"));
                const embed = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription("Welcome **" + interaction.user.username + "**!\nPlease specify which floor and score you would like.\nA carrier will be with you as soon as possible. Thank you. 🙌");
                channel.send({
                    content: "<@&1066543680648913018> -- <@" + interaction.user.id + ">",
                    embeds: [embed],
                    components: [closeButton]
                });

                interaction.reply({
                    content: "Ticket created: <#" + channel.id + ">",
                    ephemeral: true
                });
            });
            // slayer
        } else if (interaction.channel.id === "1067870551563059211") {
            await interaction.guild.channels.create({
                name: interaction.customId + "-" + interaction.user.username,
                parent: "1069469477277794334",
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
                        id: "1069466970216468532",
                        allow: [PermissionFlagsBits.ViewChannel]
                    }
                ]
            }).then((channel) => {
                const closeButton = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder().setCustomId("close").setLabel("Close").setStyle("Primary").setEmoji("🔒"))
                    .addComponents(new ButtonBuilder().setCustomId("claim").setLabel("Claim").setStyle("Primary").setEmoji("📌"));
                const embed = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription("Welcome **" + interaction.user.username + "**!\nPlease specify which slayer boss you would like.\nA carrier will be with you as soon as possible. Thank you. 🙌");
                channel.send({
                    content: "<@&1069466970216468532> -- <@" + interaction.user.id + ">",
                    embeds: [embed],
                    components: [closeButton]
                });

                interaction.reply({
                    content: "Ticket created: <#" + channel.id + ">",
                    ephemeral: true
                });
            });
        } else if (interaction.customId === "claim") {
            interaction.update({
                components: [
                    new ActionRowBuilder()
                        .addComponents(new ButtonBuilder().setCustomId("close").setLabel("Close").setStyle("Primary").setEmoji("🔒"))
                        .addComponents(new ButtonBuilder().setCustomId("claim").setLabel("Claim").setStyle("Primary").setEmoji("📌").setDisabled(true))
                ]
            });

            interaction.channel.send("Claimed by <@" + interaction.user.id + ">");

            interaction.channel.permissionOverwrites.create(interaction.user, {
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
        }
    });
}