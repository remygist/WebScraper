# WebScraper
WebScraper is a tool that will go on a website and collect the data in the DOM by looking for specific class names or id's.
In this case I focused on the [Torfs website in the shoes for men category](https://www.torfs.be/nl/heren/schoenen/). 
The goal is to scrape data such as the images, mark, type and price of each shoe and to display it on a selfmade page

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
- [Render](https://dashboard.render.com/)

# Encountered obstacles

- Access elements:
Fetching the data from a single element can sometimes be difficult because of the fact that some class names or id's are attributed to multiple elements.
- Cookie popup:
When puppeteer creates a browser and navigates to the desired website, a cookie popup might appear which will prevent any actions on the website to be taken. So I first had to check if the cookie popup appeared since it did not always do, if it exists the code had to click on the "accept cookie" button in order to continue the process of scraping data.
- Pressing the more button:
The website only shows 24 items on launch, if you want to see more items you have to press the "see more" button which will then load 24 more items. This had to be automated too to get more than 24 records.
- Filter unusable images:
Some image tags had "backup/placeholder" sources which are not usable on the selfmade page. So I had to filter them out by checking if the link contained a http tag in the source link.

