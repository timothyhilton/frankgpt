require('dotenv').config();
const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("ready", (client) => {
    console.log(`${client.user.tag} is ready`);
    client.user.setActivity('Ready to chat');
})

client.on("messageCreate", (message) => {
    console.log(message.channelId);

    message.channel.send('hi');
});

client.login(process.env.TOKEN);