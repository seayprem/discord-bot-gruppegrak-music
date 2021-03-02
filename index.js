const { Client } = require('discord.js');
const { play, stop } = require('./command');

// ประกาศตัวแปร bot ใน library discord.js
const bot = new Client();

// ใส่ Token ของคุณลงไป
bot.login('Input your token');

// เป็นการเปิดคำสั่งให้ทำงานตามที่ต้องการได้
bot.on('ready', () => console.log('Bot has logged in!'));

bot.on('message', (msg) => {
  if (msg.author.bot) return;

  // ตั่งค่าคำนำหน้าของคำสั่ง
  const prefix = '.'; // .play

  // ถ้าไม่มีคนอยู่ในห้องจะไม่สามารถเล่นได้
  if(!msg.content.startsWith(prefix)) return;

  
  const commandName = getCommandName(prefix, msg.content);
  const args = getCommandArgs(prefix, msg.content);
  
  // ตั่งค่าตัวคำสั่งต่างๆ
  if(commandName === 'play' || commandName === 'p')
    return play(msg, args);
  else if(commandName === 'stop')
    return stop(msg, args);

});

// ฟังก์ชั่นในการรับคำสั่งมาประมวลผล
function getCommandName(prefix, content) {
  return content 
    .slice(prefix.length) 
    .split(' ')[0]; 
}

// ฟังก์ชั่นในการรับคำสั่งมาประมวลผล สามารถหั่นคำที่ผมลงไปได้
function getCommandArgs(prefix, content) {
  return content
    .slice(prefix.length)
    .split(' ')
    .slice(1);
}
