import path from 'path';
import express from 'express';
import { readLinks } from './utils.js';
import { scrapeData } from './scraper.js';

const app = express();

// Middleware for parsing body and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Search endpoint
app.get('/search', (req, res) => {
    const query = req.query.q || '';  // No need for type casting in JS
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const links = readLinks();

    try {
        // Modify the search query and regex pattern
        const pattern = query.trim().replace(/\s+/g, '[-_ ]');
        const regex = new RegExp('.*' + pattern + '.*', 'i');

        // Filter the links based on the regex
        const filteredLinks = links.filter(link =>
            regex.test(link.href) || regex.test(link.filename)
        );

        // Paginate the results
        const totalResults = filteredLinks.length;
        const startIndex = (page - 1) * limit;
        const paginatedResults = filteredLinks.slice(startIndex, startIndex + limit);

        res.json({
            totalResults,
            totalPages: Math.ceil(totalResults / limit),
            currentPage: page,
            results: paginatedResults,
        });
    } catch (error) {
        console.error('Error with regex:', error);
        res.status(400).json({ error: 'Invalid search query' });
    }
});

// Endpoint to serve the search page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Scraping endpoint
app.get('/scrape', async (req, res) => {
    try {
        const data = await scrapeData();
        res.json(data);
    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
