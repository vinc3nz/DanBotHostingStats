exports.run = async(client, message, args) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle('Server Info');
    if(!args[1]) { 
      embed.setDescription('Please provide a valid server type (e.g. `aio`).');
    } else {
      switch(args[1]) {
        case "aio": embed.setDescription('`aio` is a server where you can run.. ')
      }
    } 
    await message.channel.send(embed)
}
