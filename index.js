const { Client } = require('discord.js');
const { play, stop } = require('./command');

const bot = new Client();

bot.login('ODE1NDg3NDgyNTE0NTA1NzM4.YDtH5g.w-GWECSI23WXCh3KFnM7bJn_28g');

bot.on('ready', () => console.log('Bot has logged in!'));

bot.on('message', (msg) => {
  if (msg.author.bot) return;

  const prefix = '.'; // .play
  if(!msg.content.startsWith(prefix)) return;

  const commandName = getCommandName(prefix, msg.content);
  const args = getCommandArgs(prefix, msg.content);

  if(commandName === 'play')
    return play(msg, args);
  else if(commandName === 'stop')
    return stop(msg, args);

});

function getCommandName(prefix, content) {
  return content // .play addmjr
    .slice(prefix.length) // play addmjr
    .split(' ')[0]; // play 
}

function getCommandArgs(prefix, content) {
  return content
    .slice(prefix.length)
    .split(' ')
    .slice(1);
}
