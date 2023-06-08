import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
 const { handleFilterOnchange } = props;
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => {
                handleFilterOnchange(e)
                console.log(e.target.value)
            }} />
        </Box>
    );
}