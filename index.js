//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialization
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
const fs  = require('fs');
const { writeFileSync } = require('fs');
const { rename }  = require('fs');
const { join } = require('path');
const cheerio = require('cheerio');
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
 
const Discord = require("discord.js");
const { Client, Permissions } = require('discord.js');
const client = new Discord.Client();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// My Variables
const discordusername = 'Game Bot#6808';
const discordtoken = 'ODQ1NzMxMzA2NDk4MjkzODQx.YKlOqA.fMKzHcVkshepd1pHgPVVEUYKDEQ';
const discordid = '845731306498293841';
const serverId = '844644376826085426';
const guild = client.channels.cache.get('844644376826085426');
const role = ('845381979205140490');
const channel_prefix = 'lobby';
const game_log_channel = '846170644978597898';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Ready Event
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Client ID: `+client.user.id)
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Message Event
client.on("message", async msg => {
  if (msg.author.id === discordid) { // the message is coming from the bot
    	return;
  }
  console.log('Message recieved');
  const channel = msg.guild.channels.cache.get(msg.channel.id);
  console.log('Channel: ' + channel.name);
  if ((channel.name).includes(channel_prefix)){
	var active_channel = channel;
	console.log('Channel Verified');
  }
  else {
	console.log('Channel Not Verified');
	return;
  }
  var input = msg.content;
  console.log('command analysis');
  /* Commands */
  if (input.includes('+start')){
    	console.log('+start command input');
    	msg.delete();
	player_slots(active_channel);
    	display_game_menu(active_channel);
  }
  else {
      console.log('command not found');
      return;
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Reaction Event
client.on('messageReactionAdd', (reaction, user) => {
  	if (reaction.message.author.id === user.id) { // the reaction is coming from the bot
    		return;
  	}
	else{
		reaction.message.embeds.forEach((embed) => {
			console.log("Scanning Embed");
			embedRelations(embed.title, reaction.emoji.name, user.id, reaction.message.channel.id);
		});
	}
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Embed Reaction Relations
async function embedRelations(embedTitle, emojiName, userID, active_channel){
	console.log('Embed Title: ' + embedTitle); // embedRelations[0]
	console.log('Emoji: ' + emojiName); // embedRelations[1]
	console.log('UserID: ' + userID); // embedRelations[2]
	console.log('ChannelID: ' + active_channel); // embedRelations[3]
	// recent embed
	if ((searchDatabase('update', active_channel, embedTitle, emojiName, userID)[0])=='fail'){
		var gamelog_embed = new Discord.MessageEmbed()
	    		.setColor('#ffffff')
	    		.setTitle(active_channel)
	    		.addFields( { name: 'embedTitle', value: embedTitle }, )
			.addFields( { name: 'emojiName', value: emojiName }, )
	    		.addFields( { name: 'userID', value: userID }, )
    		gamelog_embed = await game_log_channel.send(gamelog_embed)
	}
	else if ((searchDatabase('update', active_channel, embedTitle, emojiName, userID)[0])=='success'){
		var embed = (searchDatabase('update', active_channel, embedTitle, emojiName, userID)[1]);
		embed.addFields( { name: 'embedTitle', value: embedTitle }, )
		embed.addFields( { name: 'emojiName', value: emojiName }, )
		embed.addFields( { name: 'userID', value: userID }, )
	}
		
	var gamelog_embed = new Discord.MessageEmbed()
	    .setColor('#ffffff')
	    .setTitle('Game Log')
	    .setDescription(active_channel)
	    .addFields( { name: 'Board', value: '' }, )
	    .setTimestamp()
	    .setFooter('The Social Casino', 'https://i.imgur.com/PIIl7yp.jpeg');
	    
	
    	gamelog_embed = await game_log_channel.send(gamelog_embed)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Search Database
async function searchDatabase(command, channelID, embedTitle, emojiName, userID){
	var status;
	game_log_channel.messages.fetch().then(embeds => { // Fetches the last 100 messages of the channel were the command was given
	      	if (command == 'update'){
			if (embeds.title == channelID){
		      		status = 'success';
			}
			else{
				status = 'fail';
			}
			return [status, embeds];
		}
	})
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tools
function generateSerial() {
    'use strict';
    var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        serialLength = 10,
        randomSerial = "",
        i,
        randomNumber;
    for (i = 0; i < serialLength; i = i + 1) {
        randomNumber = Math.floor(Math.random() * chars.length);
        randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    return randomSerial;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Player Slots
async function player_slots(active_channel){
	var players_embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Player Slot Selection')
	    .addFields(
		    { name: 'Slots Rules', value: 'Do not skip slots, otherwise you will not be put in the game. Anyone (not in consecutive slots / over max player slots) will be considered a spectator and will not be able to influence the game(s).'},
	    )
	    .setTimestamp()
	    .setFooter('The Social Casino', 'https://i.imgur.com/PIIl7yp.jpeg');
	    

    	players_embed = await active_channel.send(players_embed)
	await players_embed.react("1️⃣")
	await players_embed.react("2️⃣")
	await players_embed.react("3️⃣")
	await players_embed.react("4️⃣")
	await players_embed.react("5️⃣")
	await players_embed.react("6️⃣")
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Menu
async function display_game_menu(active_channel){
    	var choice;
	var display_embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Game Menu')
	    .addFields(
		    { name: 'Coin Flip 🪙', value: '2 players', inline: true},
		    { name: 'Tic Tac Toe #️⃣', value: '2 players', inline: true},
	    )
	    .setTimestamp()
	    .setFooter('The Social Casino', 'https://i.imgur.com/PIIl7yp.jpeg');
	    

    	display_embed = await active_channel.send(display_embed)
	await display_embed.react("🪙")
	await display_embed.react("#️⃣")
	
	choice = ''; //// remove later
	if (choice == 'coinflip'){
		coinflip(active_channel);
	}
	else if (choice == 'tictactoe'){
		tictactoe(active_channel);
	}
    	console.log('choice made');
    	return choice;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Coin Flip
async function coinflip(active_channel){
	var coinflip_embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Coin Flip')
	    .setDescription('**@Player 1**' + ' VS ' + '**@Player 2**' + '\n\n' + 'BET: ' + '000' + ' chips')
	    .addFields(
		    { name: 'Heads👑', value: 'Player #', inline: true},
		    { name: 'Tails🍑', value: 'Player #', inline: true},
	    )
	    .setTimestamp()
	    .setFooter('The Social Casino', 'https://i.imgur.com/PIIl7yp.jpeg');
	const side = randomInteger(1, 2);
	coinflip_embed = await active_channel.send(coinflip_embed)
	await coinflip_embed.react("👑")
        await coinflip_embed.react("🍑")
	coinflip_winner(coinflip_embed, side);
}

async function coinflip_winner(msg, side){
	if (side == 1){
		coinflip_embed = new Discord.MessageEmbed()
	    		.setColor('#0099ff')
	    		.setTitle('Coin Flip')
	    		.setDescription('**@Player 1**' + ' VS ' + '**@Player 2**' + '\n\n' + 'BET: ' + '000' + ' chips')
	    		.addFields(
		    		{ name: 'Heads👑', value: '@ Player #', inline: true},
		    		{ name: 'Tails🍑', value: '@ Player #', inline: true},
				{ name: '\n👑Heads👑', value: '@Heads WINS!'},
	    		)
			.setImage("https://i.imgur.com/Vo3B0BK.jpg")
	    		.setTimestamp()
	    		.setFooter('The Social Casino', 'https://i.imgur.com/PIIl7yp.jpeg')
		setTimeout(function() {
			msg.edit(coinflip_embed)
		}, 3000);
		}
	else if (side == 2){
		coinflip_embed = new Discord.MessageEmbed()
	    		.setColor('#0099ff')
	    		.setTitle('Coin Flip')
	    		.setDescription('**@Player 1**' + ' VS ' + '**@Player 2**' + '\n\n' + 'BET: ' + '000' + ' chips')
	    		.addFields(
		    		{ name: 'Heads👑', value: '@ Player #', inline: true},
		    		{ name: 'Tails🍑', value: '@ Player #', inline: true},
				{ name: '\n🍑Tails🍑', value: '@Tails WINS!'},
	    		)
			.setImage("https://i.imgur.com/hcvnXJR.jpg")
	    		.setTimestamp()
	    		.setFooter('The Social Casino', 'https://i.imgur.com/PIIl7yp.jpeg')
		setTimeout(function() {
			msg.edit(coinflip_embed)
		}, 3000);
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tic Tac Toe
async function tictactoe(active_channel){
    console.log('tictactoe initializing');
    var one = ':white_large_square:';
    var two = ':white_large_square:';
    var three = ':white_large_square:';
    var four = ':white_large_square:';
    var five = ':white_large_square:';
    var six = ':white_large_square:';
    var seven = ':white_large_square:';
    var eight = ':white_large_square:';
    var nine = ':white_large_square:';
    var end_condition = 'not met';
    var tictactoe_embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Tic Tac Toe')
	    .setDescription('**@Player 1**' + ' VS ' + '**@Player 2**' + '\n\n' + 'BET: ' + '000' + ' chips')
	    .addFields(
		    { name: 'Board', value: one + ' ' + two + ' ' + three + '\n' + four + ' ' + five + ' ' + six + '\n' + seven + ' ' + eight + ' ' + nine },
	    )
	    .setTimestamp()
	    .setFooter('The Social Casino', 'https://i.imgur.com/PIIl7yp.jpeg');
	    

    tictactoe_embed = await active_channel.send(tictactoe_embed)
	await tictactoe_embed.react("↖️")
        await tictactoe_embed.react("⬆️")
	await tictactoe_embed.react("↗️")
	await tictactoe_embed.react("⬅️")
	await tictactoe_embed.react("⏹")    
        await tictactoe_embed.react("➡️")
	await tictactoe_embed.react("↙️")
	await tictactoe_embed.react("⬇️")
	await tictactoe_embed.react("↘️")
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.login(discordtoken); 
