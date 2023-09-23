const puppeteer = require('puppeteer');

let technodom = 'https://www.technodom.kz/p/smartfon-gsm-apple-iphone-13-128gb-thx-61-12-5-midnight-252945';
let sulpak = 'https://www.sulpak.kz/g/smartfon_apple_iphone_13_128gb_midnight_mlnw3rka';
let shopkz = 'https://shop.kz/offer/smartfon-apple-iphone-13-128gb-blue-mlp13';
let mechta = 'https://www.mechta.kz/product/telefon-sotovyy-apple-iphone-13-128gb-blue';
let alser = 'https://alser.kz/p/smartfon-apple-iphone-13-128gb-midnight';

async function comparePrices() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(technodom);
    const technodomPrice = await page.evaluate(() => {
        const price = document.querySelector('.--accented').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''))
    });

    await page.goto(sulpak);
    const sulpakPrice = await page.evaluate(() => {
        const price = document.querySelector('.product__price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''))
    });

    await page.goto(shopkz);
    const shopkzPrice = await page.evaluate(() => {
        const price = document.querySelector('.item_current_price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''))
    });

    await page.goto(mechta);
    const mechtaPrice = await page.evaluate(() => {
        const price = document.querySelector('.text-bold.text-ts5.text-color1').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''))
    });

    await page.goto(alser);
    const alserPrice = await page.evaluate(() => {
        const price = document.querySelector('h2.fw500#text').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''))
    });

    console.log('technodom: ' + technodomPrice);
    console.log('sulpak: ' + sulpakPrice);
    console.log('shopkz: ' + shopkzPrice);
    console.log('mechta: ' + mechtaPrice)
    console.log('alser: ' + alserPrice)

    if (technodomPrice == sulpakPrice && sulpakPrice == shopkzPrice && shopkzPrice == mechtaPrice) {
        console.log('price =')
    } else if (technodomPrice < sulpakPrice && technodomPrice < shopkzPrice && technodomPrice < mechtaPrice){
        console.log('technodom low price')
    } else if (sulpakPrice < technodomPrice && sulpakPrice < shopkzPrice && sulpakPrice < mechtaPrice){
        console.log('sulpak low price')
    } else if (shopkzPrice < technodomPrice && shopkzPrice < sulpakPrice && shopkzPrice < mechtaPrice ){
        console.log('shopkz low price')
    } else if (mechtaPrice < technodomPrice && mechtaPrice < sulpakPrice && mechtaPrice < shopkzPrice ){
        console.log('mechta low price') 
    } else if (alserPrice < technodomPrice && alserPrice < sulpakPrice && alserPrice < shopkzPrice && alserPrice < mechtaPrice){
        console.log('alser low price') 
    } else {
        console.log('nonono')
    }

    await browser.close();


}



const { Telegraf } = require('telegraf');

const bot = new Telegraf('5925644723:AAFeaUraCIYDl30vk9b3bd98d2uak38lOJA');

bot.start((ctx) => {
    // Отправляем сообщение с приветствием и кнопками
    return ctx.reply('Добро пожаловать! Выберите действие:', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Technodom', callback_data: 'button1' },
            { text: 'Sulpak', callback_data: 'button2' },
          ],
          [
            { text: 'Белый Ветер', callback_data: 'button3' },
            { text: 'Alser', callback_data: 'button4' },
          ],
          [{ text: 'Рассчитать', callback_data: 'button5' }],
        ],
      },
    });
  });

const messages = {
  'set1': '',
  'set2': '',
  'set3': '',
  'set4': '',
  'set5': '',
}
 
for (let i = 1; i <= 5; i++) {
    const setCommand = `set${i}`
    const sayCommand = `say${i}`
    bot.command(setCommand, setHandler(setCommand))
    bot.command(sayCommand, sayHandler(setCommand))
  }

function setHandler(setCommand) {
  return function(ctx) {
    ctx.reply(`Введите текст для команды /${setCommand}:`)
    bot.on('text', (ctx) => {
      messages[setCommand] = ctx.message.text
      ctx.reply(`Текст для команды /${setCommand} установлен: ${messages[setCommand]}`)
      bot.off('text')
    })
  }
}

function sayHandler(setCommand) {
  return function(ctx) {
    if (messages[setCommand]) {
      ctx.reply(`Ваш текст: ${messages[setCommand]}`)
    } else {
      ctx.reply(`Текст для команды /${setCommand} не установлен. Введите команду /${setCommand}, чтобы установить текст.`)
    }
  }
}
  
bot.action('button1', (ctx) => {

});
bot.action('button2', (ctx) => {

});
bot.action('button3', (ctx) => {

});
bot.action('button4', (ctx) => {

});
bot.action('button5', (ctx) => {
    comparePrices()

});

bot.launch();