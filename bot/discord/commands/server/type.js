const serverCreateSettings = require('../../../../createData');
exports.run = async(client, message, args) => {

    let helpEmbed = new Discord.MessageEmbed()
        .setColor("RED").setDescription(`List of servers:\n`)
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
        .setFooter("Example: DBH!server type NodeJS")


    if (!args[1]) {
        await message.channel.send(helpEmbed);
        return;
    };

    if(args[1] == "list") {
        await message.channel.send(helpEmbed);
        return;
    }

    const embed = new Discord.MessageEmbed();
    switch(args[1].toLowerCase()) {
       case "aio":
         embed.setDescription("`All In One`, short `aio` is a unique server type that contains several features that distinguish it from other Development(Bot & Codeserver) server types. This type brings all of the other types in a 1 single type and lets user interact with console. [Source: docs.dbh.wtf](https://docs.dbh.wtf)");
         break;
       case "nodejs":
         embed.setDescription("`Node.js` is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. [Source: Wikipedia](https://en.wikipedia.org/wiki/Node.js)" +
         "\n**If you are a starter, it is easier to use aio!**")
         break;
       case ("reddiscordbot" || "rdb"):
         embed.setDescription("RedDiscordBot is an open-source Discord Bot written in Python. Many commands and functions can be added trough Discord." + 
         "\nThe installation is easy, and you do NOT need to know anything about coding! Aside from installing and updating, every part of the bot can be controlled from within Discord. [Source: RedDiscordBot Github](https://github.com/Cog-Creators/Red-DiscordBot)")
         break;
       case "codeserver":
         embed.setDescription("`codeserver` is a free and open-source IDE running in your web browser.")
         break;
       case "gitea":
         embed.setDescription("Gitea is an open-source forge software package for hosting software development version control using Git as well as other collaborative features like bug tracking, wikis and code review. It supports self-hosting but also provides a free public first-party instance. It is a fork of Gogs and is written in Go. [Source: Wikipedia](https://en.wikipedia.org/wiki/Gitea)")
         break;
       case "sharex":
         embed.setDescription("ShareX is an image-sharing-server with Discord Integration.")
         break;
       case "haste":
         embed.setDescription("Haste is an open-source pastebin software written in node.js, which is easily installable in any network. It can be backed by either redis or filesystem, and has a very easy adapter interface for other stores. A publicly available version can be found at hastebin.com. [Source: Hastebin Github](https://github.com/toptal/haste)")
         break;
       case ("ts3" || "mumble"):
         embed.setDescription("TeamSpeak3 and Mumble are voice-servers to communicate with friends")
         break;
       case ("mongodb" || "redis" || "postgres"):
         embed.setDescription("Databases.")
         break;
       default:
         return message.channel.send(helpEmbed)
         break;
    }
    return message.channel.send(embed);
}
