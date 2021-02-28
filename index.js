
const {
  Client,
  Attachment
} = require('discord.js');
const bot = new Client();

const ytdl = require('ytdl-core');

const token = 'your token this here';

const PREFIX = "$";

var version = "1.0.0";

var servers = {};

bot.on('ready', () => {
  console.log('This bot is online! ' + version)
});

bot.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case 'เล่น':

      function play(connection, message) {
        var server = servers[message.guild.id];

        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();

        server.dispatcher.on("end", function() {
          if(server.queue[0]) {
            play(connection, message);
          } else {
            connection.disconnect();
          }
        });

      }

      if(!args[1]) {
        message.channel.send("กูต้องการลิงจากลพบุรี เฮ้ย ลิงค์จากผู้ให้บริการ");
        return;
      }

      if(!message.member.voice.channel) {
        message.channel.send("มึงต้องอยู่ในห้องดิสสักห้องก่อนดิวะ ถ้ามึงไม่อยู่มึงจะได้ยินเสียงเพลงไหมเหล่า ไอ้ห่าราก");
        return;
      }

      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      }

      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection) {
        play(connection, message);
      })

    break;

    case 'ข้าม':
      var server = servers[message.guild.id];
      if(server.dispatcher) server.dispatcher.end();
      message.channel.send("ข้ามไปเลยเพราะควยไรเนี่ย")
    break;

    case 'หยุด':
      var server = servers[message.guild.id];
      if(message.guild.voiceConnection) {
        for(var i = server.queue.length - 1; i >= 0; i--) {
          server.queue.splice(i, 1);
        }

        server.dispatcher.end();
        message.channel.send("เพลงจบแล้ว กูออกไปละจ่ายค่าจ้างกูด้วย!")
        console.log('stopped the queue')
      }

      if(message.guild.connection) message.guild.voiceConnection.disconnect()
      
    break;

  }
});


bot.login(token);
