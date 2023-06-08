import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const RowVisualisation = ({ row }) => {
    return(
        <TableRow
            key={row.band_name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {row.band_name}
            </TableCell>
            <TableCell align="right">{row.fans}</TableCell>
            <TableCell align="right">{row.formed}</TableCell>
            <TableCell align="right">{row.origin}</TableCell>
            <TableCell align="right">{row.split}</TableCell>
            <TableCell align="right">{row.style}</TableCell>
        </TableRow>
    )
}

export default function DatabaseVisualization({data}) { 
    const rows = data;
    return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Fans</TableCell>
                            <TableCell align="right">Formed</TableCell>
                            <TableCell align="right">Origin</TableCell>
                            <TableCell align="right">Split</TableCell>
                            <TableCell align="right">Style</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <RowVisualisation row={row} key={index} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}