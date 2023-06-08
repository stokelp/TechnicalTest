import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import ManageDataBaseVisualization from './ManageDataBaseVisualization';


const url = "https://raw.githubusercontent.com/stokelp/TechnicalTest/main/metal_bands_2017.csv"

const papaparsePromify = (url) => new Promise((resolve, reject) => { 
    Papa.parse(url, {
        download: true,
        header: true,
        complete: resolve,
        error: reject
    })
} )

const fetchCsv = async () => {
    try {
        const data = await papaparsePromify(url);
        if (!data?.data) throw new Error('No data')
        if (data.data.length === 0) throw new Error('No data')
        const data_cleaned = data.data.map((row) => {
            const row_cleaned = {
                ...row,
                style: row.style ? row.style?.split(',') : [],
            }
            return (row_cleaned)
        })
        console.log('fetchCsv', data_cleaned);
        return (data_cleaned);
    } catch (error) {
        return ([])
    }
 }

export default function ConnectDataBaseVisualisation() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCsv().then(setData);
    }, []);

    return (
        <>
            <h1>ConnectDataBaseVisualisation</h1>
            {data && data.length > 0 && <ManageDataBaseVisualization data={data} />}
        </>
    )
 }