import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import DisplayData from './components/DisplayData/DisplayData';
import Filter from './components/Filter/Filter';
import papa from 'papaparse';
import { MetalBand } from './components/DisplayData/DisplayData.d';

function App() {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState<MetalBand[]>();
  const stylesRef = useRef<string[]>([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch('/data/data.csv')
      if (!response.body) return null;
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = papa.parse(csv, { header: true }) // object with { data, errors, meta }
      let styles: string[] = [];
      const groups: MetalBand[] = results.data.map((el: any, id) => {
        const style = el.style?.split(',')
        if (style)
          styles = [...style, ...styles];
        return {
          ...el,
          key: id,
          style
        }});
      // array of objects
      stylesRef.current = [...new Set(styles)];
      setData(groups);
    }
    getData()
  }, [])

  return (
    <div className="App">
      <Filter setFilter={setFilter} styles={stylesRef.current}></Filter>
      <DisplayData filter={filter} data={data ? data : []}></DisplayData>
    </div>
  );
}

export default App;
