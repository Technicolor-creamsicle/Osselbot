#!/usr/bin/env node
// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".

  client.user.setActivity(`for ;`,{ type: 'LISTENING' });
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`for ;`,{ type: 'LISTENING' });
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`for ;`,{ type: 'LISTENING' });
});
//osseley stop


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
	//people are assholes so this blocks it!
	if(message.content.toLowerCase().includes('osseley','nigger',"nigga","niglet","nigglet","lil adderal")){
		message.member.addRole('654366653093642241').catch(console.error);
	      message.member.removeRole('514254335425773589').catch(console.error);
		console.log(`${message.member} has been detained`)
		return message.reply('Member has been D E T A I N E D <:yikes:632660765878255636>')
	}
  // It's good practice to ignoe other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception ").
  	if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  	if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  	if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    	const m = await message.channel.send("Ping?");
    	m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  	}

  	if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    		const sayMessage = args.join(" ");
		if (!message.member.roles.some(r=>["Admin", "Mods","Member of the Order of the b l u e","Botmeister","Ally of the Order"].includes(r.name)) ){
			if(sayMessage.includes('@')) {
			return message.reply("\nStop pinging yourself \nStop pinging yourself");
		}
			// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
			message.delete().catch(O_o=>{});
			// And we get the bot to say the thing:
			return message.channel.send(sayMessage);
		}
		else {
			return message.channel.send("Im sorry but we cant have nice things...")
		}
	}

  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit:
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Admin", "Moderator","Member of the Order of the b l u e","Botmeister"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator","Member of the Order of the b l u e"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") {
  //Vibe check
	  if(!message.member.roles.some(r=>["Admin","Member of the Order of the b l u e","Botmeister"].includes(r.name)) )
	  return message.reply("Sorry, you don't have permissions to use this!");
  // This command removes all messages from all users in the channel, up to 100.
	  else {
  // get the delete count, as an actual number.
		  const deleteCount = parseInt(args[0], 10);

  // Ooooh nice, combined conditions. <3
		  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
			  return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

  // So we get our messages, and delete them. Simple enough, right?
		  const fetched = await message.channel.fetchMessages({limit: deleteCount});
		  message.channel.bulkDelete(fetched)
			  .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	  }
  };

  if(command === "detain") {
    //For Civilians all partying
    if(!message.member.roles.some(r=>["Admin","Member of the Order of the b l u e","Botmeister"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
	else {
		member.addRole('654366653093642241').catch(console.error);
	      member.removeRole('514254335425773589').catch(console.error);
		return message.reply("Member has been D E T A I N E D <:yikes:632660765878255636>")
	}
  }
  if(command === "retain") {
    //For Civilians all partying
    if(!message.member.roles.some(r=>["Admin","Member of the Order of the b l u e","Botmeister"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
	else {
		member.addRole('514254335425773589').catch(console.error);
	      member.removeRole('654366653093642241').catch(console.error);
		return message.reply("Member has been R E T A I N E D <:MilkTurtle:628399622678773760>")
	}
  }
	// HERE COMES SHITTY COMMANDS MADE BY YOURS TRUELY
	if(command === 'help') {
		return message.reply('https://technicolor.2a03.party/bot/');
	};
	if(command === "rand") {
		//Generates random number between 1-100
		min = Math.ceil(0);
  		max = Math.floor(101);
  		return message.channel.send(Math.floor(Math.random() * (max - min)) + min); //The maximum is exclusive and the minimum is inclusive
	};
	if(command === "oath") {
		return message.reply("The cadet oath is as follows.\nI pledge that I will serve faithfully in the Civil Air Patrol cadet program. That I will attend meetings regularly, wear my uniform properly, obey my officers, and advance my education and training rapidly to prepare myself to be of service to my community state and nation.");
	};
	if(command === "ask") {
		return message.channel.send("Dont Ask, Just ask!\n https://iki.fi/sol/dontask.html")
	};
	if(command === "damage") {
		return message.channel.send("https://cdn.discordapp.com/attachments/619631814696239142/678467158660874270/ohmydamage.mov")
	};
	if(command === "osseley") {
		return message.channel.send("Ohhh Osseley,\n how I missed you sooo much \nOne of these days...")
	};
	if(command === "psych") {
		return message.channel.send("Rules for finding a psychopath: \n1. Favorite color is orange \n2. Likes the left burners, worse if its top left\n3. Calls pizza sauce/tomato sauce gravy\n4. Doesnt like salad\n5. Likes country music\n6. Makes hot chocolate with water\n7. Likes black licorice")
	};
	if(command === "squad") {
		min = Math.ceil(0);
  		max = Math.floor(11);
  		let rate = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
		return message.reply(`The squad rates this ${rate} out of 10`);
	};
	if(command === "magic") {
		return message.channel.send("Do you believe in magic in a young girl\'s heart\nHow the music can free her, whenever it starts\nAnd it\'s magic, if the music is groovy\nIt makes you feel happy like an old-time movie\nI\'ll tell you about the magic, and it\'ll free your soul\nBut it\'s like trying to tell a stranger bout rock and roll")
	}

});

client.login(config.token);
