import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

export async function loadData() {
    try {
        const csvFilePath = path.join(process.cwd(), 'public', 'metal_bands_2017.csv');
        const csvData = fs.readFileSync(csvFilePath, 'utf-8');
        const results = Papa.parse(csvData, { header: true });
        const rows = results.data;
        return(rows);
    } catch (err) {
        console.warn(err);
        return null;
    }
}
