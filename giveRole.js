const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS],
  partials: ["CHANNEL", "MESSAGE"],
});
let index = 0;

client.on("ready", async () => {
  console.log("started");
  client.guilds
    .resolve("919131252731297813")
    .members.fetch()
    .then((members) => {
      members.forEach((member) => {
        if (member.roles.cache.has("950445647738318938") == false) {
          member.roles.add("950445647738318938").then(() => {
            console.log(index++);
          });
        }
      });
    });
});

client.login("");
