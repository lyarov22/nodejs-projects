const puppeteer = require('puppeteer');

let technodom = 'https://www.technodom.kz/p/smartfon-gsm-apple-iphone-13-128gb-thx-61-12-5-midnight-252945';
let sulpak = 'https://www.sulpak.kz/g/smartfon_apple_iphone_13_128gb_midnight_mlnw3rka';
let shopkz = 'https://shop.kz/offer/smartfon-apple-iphone-13-128gb-blue-mlp13';
let mechta = 'https://www.mechta.kz/product/telefon-sotovyy-apple-iphone-13-128gb-blue';


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

    console.log('technodom: ' + technodomPrice);
    console.log('sulpak: ' + sulpakPrice);
    console.log('shopkz: ' + shopkzPrice);
    console.log('mechta: ' + mechtaPrice)

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
    } else {
        console.log('nonono')
    }

    await browser.close();


}

comparePrices();