const db = require('quick.db');
const { keep_alive } = require("./keep_alive");
const Discord = require('discord.js');
const config = require('./config.json');
var online = config.emoji.online;
var offline = config.emoji.offline;
var idle = config.emoji.idle;
var dnd = config.emoji.dnd;
const channel = config.channelID;
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`STARTED CLIENT : ${client.user.tag}`);
  const bot = client.users.cache.get(config.botID);

  setInterval(async function() {
    const message = await db.get('msgID_');

    const msg = await client.channels.cache
      .get(channel)
      .messages.fetch(message);

    const embed = new Discord.MessageEmbed();
    embed.setColor('GOLD');
    embed.setTitle(`STATUS LOGGER | ${bot.username}`);
    embed.setTimestamp();
    embed.setFooter("YT : Venom EXE");
    embed.setThumbnail(bot.displayAvatarURL())
    if (bot.presence.status === 'offline') {
      embed.setDescription(`\u200b\n${offline}| [**${bot.tag}**](https://discord.com/users/${bot.id}) is **${bot.presence.status}**\n\u200b`);
    } else

      if (bot.presence.status === 'online') {
        embed.setDescription(`\u200b\n${online}| [**${bot.tag}**](https://discord.com/users/${bot.id}) is **${bot.presence.status}**\n\u200b`);
      } else

        if (bot.presence.status === 'idle') {
          embed.setDescription(`\u200b\n${idle}| [**${bot.tag}**](https://discord.com/users/${bot.id}) is **${bot.presence.status}**\n\u200b`);
        } else

          if (bot.presence.status === 'dnd') {
            embed.setDescription(`\u200b\n${dnd}| [**${bot.tag}**](https://discord.com/users/${bot.id}) is **${bot.presence.status}**\n\u200b`);
          }

    msg.edit(embed);
  }, 5000);
});

client.on('message', async (message) => {
  const bot = client.users.cache.get(config.botID);

  if (message.content.startsWith('=start')) {

    const embed = new Discord.MessageEmbed()
    embed.setColor('GOLD');
    embed.setTitle(`STATUS LOGGER | ${bot.username}`);
    embed.setTimestamp();
    embed.setFooter("YT : Venom EXE");
    if (bot.presence.status === 'offline') {
      embed.setDescription(`\u200b\n${offline}| [**${bot.tag}**](https://discord.com/users/${bot.id}) is **${bot.presence.status}**\n\u200b`);
    } else

      if (bot.presence.status === 'online') {
        embed.setDescription(`\u200b\n${online}| ${bot.tag}[**${bot.tag}**](https://discord.com/users/${bot.id}) is **${bot.presence.status}**\n\u200b`);
      } else

        if (bot.presence.status === 'idle') {
          embed.setDescription(`\u200b\n${idle}| [**${bot.tag}**](https://discord.com/users/${bot.id}) is **${bot.presence.status}**\n\u200b`);
        } else

          if (bot.presence.status === 'dnd') {
            embed.setDescription(`\u200b\n${dnd}| [**${bot.tag}**](https://discord.com/users/${bot.id}) is **${bot.presence.status}**\n\u200b`);
          };

    client.channels.cache
      .get(channel).send(embed).then(async (msg) => {
        db.set('msgID_', `${msg.id}`);
      });
  } else

    if (message.content.startsWith('=status')) {
      const bot = client.users.cache.get(config.botID);
    };
});

client.login(process.env.token);
