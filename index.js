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
const serverId = '845730456195301376'/*'844644376826085426'*/
const guild = client.channels.cache.get('845730456195301376'/*'844644376826085426'*/);
const role = ('845732057056935967'/*'845381979205140490'*/);
const channel_prefix = 'test' /*'lobby'*/
//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Client ID: `+client.user.id)
});

client.on("message", async msg => {
  console.log('Message recieved');
  const channel = msg.channel.id;
  console.log('Channel: ' + channel);
  var active_channel;
  if (channel.includes(channel_prefix)){
	active_channel = messaged_channel;
	console.log('Channel Verified');
  }
  else {
	console.log('Channel Not Verified');
	return;
  }
  var input = msg.content;
  /* Commands */
  if (input.includes('+start')){
    msg.delete();
    var choice = display_game_menu(active_channel);
      
  }
  else {
      return;
  }
});

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

function display_game_menu(){
    var choice = 'tictactoe';
    return choice;
}

function tictactoe(active_channel){
    console.log('tictactoe initializing');
    const channel = active_channel;
    const one = ':white_large_square:';
    const two = ':white_large_square:';
    const three = ':white_large_square:';
    const four = ':white_large_square:';
    const five = ':white_large_square:';
    const six = ':white_large_square:';
    const seven = ':white_large_square:';
    const eight = ':white_large_square:';
    const nine = ':white_large_square:';
    const end_condition = 'not met';
    const tictactoe_embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Tic Tac Toe')
	    .setDescription('Tic-tac-toe, is a game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a diagonal, horizontal, or vertical row is the winner.')
	    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
	    .addFields(
		    { name: 'Board', value: one + ' ' + two + ' ' + three + ' ' + four + ' ' + five + ' ' + six + ' ' + seven + ' ' + eight + ' ' + nine },
	    )
	    .addField('Inline field title', 'Some value here', true)
	    .setTimestamp()
	    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

    channel.send(tictactoe_embed);
}

client.login(discordtoken); 
