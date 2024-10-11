# WebScraper
WebScraper is a tool that navigates a website and collects data from the DOM by targeting specific class names or IDs. <br>
In this case I focused on the [Torfs website men's shoes category](https://www.torfs.be/nl/heren/schoenen/). <br>
The goal is to scrape data such as the images, brand, type and price of each shoe and to display it on a custom-made page.

# Setup
1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run the application**
   ```sh
   node server.js
   ```

# Sources
- [Puppeteer](https://pptr.dev/)
- [Chatgpt](https://chatgpt.com/share/66fbef1d-69f4-8007-863a-5cd45edb54c2)
- [Freecodecamp](https://www.freecodecamp.org/news/web-scraping-in-javascript-with-puppeteer/)

# Encountered obstacles
- Accessing elements:
Fetching data from a specific element can be challenging because some class names or IDs are attributed to multiple elements.

- Cookie popup:
When Puppeteer launches a browser and navigates to the desired website, a cookie popup might appear, preventing any further actions. I had to first check if the cookie popup appeared, as it didn't always show up. If it existed, the code had to click the "accept cookie" button in order to continue scraping data.

- Pressing the "See More" button:
The Torfs website only displays 24 items initially. To load more items, you have to press the "See More" button, which loads 24 additional items. This process needed to be automated to retrieve more than 24 records.

- Filter unusable images:
Some image tags had "backup/placeholder" sources that were not usable on the custom-made page. I filtered these out by checking if the source link contained a valid URL, such as one starting with "http."

