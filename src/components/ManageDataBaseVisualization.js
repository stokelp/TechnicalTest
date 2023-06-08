import  useFilter  from '../hooks/useFilter';
import DatabaseVisualization from './DatabaseVisualization';
import BasicTextFields from './SetFilter';

const ManageDataBaseVisualization = (data) => { 
    const { filterData, handleFilterOnchange } = useFilter(data, 'style');
    if (!filterData) return (<h1>No filterData...</h1>)
    return (
        <>
            <BasicTextFields handleFilterOnchange={handleFilterOnchange} />
            <DatabaseVisualization data={filterData} />
        </>
    )
}

 export default ManageDataBaseVisualization;