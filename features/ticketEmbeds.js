const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = (client) => {
    client.on("messageCreate", (message) => {
        member = message.guild.members.cache.get(message.author.id);
        if (message.author.bot) return;
        if (!message.guild.members.cache.get(message.author.id).permissions.has(PermissionFlagsBits.Administrator)) return;

        // Dungeon Ticket Embed
        const f4 = new ButtonBuilder()
            .setCustomId("f4")
            .setLabel("Floor 4")
            .setStyle("Primary")
            .setEmoji("1066760199278428301");

        const f5 = new ButtonBuilder()
            .setCustomId("f5")
            .setLabel("Floor 5")
            .setStyle("Primary")
            .setEmoji("1066760198284398669");

        const f6 = new ButtonBuilder()
            .setCustomId("f6")
            .setLabel("Floor 6")
            .setStyle("Primary")
            .setEmoji("1066760196925440161");

        const f7 = new ButtonBuilder()
            .setCustomId("f7")
            .setLabel("Floor 7")
            .setStyle("Primary")
            .setEmoji("1066760196040445982")

        const dungeonButtons = new ActionRowBuilder()
            .addComponents(f4)
            .addComponents(f5)
            .addComponents(f6)
            .addComponents(f7);

        const dungeonEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Dungeon Carry Tickets")
            .setDescription("Price and Services")
            .addFields(
                {
                    name: "<:f4:1066760199278428301> Floor 4",
                    value: "Comp: 400k\nS: 600k\nS+: 1m",
                    inline: true
                },
                {
                    name: "<:f5:1066760198284398669> Floor 5",
                    value: "Comp: 350k\nS: 450k\nS+: 600k",
                    inline: true
                },
                {
                    name: "<:f6:1066760196925440161> Floor 6",
                    value: "Comp: 600k\nS: 800k\nS+: 1m",
                    inline: true
                },
                {
                    name: "<:f7:1066760196040445982> Floor 7",
                    value: "Comp: 3m\nS: 5m\nS+: 10m"
                }
            )

        // Slayer Ticket Embed
        const rev = new ButtonBuilder()
            .setCustomId("rev")
            .setLabel("Revenant Horror")
            .setStyle("Primary")
            .setEmoji("1070566656557989930");

        const tara = new ButtonBuilder()
            .setCustomId("tara")
            .setLabel("Tarantula Broodfather")
            .setStyle("Primary")
            .setEmoji("1070566760425730128");

        const sven = new ButtonBuilder()
            .setCustomId("sven")
            .setLabel("Sven Packmaster")
            .setStyle("Primary")
            .setEmoji("1070566695179137075");

        const eman = new ButtonBuilder()
            .setCustomId("eman")
            .setLabel("Voidgloom Seraph")
            .setStyle("Primary")
            .setEmoji("1070566728263798795");

        const slayerButtons = new ActionRowBuilder()
            .addComponents(rev)
            .addComponents(tara)
            .addComponents(sven)
            .addComponents(eman);

        const slayerEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Slayer Carry Tickets")
            .setDescription("Price and Services")
            .addFields(
                {
                    name: "<:Rev:1070566656557989930> Revenant Horror",
                    value: "T5: 100k (Bulk 10+ 50k)",
                    inline: true
                },
                {
                    name: "<:Tara:1070566760425730128> Tarantula Broodfather",
                    value: "T4: 100k (Bulk 10+ 50k)",
                    inline: true
                },
                {
                    name: "<:Sven:1070566695179137075> Sven Packmaster",
                    value: "T4: 100k (Bulk 10+ 50k)",
                    inline: true
                },
                {
                    name: "<:Void:1070566728263798795> Voidgloom Seraph",
                    value: "Tier 3: 500k (Bulk 10+ 350k)\nTier 4: 1.8m (Bulk 10+ 1.5m)"
                }
            )

        // Carrier Ticket Embed
        const carrierButtons = new ActionRowBuilder()
            .addComponents(new ButtonBuilder().setCustomId("apply").setLabel("Apply").setStyle("Primary").setEmoji("1070484660825628702"));

        const carrierEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Apply for Carrier")
            .setDescription("Roles you can currently apply for:\n<@&1069847263364517898>: <reqs>\n<@&1069847218481287188>: <reqs>\n<@&1069847169470844948>: <reqs>\n<@&1069846966399410226>: <reqs>\n\n<@&1067875956791984138>: <reqs>\n<@&1067877646769344523>: <reqs>\n<@&1067877660312731699>: <reqs>\n<@&1067877074485915658>: <reqs>\n\nPlease open a ticket and specify which role(s) you would like.")

        if (message.content === "dungeonTicketsEmbed") {
            message.channel.send({
                embeds: [dungeonEmbed],
                components: [dungeonButtons]
            });

            return message.delete();
        } else if (message.content === "slayerTicketsEmbed") {
            message.channel.send({
                embeds: [slayerEmbed],
                components: [slayerButtons]
            });

            return message.delete();
        } else if (message.content === "carrierTicketsEmbed") {
            message.channel.send({
                embeds: [carrierEmbed],
                components: [carrierButtons]
            });

            return message.delete();
        }
    });
}