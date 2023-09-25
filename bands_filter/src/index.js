import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class UploadCsvFile extends React.Component {
  render() {
    return (
      <div>
        <h1 id="tuto">
          Upload your CSV file
        </h1>
        <input
          type="file"
          name="CSV_file"
          accept=".csv"
          style={{ display: "block", margin: "30px auto" }}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <UploadCsvFile />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
