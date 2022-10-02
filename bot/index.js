// I BEAUTIFIED THIS IN SOME RANDOM ONLINE JS BEAUTIFIER, STILL LOOKS LIKE SHIT

// DONT BULLY ME FOR BAD CODING PRACTICE LMFAO


const { Client } = require("discord.js");
const { Intents } = require('discord.js');
const {
    MessageEmbed
} = require('discord.js');
const {
    MessageActionRow
} = require('discord.js')

const fs = require('fs');
const execSync = require('child_process').execSync;
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));

const token = fs.readFileSync("bot_token.txt");


const Discord = require('discord.js')
const client = new Client({
    partials: ["CHANNEL"],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
});

client.on('ready', () => {
    console.log("omw to skid")
    client.user.setActivity({
        "type": "PLAYING",
        "name": "Override (!obfuscate)"
    })
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().startsWith("!obfuscate")) {

        if (message.channel.id != "1022335387349307402" && message.channel.type != "DM") return message.channel.send("Please, use this command in <#1022335387349307402> or in DMs.");
        
        if (message.attachments.first() == undefined) {
            return message.channel.send("You need to attach a file!")
        }
        const file = message.attachments.first()?.url;
        if (!message.attachments.first().name.endsWith(".txt") || message.attachments.first().name.endsWith(".lua")) return message.channel.send('Please attach a .txt file or a .lua file!');
        
        async function obf(anonymousMode) {
          let msgtoedit = await message.channel.send("Obfuscating...");

          const response = await fetch(file);

          if (!response.ok) return message.channel.send("The bot errored!")

          const text = await response.text();
          
          if (text) {
              fs.unlinkSync('input.lua');
              fs.writeFileSync('input.lua', text);

              try {
                  execSync('Lua\\lua5.1.exe main.lua')
              } catch (e) {
                  return message.channel.send("An error occured! Please, check your code and try again.")
              }

              let msg = await client.channels.cache.get("1022368447939743786").send({
                  files: [{
                      attachment: 'output.lua'
                  }]
              });

              let obfurl = msg.attachments.first()?.url

              await msg.delete();

              const embed = new MessageEmbed()

              embed.setColor('GREEN')
              embed.setTitle("Obfuscated")
              embed.setDescription("Obfuscated using Override!\n\n**Download**:\n" + obfurl)
              embed.author = "Override"

              await msgtoedit.edit({
                  embeds: [embed],
                  content: "Done!"
              })

              

              fs.unlinkSync("minifier/output.lua")
              fs.unlinkSync('input.lua');
              fs.writeFileSync('input.lua', "--waitin for the day to finally be obfuscated");
              let user = `${message.author.username}#${message.author.discriminator} <@${message.author.id}>`

              if (anonymousMode) user = "Anonymous#1337";

              const embedlog = new MessageEmbed()
                .setTitle("Obfuscator used!")
                .setDescription(`${user} used the obfuscator!`)
                .setColor('GREEN')

              await client.channels.cache.get("1022708610234601562").send({embeds:[embedlog]})
          }
      }

      let luau = false;
      let sun_tzu = false;

      async function ask_lua() {
        const embed = new MessageEmbed()
          .setTitle("Config: **Lua Type**")
          .setDescription("**Lua Type.**\nWhat type of Lua do you wish to run your script on?\n\n:regional_indicator_a: : **LuaU (Runs on stuff like Roblox)**\n:regional_indicator_b: : **Lua (Runs on stuff like replit)**")
          .setColor("BLUE")

        let msg = await message.channel.send({
            embeds: [embed]
        });

        await msg.react("🇦")
        await msg.react("🇧")

        const filter = (reaction, user) => {
            return user.id === message.author.id
        }

        const collector = msg.createReactionCollector({
            filter,
            max: 1,
            time: 1000 * 20
        })


        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                await msg.delete()

                return message.channel.send("Operation cancelled. You did not react in time.")
            }

            collected.forEach(async (emoji) => {
                if (emoji.emoji.name === "🇦") {
                      await msg.delete();
                      luau = true;
                      await ask_bytecode();
                      
                } else if (emoji.emoji.name == "🇧") {
                      await msg.delete();
                      luau = false;
                      await ask_bytecode();
                    }
                })
            })
      }

      async function ask_bytecode() {
        const embed = new MessageEmbed()
          .setTitle("Config: **Lua Type**")
          .setDescription("**Bytecode Type.**\nThe bytecode representation\n\n:regional_indicator_a: : **Arabic**\n:regional_indicator_b: : **English**\n:regional_indicator_c: : **Numbers**\n:regional_indicator_d: : **Russian**\n:regional_indicator_e: : **Whitespace**")
          .setColor("BLUE")

        let msg = await message.channel.send({
            embeds: [embed]
        });

        await msg.react("🇦")
        await msg.react("🇧")
        await msg.react("🇨")
		await msg.react("🇩")
        await msg.react("🇪")

        const filter = (reaction, user) => {
            return user.id === message.author.id
        }

        const collector = msg.createReactionCollector({
            filter,
            max: 1,
            time: 1000 * 20
        })


        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                await msg.delete()

                return message.channel.send("Operation cancelled. You did not react in time.")
            }

            collected.forEach(async (emoji) => {
                if (emoji.emoji.name === "🇦") {
                      await msg.delete();
                      await fs.writeFileSync("config.lua", `return{sun_tzu_qoutes=${sun_tzu},LuaU=${luau},ByteCode_Type="arabic"}`);
                      await ask_anonymous();
                      
                } else if (emoji.emoji.name == "🇧") {
                      await msg.delete();
                      await fs.writeFileSync("config.lua", `return{sun_tzu_qoutes=${sun_tzu},LuaU=${luau},ByteCode_Type="english"}`);
                      await ask_anonymous();
                 } else if(emoji.emoji.name === "🇨") {
                        await msg.delete();
                        await fs.writeFileSync("config.lua", `return{sun_tzu_qoutes=${sun_tzu},LuaU=${luau},ByteCode_Type="numbers"}`);
	
                        await ask_anonymous();
				} else if(emoji.emoji.name === "🇩") {
                        await msg.delete();
                        await fs.writeFileSync("config.lua", `return{sun_tzu_qoutes=${sun_tzu},LuaU=${luau},ByteCode_Type="russian"}`);
	
                        await ask_anonymous();
                    } else if(emoji.emoji.name === "🇪") {
                        await msg.delete();
                        await fs.writeFileSync("config.lua", `return{sun_tzu_qoutes=${sun_tzu},LuaU=${luau},ByteCode_Type="whitespace"}`);
	
                        await ask_anonymous();
                    }
                })
            })
      }

      async function ask_anonymous() {
        const embed = new MessageEmbed()
          .setTitle("**Anonymous Mode**")
          .setDescription("**Anonymous Mode.**\nPrevents you from being logged in <#1022708610234601562>.\n\n:regional_indicator_a: : **No**\n:regional_indicator_b: : **Yes**")
          .setColor("BLUE")

        let msg = await message.channel.send({
            embeds: [embed]
        });

        await msg.react("🇦")
        await msg.react("🇧")

        const filter = (reaction, user) => {
            return user.id === message.author.id
        }

        const collector = msg.createReactionCollector({
            filter,
            max: 1,
            time: 1000 * 20
        })


        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                await msg.delete()

                return message.channel.send("Operation cancelled. You did not react in time.")
            }

            collected.forEach(async (emoji) => {
                if (emoji.emoji.name === "🇦") {
                      await msg.delete();
                      await message.channel.send("Applied settings!")
                      obf(false)
                } else if (emoji.emoji.name == "🇧") {
                      await msg.delete();
                      await message.channel.send("Applied settings!")
                      obf(true)
                    }
                })
            })
      }
      


        const embed = new MessageEmbed()
            .setTitle("Config: **Memestrings**")
            .setDescription("**Memestring Configuration**.\nWhat memestrings would you like?\n\n:regional_indicator_a: : **Community Made Memestrings**\n:regional_indicator_b: : **Sun Tzu qoutes.**")
            .setColor("BLUE")

        let msg = await message.channel.send({
            embeds: [embed]
        });

        await msg.react("🇦")
        await msg.react("🇧")

        const filter = (reaction, user) => {
            return user.id === message.author.id
        }

        const collector = msg.createReactionCollector({
            filter,
            max: 1,
            time: 1000 * 20
        })


        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                await msg.delete()

                return message.channel.send("Operation cancelled. You did not react in time.")
            }

            collected.forEach(async (emoji) => {
                if (emoji.emoji.name === "🇦") {
                    await msg.delete();
                    sun_tzu = false;
                    await ask_lua();
                } else if (emoji.emoji.name == "🇧") {
                    await msg.delete();
                    sun_tzu = true;
                    await ask_lua();
                }
            })
        })
    }
  
    if (message.channel.id == "1022646725032280156") {
        if (message.content.includes("'") || message.content.includes("\n")) return message.reply("String has invalid characters!");
        if (message.content.length > 50) return message.reply("String too long! Keep it below 50 characters.");
        if (message.content == "") return message.reply('No string?')

        let content = message.content.replace("\\", "\\\\")


        let memes = fs.readFileSync("obfuscation/memes.txt")

        fs.writeFileSync("obfuscation/memes.txt", `${memes}"${content}" - ${message.author.username}\n`);

        return message.reply("Added!")
    }
})

client.login(token)