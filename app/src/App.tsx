import {
    CircularProgress,
    Container,
    TableContainer,
    TextField,
    styled,
} from "@mui/material";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import { Band } from "../../types";
import Table, { Order, TableColumn } from "./Table";
import { filterBand, sort } from "./funcs";

const SContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    paddingBottom: theme.spacing(2)
}));

const SCircularProgress = styled(CircularProgress)({
    margin: 'auto'
})

const Filters = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(2),

    "& >*:last-of-type": {
        marginLeft: theme.spacing(2)
    }
}));

const STableContainer = styled(TableContainer)({
    flex: 1,
})

const columns: TableColumn[] = [
    {
        label: "Name",
        key: "bandName",
        hasSort: true,
    },
    {
        label: "Origin country",
        key: "origin",
    },
    {
        label: "Formed year",
        key: "formed",
        hasSort: true,
        numeric: true,
    },
    {
        label: "Split year",
        key: "split",
        numeric: true,
    },
    {
        label: "Fans",
        key: "fans",
        numeric: true,
    },
    {
        label: "Style",
        key: "style",
        width: 250,
    },
];

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [bands, setBands] = useState<Band[]>([]);
    const [style, setStyle] = useState<string>();
    const [origin, setOrigin] = useState<string>();
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Band>("bandName");

    const filteredBands = useMemo(() => {
        let result: Band[] = bands;
        if (style) {
            result = filterBand(result, 'style', style)
        }
        if (origin) {
            result = filterBand(result, 'origin', origin)
        }
        return result.sort((a, b) => order === 'asc' ? sort(a[orderBy], b[orderBy]) : -sort(a[orderBy], b[orderBy]));
    }, [bands, order, orderBy, style, origin]);

    useEffect(() => {
        const fetchBands = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:3001/bands");
                const bands = (await response.json()) as Band[];

                setBands(bands);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBands();
    }, []);

    const handleChangeFilter = (key: "style" | "origin") =>
        debounce((event: React.ChangeEvent<HTMLInputElement>) => {
            if (key === 'origin') {
                setOrigin(event.target.value);
            } else {
                setStyle(event.target.value)
            }
        }, 300);

    const handleChangeOrder = (key: keyof Band) => {
        setOrder(orderBy === key && order === "asc" ? "desc" : "asc");
        setOrderBy(key);
    };

    return (
        <SContainer>
            {isLoading ? (
                <SCircularProgress />
            ) : (
                <>
                    <Filters>
                        <TextField
                            label={columns[5].label}
                            onChange={handleChangeFilter("style")}
                        />
                        <TextField
                            label={columns[1].label}
                            onChange={handleChangeFilter("origin")}
                        />
                    </Filters>
                    <STableContainer>
                        <Table
                            columns={columns}
                            data={filteredBands}
                            order={order}
                            orderBy={orderBy}
                            onChangeOrder={handleChangeOrder}
                        />
                    </STableContainer>
                </>
            )}
        </SContainer>
    );
}

export default App;
