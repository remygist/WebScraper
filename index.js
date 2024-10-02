import puppeteer from "puppeteer";

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

    //get elements from page
    const shoes = await page.evaluate(() => {
        const shoeList = document.querySelectorAll(".product-tile");

        return Array.from(shoeList).map((shoe) => {
            const shoeTitel = shoe.querySelector(".brand a")
                ? shoe.querySelector(".brand a").innerHTML
                : "Unknown Title";

            const shoeImage = shoe.querySelector(".tile-image")
                ? shoe.querySelector(".tile-image").src
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

    const moreBtnSelector = ".btn.btn-primary.px-5";
    const isButton = (await page.$(moreBtnSelector)) !== null;

    if (isButton) {
        // Scroll to the button and click it
        await page.evaluate(() => {
            const btn = document.querySelector(".btn.btn-primary.px-5");
            btn.scrollIntoView();
            btn.click();
        });

        console.log("More button clicked");
    } else {
        console.log("More button not found");
    }

    // browser.close();
};

getShoes();

/* btn code
moreBtn: '\n' +
      '<div class="text-center">\n' +
      '<button class="btn btn-primary px-5" data-url="https://www.torfs.be/on/demandware.store/Sites-Torfs-Webshop-BE-Site/nl_BE/Search-UpdateGrid?cgid=Heren-Schoenen&amp;start=24&amp;sz=24">\n' +
      '<span>Meer</span>\n' +
      '</button>\n' +
      '</div>\n'
  } 
*/
