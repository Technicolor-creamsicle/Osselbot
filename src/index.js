#!/usr/bin/env node
// Load up the libraries
const Discord = require("discord.js");
const prettyMilliseconds = require('pretty-ms');
const config = require("./config.json");
// This is the client
const client = new Discord.Client();
client.on("ready", () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
	// Example of changing the bot's playing game to something useful. `client.user` is what the
	// docs refer to as the "ClientUser".
	client.user.setActivity(`${client.users.cache.size} of you horrible people`,{ type: 'LISTENING' });
});
//Updates people count
client.on('guildMemberAdd', member => {
	console.log(`New member joined: ${member.name} (id: ${member.id}).`);
	client.user.setActivity(`${client.users.cache.size} of you horrible people`,{ type: 'LISTENING' });
});
client.on('guildMemberRemove', member => {
	console.log(` member left: ${member.name} (id: ${member.id}).`);
  	client.user.setActivity(`${client.users.cache.size} of you horrible people`,{ type: 'LISTENING' });
});
////// ACTUAL MESSAGE PROCESSING
client.on("message", async message => {
	//stops bots from activating the Osselbot
	//Message processing
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	// Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
	//////////////////////////////////////////////////////////////////////////////
	//COMMAND TIME
	//////////////////////////////////////////////////////////////////////////////
	if (command === "reboot"){
		function shutdown(){
			client.destroy();
			process.exit(69);
			}
		if (message.author.id === '216042720047661057') {
			message.reply("**Authenticated**, Restarting now.");
			client.user.setActivity(`Itself die`,{ type: 'WATCHING' });
			setTimeout(shutdown, 5000, 'shutdown');
		}
		else {
			return message.reply("No");
		};
	};
	//////////////////////////////////////////////////////////////////////////////
	if (command === "stats") {
		let embed = new Discord.MessageEmbed()
		.setTitle('Stats')
		.setColor(0x195080)
		.setDescription(`\
**Stats for 0SSELB0T** \n \
**Uptime:** ${prettyMilliseconds(client.uptime)} \n \
**Started at:** ${client.readyAt} \n \
**People:** ${client.users.cache.size}\
`);
		return message.channel.send(embed);
	};
	//////////////////////////////////////////////////////////////////////////////
	if(command === "ping") {
	// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
		const m = await message.channel.send("Ping?");
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms`);
	};
	//////////////////////////////////////////////////////////////////////////////
	//HOW QUOTEABLE
	if(command === "psych") {
		return message.channel.send("Rules for finding a psychopath: \n1. Favorite color is orange \n2. Likes the left burners, worse if its top left\n3. Calls pizza sauce/tomato sauce gravy\n4. Doesnt like salad\n5. Likes country music\n6. Makes hot chocolate with water\n7. Likes black licorice")
	};

	if(command === "ask") {
		return message.channel.send("Dont Ask, Just ask!\n https://iki.fi/sol/dontask.html")
	};

	if(command === "simp") {
		if(!message.member.roles.cache.some(r=>["Admin", "Moderator","Member of the Order of the b l u e","Botmeister"].includes(r.name)) )
	return message.reply("Sorry, you don't have permissions to use this!");
		let embed = new Discord.MessageEmbed()
			.setTitle("SIMP Alert")
			.setURL("https://www.youtube.com/watch?v=c3m4Q07TkMk")
			.setColor(0x195080)
			.setDescription("__**ALERT**__ SIMP detected!")
			.setImage("https://vignette.wikia.nocookie.net/disney/images/6/64/Kronk_.jpg/revision/latest?cb=20160720194635")
			.setTimestamp()
		message.channel.send({embed})
	};

	if(command === "squad") {
		min = Math.ceil(0);
  		max = Math.floor(11);
  		let rate = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
		return message.reply(`The squad rates this ${rate} out of 10`);
	};

	if(command === "magic") {
		return message.channel.send("Do you believe in magic in a young girl\'s heart\nHow the music can free her, whenever it starts\nAnd it\'s magic, if the music is groovy\nIt makes you feel happy like an old-time movie\nI\'ll tell you about the magic, and it\'ll free your soul\nBut it\'s like trying to tell a stranger bout \'rock and roll\'");
	};

	if(command === 'help') {
		return message.reply('https://technicolor.2a03.party/bot/');
	};

	if (command === "fix") {
		if(message.member.roles.cache.some(r=>["Botmeister"].includes(r.name))) {
		return message.channel.send("I guess it\'s my fault will fix.");
		};
		return;
	};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////DEFCON//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
	if(command === "defcon") {
		//5 levels till ban
		if(!message.member.roles.cache.some(r=>["Admin","Member of the Order of the b l u e","Botmeister"].includes(r.name)) )
		return message.reply("Sorry, you don't have permissions to use this!");
		else {
			let member = message.mentions.members.first();
			var role = "";
			switch(parseInt(args[1],10)) {
				case 5:
					var role = message.guild.roles.cache.find(role => role.name === `DEFCON 5`);
					member.roles.add(role);
				break;
				case 4:
					var role = message.guild.roles.cache.find(role => role.name === `DEFCON 4`);
					member.roles.add(role);
						break;
					case 3:
					var role = message.guild.roles.cache.find(role => role.name === `DEFCON 3`);
						member.roles.add(role);
				break;
					case 2:
					var role = message.guild.roles.cache.find(role => role.name === `DEFCON 2`);
					member.roles.add(role);
						break;
					case 1:
					var role = message.guild.roles.cache.find(role => role.name === `DEFCON 1`);
					member.roles.add(role);
						break;
				default:
					return message.reply(`DEFCON not set is ${args[1]} a number between 1-5?`)
			};
			return message.reply(`\n**DEFCON** level set to DEFCON ${args[1]}\nGod Bless their souls`)
		};
	};
});

//Logging in the bot
client.login(config.token)
