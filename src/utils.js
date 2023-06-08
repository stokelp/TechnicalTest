export const filterText = (inputText, data, key) => {
    const keyWord = inputText.toLowerCase();
    const filteredData = data.filter((row) => {
        if (row[key]?.length >= 0) {
            return row[key].some((rowWord) => rowWord.toLowerCase().indexOf(keyWord) > -1);
        }
        if (row[key]){
            return row[key].toLowerCase().indexOf(keyWord) > -1;
        }
        return false;
    });
    // console.log(filteredData);
    return filteredData;
 }