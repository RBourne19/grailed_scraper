const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const sql = require('./sql_functions');
require("dotenv").config();


async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function run() {
  let browser;
  try {
    console.log("Connecting...");
    const browser = await puppeteer.launch({headless: false});
    console.log("Connected.");
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    
    await page.goto("https://www.grailed.com/categories/all");
    await page.setViewport({width: 1620, height: 1024});
    await timeout(5000);
    page.evaluate(_ => {
      window.scrollBy(0, window.innerHeight * 2);
      });
    await timeout(2500);
    for(let i = 0; i <= 5; i++){
      await scrapeFeed(page, i);
      page.evaluate(_ => {
        window.scrollBy(0, window.innerHeight * 1.5);
      });
      await timeout(4000);
      
    }
    
    return browser.close();
  } catch (e) {
    console.error("error", e);
  } finally {
    await browser?.close();
  }
}

run();
//scrapes 40 at a time
//document.querySelector("#CategoryPage > div.FiltersInstantSearch > div.feed-and-filters > div.right > div > div:nth-child(43)")
const scrapeFeed = async (page, iter:number) => {
  const allElements = await page.$$(
    `#CategoryPage > div.FiltersInstantSearch > div.feed-and-filters > div.right > div.feed > div`
  );
  const elements = allElements.slice(iter * 8);
  if (elements) {
    
    for (let i = 0; i < 8; i++) {
      const innerElement = elements[i];
      
      const ePrice = await innerElement.$("div > div > span");
      const priceText = await page.evaluate((e1) => e1?.textContent, ePrice);
      const price: number = +priceText?.slice(1);

      const eTitle = await innerElement.$(
        "a.listing-item-link > div.ListingMetadata-module__metadata___\\+RWy0 > div.ListingMetadata-module__designerAndSize___lbEdw > p.ListingMetadata-module__designer___h3Tc\\+"
      );
      const title: string = await page.evaluate(
        (e1) => e1?.textContent,
        eTitle
      );
      if(title === undefined) continue;
      
      const eSize = await innerElement.$(
        "a.listing-item-link > div.ListingMetadata-module__metadata___\\+RWy0 > div.ListingMetadata-module__designerAndSize___lbEdw > p.ListingMetadata-module__size___e9naE"
      );
      const size: string = await page.evaluate(
        (e1) => e1?.textContent,
        eSize
      );

      const eDesc = await innerElement.$(
        "a.listing-item-link > div.ListingMetadata-module__metadata___\\+RWy0 > div:nth-child(2) > p.ListingMetadata-module__title___Rsj55"
      );
      const desc: string = await page.evaluate(
        (e1) => e1?.textContent,
        eDesc
      );
      const eLink = await innerElement.$(
          "a.listing-item-link"
        );
      const linkJson = await eLink?.getProperty('href');
      const link = await linkJson?.jsonValue();
      const eImgLink = await innerElement.$(
        "a.listing-item-link > div.listing-cover-photo > div.lazyload-wrapper > img"
      );
      const imgLinkJson = await eImgLink?.getProperty('src');
      const imgLink = await imgLinkJson?.jsonValue();

      console.log(`${iter*8 + i + 1}.`);
      console.log(`Size: ${size}`);
      console.log(`Price: ${price}`);
      console.log(`Title: ${title}`);
      console.log(`Desc: ${desc}`);
      console.log(`Image Link: ${imgLink}`)
      console.log(`Link: ${link}\n`);
      sql.insertData(title, size, price, desc, imgLink, link);
    }
    return null;
  } else {
    console.log("Element not found");
  }
}