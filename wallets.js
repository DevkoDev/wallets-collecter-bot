const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS],
  partials: ["CHANNEL", "MESSAGE"],
});
let wallets = {};

function saveWallets() {
  return fs.writeFileSync("wallets.json", JSON.stringify(wallets));
}

function getWallets() {
  return JSON.parse(fs.existsSync("wallets.json") ? fs.readFileSync("wallets.json") : "{}");
}

client.on("ready", async () => {
  console.log("Started saving addresses");
  wallets = getWallets();
  setInterval(saveWallets, 5000);
});
client.on("messageCreate", async (msg) => {
  try {
    if (msg.channelId == "1183018318328778862") {
      if (msg.content.length == 42 && msg.content.substr(0, 2) == "0x") {
        if (msg.member.roles.cache.has("1179009910382526485")) {
          wallets[msg.author.id] = msg.content;
          msg.channel.send(`Saved <@${msg.author.id}>`);
          await msg.delete();
        }
      }
      if (msg.content === "!stats") {
        if (msg.member.roles.cache.has("964943888857038919")) {
          msg.reply(`Total Saved wallets : ${Object.keys(wallets).length}`);
        }
      }

      if (msg.content === "!address") {
        if (wallets[msg.author.id] == undefined) {
          msg.channel.send("Not saved!");
        } else {
          try {
            if (msg.inGuild()) {
              msg.reply("Sent in pm.");
            }
            await msg.author.createDM(true);
            msg.author.dmChannel.send(`Saved wallet : ${wallets[msg.author.id]}`);
          } catch (error) {}
        }
      }
    }
  } catch (error) {}
});
client.login("");
