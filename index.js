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

// CHANGE THESE
const discordusername = 'Game Bot#6808'
const discordtoken = 'ODQ1NzMxMzA2NDk4MjkzODQx.YKlOqA.fMKzHcVkshepd1pHgPVVEUYKDEQ'
const serverId = '844644376826085426'
const guild = client.channels.cache.get('844644376826085426');
const role = ('845381979205140490');
const channel_prefix = 'lobby';
//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Client ID: `+client.user.id)
});

client.on("message", async msg => {
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
	active_channel.send('You must designate players (including yourself) by pasting their id in the play order you wish to create (max 6).'+'\n'+'```+invite 234481484700844033.234481484700844033.234481484700844033.234481484700844033.```');
    	display_game_menu(active_channel);
	//log_game(channel);
  }
  else if (input.includes('+invite ')){
	  console.log('+invite command input');
	  input = input.split('+invite').join('');
	  modify_players(active_channel,input);
  }
  else {
      console.log('command not found');
      return;
  }
});

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
	
	choice='';//change later
	
	if (choice == 'coinflip'){
		coinflip(active_channel);
	}
	else if (choice == 'tictactoe'){
		tictactoe(active_channel);
	}
	else if (choice == 'players'){
		players = modify_players(active_channel);
	}
	else{
		return;
	}
    	console.log('choice made');
    	return choice;
};

function modify_players(active_channel,input){
	  var users = [];
	  var usersIDs = [];
	  var user;
	  var userID;
	  var user_count = 0;
	console.log('logging players');
	  while ((input != '')||(user_count != 6)){
		user = input.substring(0, 19);
		input = input.substring(19, input.length);
	  	user=user.split('.').join('')
		console.log('user logged: ' + user);
		user_count = user_count+1;
		users.push(user);
	  }
	var playerlist_embed = new Discord.MessageEmbed()
	    .setColor('#FFFFFF')
	    .setTitle('active_channel')
	    .addFields(
		    { name: 'Player 1 ID: ', value: users[0]},
		    { name: 'Player 2 ID: ', value: users[1]},
		    { name: 'Player 3 ID: ', value: users[2]},
		    { name: 'Player 4 ID: ', value: users[3]},
		    { name: 'Player 5 ID: ', value: users[4]},
		    { name: 'Player 6 ID: ', value: users[5]},
	    )
	console.log('sending log');
	const player_database = '846190978015428608';
	player_database.send(playerlist_embed);
}

function coinflip(active_channel){
	var tictactoe_embed = new Discord.MessageEmbed()
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
	var msg = active_channel.send(tictactoe_embed)
	.then(function (message) {
              	message.react("👑")
              	message.react("🍑")
		coinflip_winner(message, side);
	})
	
	
}

function coinflip_winner(msg, side){
	if (side == 1){
		tictactoe_embed = new Discord.MessageEmbed()
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
			msg.edit(tictactoe_embed)
		}, 3000);
		}
	else if (side == 2){
		tictactoe_embed = new Discord.MessageEmbed()
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
			msg.edit(tictactoe_embed)
		}, 3000);
	}
}

function tictactoe(active_channel){
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
	    

    active_channel.send(tictactoe_embed)
	.then(function (message) {
              	message.react("↖️")
              	message.react("⬆️")
		message.react("↗️")
		message.react("⬅️")
		message.react("⏹")    
            	message.react("➡️")
	    	message.react("↙️")
	    	message.react("⬇️")
	    	message.react("↘️")
	});
}

client.login(discordtoken); 
