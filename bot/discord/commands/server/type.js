const serverCreateSettings = require('../../../../createData');
exports.run = async(client, message, args) => {

    let helpEmbed = new Discord.MessageEmbed()
        .setColor("RED").setDescription(`List of servers: (use DBH!server create <type> <name>)\n\n*Please note that some nodes might be having trouble connecting to the bot which may lead into this process giving out an error.*\n`)
        //.addField("__**Minecraft:**__", "Forge \nPaper \nBedrock \nPocketmineMP \nWaterfall \nSpigot", true)
        //.addField("__**Grand Theft Auto:**__", "alt:V \nmultitheftauto \nRage.MP \nSA-MP", true)
        .addField("__**Bots:**__", "NodeJS \nPython \nJava \naio \nRedDiscordBot", true)
        //.addField("__**Source Engine:**__", "GMod \nCS:GO \nARK:SE", true)
        .addField("__**Voice Servers:**__", "TS3 \nMumble", true)
        //.addField("__**SteamCMD:**__", "Rust \nDaystodie \nArma \nAssettocorsa \nAvorion \nBarotrauma", true)
        .addField("__**Databases:**__", "MongoDB \nRedis \nPostgres", true)
        .addField("__**WebHosting:**__", "Nginx", true)
        .addField("__**Custom Eggs:**__", "ShareX", true)
        .addField("__**Software:**__", "codeserver \ngitea \nhaste", true)
//         .addField("__**Storage:**__", "storage", true)
        .addField("Help", "If you need more informations about a servertype, use \`DBH!server type <server type>\`.", true)
        .setFooter("Example: DBH!server create NodeJS Testing Server")


    if (!args[1]) {
        await message.channel.send(helpEmbed);
        return;
    };

    if(args[1] == "list") {
        await message.channel.send(helpEmbed);
        return;
    }

    const embed = new Discord.MessageEmbed();
    switch(args[1]) {
       case "NodeJS":
         embed.setDescription("Yep");
         break;

    }
}
