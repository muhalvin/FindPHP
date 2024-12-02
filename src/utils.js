// utils.js
import fs from 'fs';
import path from 'path';

export const readLinks = () => {
    const filePath = path.join(__dirname, '..', 'public', 'json', 'data.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
};
