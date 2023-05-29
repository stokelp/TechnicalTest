import express from 'express';
import Papa from 'papaparse';
import fs from 'fs';
import cors from 'cors';
import { Band } from '../../types';

const app = express();

app.use(cors())

app.get('/bands', async (req, res) => {
    fs.readFile('metal_bands_2017.csv', 'utf-8', (err, data) => {
        if (err) {
            throw err
        }

        const result = Papa.parse<Band>(data, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: (header) => {
                if (header === 'band_name') {
                    return 'bandName';
                }
                return header;
            },
        });

        res.status(200).send(result.data)
    });
});

app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});
