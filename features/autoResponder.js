module.exports = (client) => {
    client.on("messageCreate", (message) => {
        if (message.content.toLowerCase().includes("jackie")) {
            message.react(message.guild.emojis.cache.get("1067956863091605516"));
        }
        if (message.content.toLowerCase().includes("twth")) {
            message.react(message.guild.emojis.cache.get("1067956960772763688"))
        }
        if (message.content.toLowerCase().includes("skid")) {
            message.react(message.guild.emojis.cache.get("1070582958794223696"));
        }
    });
}