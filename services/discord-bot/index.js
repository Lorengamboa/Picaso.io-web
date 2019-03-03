require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const client = new Discord.Client();

client.on('message', msg => {
    if(msg.content === "ping") return msg.channel.send(`Pong`);
    if(msg.content.includes("!add")) {
      const [blank, keyword] = msg.content.split(' ');

      if(!keyword) return msg.channel.send(`The keyword wasn't added because it didnt match the correct format!`);

      fs.appendFile('keywords.txt', `\r\n ${keyword}`, function (err) {
        if (err) throw err;
        msg.channel.send(`New keyword added`);
      });
    }
});

client.on('ready', () => {
  client.channels.find(x => x.name === 'general').send('Hello! I\'m connected!');
});


client.login(token);