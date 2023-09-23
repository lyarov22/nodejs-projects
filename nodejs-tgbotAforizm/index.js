
const { Telegraf } = require('telegraf');

const fs = require('fs');
const http = require('http');

const bot = new Telegraf('6217261505:AAFMEeaAdZK4mBKOoXHhEqC-Q_eVCRI6j74');

const aforizmFile = './aforizm.txt';
const aforizms = fs.readFileSync(aforizmFile, 'utf-8').split('\r\n\r\n');

let isJokesRunning = false;
let intervalId;
let intervalTime = 5000;

bot.start((ctx) => {
  ctx.reply(`Привет, я бот JOKEr\nКоманды:\n/joke - начать выводить шутки\n/stop - остановить выводить шутки\n/time 5 - задать интервал вывода шуток.\n\nПример: /time 1 - каждую секунду.\nПо умолчанию интервал равен 5 секунд.`);
});

function getRandomAforizm() {
  let randomIndex = Math.floor(Math.random() * aforizms.length);
  let randomAforizm = aforizms[randomIndex];
  while (randomAforizm.trim() === '') {
    randomIndex = Math.floor(Math.random() * aforizms.length);
    randomAforizm = aforizms[randomIndex];
  }
  return randomAforizm;
}

bot.command('joke', (ctx) => {
  if (isJokesRunning) {
    ctx.reply('Анекдоты уже выводятся, введите /stop, чтобы остановить');
  } else {
    isJokesRunning = true;
    intervalId = setInterval(() => {
      const randomAforizm = getRandomAforizm();
      bot.telegram.sendMessage('@jokefication', randomAforizm);
    }, intervalTime);
  }
});

bot.command('stop', (ctx) => {
  if (!isJokesRunning) {
    ctx.reply('Анекдоты еще не выводятся, введите /joke, чтобы начать');
  } else {
    clearInterval(intervalId);
    isJokesRunning = false;
    ctx.reply('Анекдоты остановлены, введите /joke, чтобы начать заново');
  }
});

bot.command('time', (ctx) => {
  const time = Number(ctx.message.text.split(' ')[1]);
  if (!time || time <= 0) {
    ctx.reply('Введите корректное значение интервала в секундах после команды /time');
  } else {
    intervalTime = time * 1000;
    ctx.reply(`Интервал вывода анекдотов изменен на ${time} секунд`);
    if (isJokesRunning) {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        const randomAforizm = getRandomAforizm();
        bot.telegram.sendMessage('@jokefication', randomAforizm);
      }, intervalTime);
    }
  }
});

bot.launch();
