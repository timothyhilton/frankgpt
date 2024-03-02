require('dotenv').config();
const OpenAI = require('openai');
const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

const openai = new OpenAI();

client.on("ready", (client) => {
    console.log(`${client.user.tag} is ready`);
    client.user.setActivity('Ready to chat');
})

client.on("messageCreate", async (message) => {
    console.log(message.channelId);
    if(message.channelId != process.env.CHANNEL_ID) return
    if(message.author.bot) return
    console.log(message.content)

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": process.env.SYSTEM_MESSAGE},
          {"role": "user", "content": message.content}
        ]
    })

    console.log(completion.choices[0]);

    message.channel.send(completion.choices[0].message.content);
});

client.login(process.env.TOKEN);