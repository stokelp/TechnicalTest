import React, { useState, useEffect } from "react";
import bandsData from "../public/data/metal_bands_2017.json";

export default function BandsList({}) {
  const [bands, setBands] = useState([]);
  const [availableStyles, setAvailableStyles] = useState([]);

  useEffect(() => {
    // Sort band_name in alphabetical order
    const sortedBands = bandsData.sort((a, b) => {
      if (a.band_name < b.band_name) {
        return -1;
      }
      if (a.band_name > b.band_name) {
        return 1;
      }
      return 0;
    });
    console.log("sortedBands", sortedBands);

    setBands(sortedBands);

    // Extract all styles
    const getAllStyles = (data) => {
      const styles = [];
      for (const band of data) {
        if (band.style) {
          const styleList = band.style.split(",");
          for (const style of styleList) {
            if (!styles.includes(style)) {
              styles.push(style);
            }
          }
        }
      }

      return styles;
    };
    const allStyles = getAllStyles(bandsData);
    console.log("allStyles", allStyles);

    // Sort styles alphabetically
    const sortedStyles = allStyles.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    console.log("sortedStyles", sortedStyles);
    setAvailableStyles(sortedStyles);
  }, []);

  return (
    <div>
      <h1>Band List</h1>
      <div>
        <label htmlFor="styleSelect">Select a Style:</label>
        <select id="styleSelect">
          <option value="">All Styles</option>
          {availableStyles.map((style, index) => (
            <option key={index} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {bands.map((band, index) => (
          <li key={index}>
            <strong>{band.band_name}</strong> - {band.origin}
          </li>
        ))}
      </ul>
    </div>
  );
}
