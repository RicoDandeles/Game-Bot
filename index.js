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
//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Client ID: `+client.user.id)
});

client.on("message", async msg => {
  var messaged_channel = msg.channel.id;
  var active_channel;
  if (messaged_channel.includes('lobby')) active_channel = messaged_channel;
  else return;
  var input = msg.content;
  /* Commands */
  if (input.includes('+start')){
    msg.delete();
    // Display Available Games Menu
  }
  if ( ){
    
  }
  else if ( ){
      
  }
  else if ( ){
      
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

client.login(discordtoken); 
