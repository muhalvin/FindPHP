const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = "https://windows.php.net/downloads/releases/archives/";

async function scrapeData() {
    try {
        // Fetch HTML from the page
        const { data } = await axios.get(url);

        // Use cheerio to parse the HTML
        const $ = cheerio.load(data);
        const links = [];

        // Parse <a> elements to extract href and filename
        $("a").each((index, element) => {
            const href = $(element).attr("href");
            const filename = $(element).text().trim();

            if (href && filename && !/debug|devel|test|txt|sha1sum/i.test(filename)) {
                links.push({
                    href: "https://windows.php.net" + href,
                    filename: filename,
                });
            }
        });

        await saveDataToJson(links);
        return links;
    } catch (error) {
        console.error("Error scraping data:", error);
        return [];
    }
}

async function saveDataToJson(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync("./public/json/data.json", jsonData);
        console.log("Data saved to data.json");
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

module.exports = { scrapeData };
