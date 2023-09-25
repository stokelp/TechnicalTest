import React, { useState } from 'react';
import Papa from 'papaparse';

function App() {
  const [csvData, setCsvData] = useState([]);

  const parseCSV = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      complete: function (results) {
        setCsvData(results.data);
        // console.log(results.data);
      },
    });
  };

  return (
    <div>
      <h1 id="title">Upload your CSV file</h1>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={parseCSV}
        style={{ display: "block", margin: "30px auto" }}
      />
    </div>
  );
}

export default App;
