import puppeteer from 'puppeteer';

const getShoes =  async () => {
    console.log("function start");
    

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: undefined,
  });

  const page = await browser.newPage();

  // Navigate the page to a URL
   await page.goto("https://www.torfs.be/nl/heren/schoenen/", {
    waitUntil: "domcontentloaded",
  });

  
};

getShoes();