"use strict";

import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());

const getShoes = async () => {
    console.log("function start");

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false,
    });

    // Use the first page opened
    const [page] = await browser.pages();

    // Navigate the page to a URL
    await page.goto("https://www.torfs.be/nl/heren/schoenen/", {
        waitUntil: "domcontentloaded",
    });

    //accept cookies if box appears
    const cookieSelector = "#onetrust-accept-btn-handler";
    try {
        // wait for cookie box to appear
        await page.waitForSelector(cookieSelector, { timeout: 5000 });
        console.log("Cookie box appeared.");
        await page.click(cookieSelector);
    } catch (error) {
        console.log("No cookie box found or failed to load.");
        console.log(error);

    }

    const moreBtnSelector = ".btn.btn-primary.px-5";

    let amountOfBtnClick = 0;

    while (amountOfBtnClick < 9) {
        const isButton = (await page.$(moreBtnSelector)) !== null;

        if (!isButton) {
            console.log("no button found");
            break;
        }

        const initialProductCount = await page.evaluate(() => document.querySelectorAll('.product-tile').length);

        // Scroll to the button and click it
        await page.evaluate(() => {
            const btn = document.querySelector(".btn.btn-primary.px-5");
            btn.scrollIntoView();
            btn.click();
        });

        await page.waitForFunction(
            (initialCount) => document.querySelectorAll('.product-tile').length > initialCount,
            {},
            initialProductCount
        );

        amountOfBtnClick++;
    }

    //get elements from page
    const shoes = await page.evaluate(() => {
        const shoeList = document.querySelectorAll(".product-tile");

        return Array.from(shoeList).map((shoe) => {
            const shoeTitel = shoe.querySelector(".brand a")
                ? shoe.querySelector(".brand a").innerHTML
                : "Unknown Title";

            const shoeImageElement = shoe.querySelectorAll(".tile-image")[0]; // First image element
            const shoeImage = shoeImageElement
                ? (shoeImageElement.src.includes("data:image") && shoeImageElement.getAttribute("data-src"))  // Check if it's a placeholder, if so, try data-src
                    ? shoeImageElement.getAttribute("data-src") // If there's a lazy-loaded image URL in data-src
                    : shoeImageElement.src // Otherwise, use src
                : "No Image Available";

            const shoeType = shoe.querySelector(".pdp-link > a")
                ? shoe.querySelector(".pdp-link > a").innerHTML
                : "Unknown Type";

            const shoePrice = shoe.querySelector(".value")
                ? shoe.querySelector(".value").innerHTML
                : "No Price Available";

            return {
                shoeTitel,
                shoeImage,
                shoeType,
                shoePrice,
            };
        });
    });

    // console.log(shoes);
    browser.close();
    return shoes
};

app.get('/getShoes', async (req, res) => {
    try {
        const shoes = await getShoes();
        res.json(shoes);
    } catch (error) {
        console.error('Error scraping shoes:', error);
        res.status(500).send('Error retrieving shoe data.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

