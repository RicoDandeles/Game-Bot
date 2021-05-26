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
	// cache gamestate updates
	var channel = active_channel;
	var game_name='game menu';
	var game_status='end';
	var player1='';
	var player2='';
	var player3='';
	var player4='';
	var player5='';
	var player6='';
	var player1_bet='';
	var player2_bet='';
	var player3_bet='';
	var player4_bet='';
	var player5_bet='';
	var player6_bet='';
	// 
	var database_return = await fetch_messages(active_channel);
	var database_return_id;
	var database_return_msg;
	console.log(database_return);
	console.log('fetched');
	if (database_return != 'not found'){
		database_return_msg = database_return[0]
		database_return_id = database_return[2];
		database_return = database_return[1];
		// retrieve database information
		channel = (database_return.split('|')[0]).split('Channel ID: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		game_name = (database_return.split('|')[0]).split('Game Name: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		game_status = (database_return.split('|')[0]).split('Game Status: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player1 = (database_return.split('|')[0]).split('Player 1: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player2 = (database_return.split('|')[0]).split('Player 2: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player3 = (database_return.split('|')[0]).split('Player 3: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player4 = (database_return.split('|')[0]).split('Player 4: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player5 = (database_return.split('|')[0]).split('Player 5: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player6 = (database_return.split('|')[0]).split('Player 6: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player1_bet = (database_return.split('|')[0]).split('Player 1 Bet: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player2_bet = (database_return.split('|')[0]).split('Player 2 Bet: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player3_bet = (database_return.split('|')[0]).split('Player 3 Bet: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player4_bet = (database_return.split('|')[0]).split('Player 4 Bet: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player5_bet = (database_return.split('|')[0]).split('Player 5 Bet: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		player6_bet = (database_return.split('|')[0]).split('Player 6 Bet: ').join('').split(' ').join('');
		database_return = database_return.split(database_return.split('|')[0]+'|').join('');
		
		// overwrite database information
		switch (emojiName) {
  			case '1️⃣':
  			  player1 = userID;
			  console.log('player 1 updated: ' + player1);
  			  break;
			case '2️⃣':
  			  player2 = userID;
			  console.log('player 2 updated: ' + player2);
  			  break;
			case '3️⃣':
  			  player3 = userID;
		  	  console.log('player 3 updated: ' + player3);
  			  break;
  			case '4️⃣':
  			  player4 = userID;
			  console.log('player 4 updated: ' + player4);
  			  break;
			case '5️⃣':
  			  player5 = userID;
			  console.log('player 5 updated: ' + player5);
  			  break;
			case '6️⃣':
  			  player6 = userID;
			  console.log('player 6 updated: ' + player6);
  			  break;
			case '🪙':
  			  game_name = 'coinflip';
			  console.log('game name updated: ' + game_name);
  			  break;
			case '#️⃣':
  			  game_name = 'tictactoe';
			  console.log('game name updated: ' + game_name);
  			  break;
		}
		database_return_id.edit('Channel ID: ' + channel + ' | ' + 'Game Name: ' + game_name + ' | ' + 'Game Status: ' + game_status + ' | ' + 'Player 1: ' + player1 + ' | ' + 'Player 2: ' + player2 + ' | ' + 'Player 3: ' + player3 + ' | '  + 'Player 4: ' + player4 + ' | ' + 'Player 5: ' + player5 + ' | ' + 'Player 6: ' + player6 + ' | ' + 'Player 1 Bet: ' + player1_bet + ' | ' + 'Player 2 Bet: ' + player2_bet + ' | ' + 'Player 3 Bet: ' + player3_bet + ' | '  + 'Player 4 Bet: ' + player4_bet + ' | ' + 'Player 5 Bet: ' + player5_bet + ' | ' + 'Player 6 Bet: ' + player6_bet + ' | ')
		                 
	}
	else {
		switch (emojiName) {
  			case '1️⃣':
  			  player1 = userID;
			  console.log('player 1 updated: ' + player1);
  			  break;
			case '2️⃣':
  			  player2 = userID;
  			  break;
			case '3️⃣':
  			  player3 = userID;
  			  break;
  			case '4️⃣':
  			  player4 = userID;
  			  break;
			case '5️⃣':
  			  player5 = userID;
  			  break;
			case '6️⃣':
  			  player6 = userID;
  			  break;
			case '🪙':
  			  game_name = 'coinflip';
  			  break;
			case '#️⃣':
  			  game_name = 'tictactoe';
  			  break;
		}
		client.channels.cache.get(game_log_channel).send('Channel ID: ' + channel + ' | ' + 'Game Name: ' + game_name + ' | ' + 'Game Status: ' + game_status + ' | ' + 'Player 1: ' + player1 + ' | ' + 'Player 2: ' + player2 + ' | ' + 'Player 3: ' + player3 + ' | '  + 'Player 4: ' + player4 + ' | ' + 'Player 5: ' + player5 + ' | ' + 'Player 6: ' + player6 + ' | ' + 'Player 1 Bet: ' + player1_bet + ' | ' + 'Player 2 Bet: ' + player2_bet + ' | ' + 'Player 3 Bet: ' + player3_bet + ' | '  + 'Player 4 Bet: ' + player4_bet + ' | ' + 'Player 5 Bet: ' + player5_bet + ' | ' + 'Player 6 Bet: ' + player6_bet + ' | ');
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fetch Messages

async function fetch_messages(searched_channel_id){
	client.channels.cache.get(game_log_channel).messages.fetch({ limit: 10 })
		.then(messages => {
			keys = Array.from(messages.keys());
			console.log(keys);
			for ( var i=0; i < keys.length; i++){
				console.log('iterating through messages');
				client.channels.cache.get(game_log_channel).messages.fetch(keys[i])
					.then(msg => {
						var msgContent = msg.content;
						if (msgContent === undefined){
							msgContent = 'undefined';
							console.log('undefined message');
						}
						else if (msgContent.includes(searched_channel_id)){
							console.log('channel record found in logs');
							return [ msg, msgContent, msg.id ];
						}
					});
			}
		});
	await sleep(50);
	return 'not found';
};
	

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
