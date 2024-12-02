const fs = require('fs');
const path = require('path');

const readLinks = () => {
    const filePath = path.join(__dirname, '../public/json/data.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
};

module.exports = { readLinks };
