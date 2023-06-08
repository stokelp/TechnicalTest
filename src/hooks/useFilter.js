import { useState } from 'react';

import { filterText } from '../utils';

export default function useFilter({data}, key = 'style') {
    const [filterData, setFilterData] = useState(data);

        const handleFilterOnchange = (event) => {
            event.preventDefault();
            if (!event.target.value || event.target.value === '') {
                setFilterData(data);
                return;
            }
            const filteredData = filterText(event.target.value, data, key);
            setFilterData(filteredData);
        }
    return { filterData, handleFilterOnchange }
 }