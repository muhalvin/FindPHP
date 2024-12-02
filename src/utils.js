// utils.js
import fs from 'fs';
import path from 'path';

// Vercel
// const __dirname = new URL('.', import.meta.url).pathname;

// export const readLinks = () => {
//     const filePath = path.join(__dirname, '../public/json/data.json');
//     const rawData = fs.readFileSync(filePath, 'utf-8');
//     return JSON.parse(rawData);
// };

// Local
export const readLinks = () => {
    const filePath = path.join(__dirname, '../public/json/data.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
};
