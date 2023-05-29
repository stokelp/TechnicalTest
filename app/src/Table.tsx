import {
    Table as MuiTable,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import React, { useCallback } from "react";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { Band } from "../../types";

const VirtuosoTableComponents: TableComponents<Band> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => <MuiTable {...props} sx={{ borderCollapse: "separate" }} />,
    TableHead,
    TableRow: ({ item, ...props }) => <TableRow key={item.id} {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

export type Order = "asc" | "desc";

export interface TableColumn {
    label: string;
    key: Extract<keyof Band, string>;
    hasSort?: boolean;
    width?: number;
    numeric?: boolean;
}

interface TableProps {
    columns: TableColumn[];
    data: Band[];
    order: Order;
    orderBy: keyof Band;
    onChangeOrder: (orderBy: keyof Band) => void;
}

function Table({
    columns,
    data,
    order,
    orderBy,
    onChangeOrder,
}: TableProps) {
    const handleChangeOrder = (key: keyof Band) => (_: React.MouseEvent) => {
        onChangeOrder(key);
    };

    const fixedHeaderContent = useCallback(
        () => (
            <TableRow>
                {columns.map(({ key, numeric, width, label, hasSort }) => (
                    <TableCell
                        key={key}
                        variant="head"
                        align={numeric ? "right" : "left"}
                        sx={{
                            width: width || 150,
                            backgroundColor: "background.paper",
                        }}
                    >
                        {hasSort ? (
                            <TableSortLabel
                                active={orderBy === key}
                                direction={orderBy === key ? order : "asc"}
                                onClick={handleChangeOrder(key)}
                            >
                                {label}
                            </TableSortLabel>
                        ) : (
                            label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        ),
        [columns, order, orderBy]
    );

    const itemContent = useCallback(
        (_: number, band: Band) =>
            columns.map((column) => (
                <TableCell key={column.key} align={column.numeric ? "right" : "left"}>
                    {band[column.key]}
                </TableCell>
            )),
        [columns]
    );

    return (
        <TableVirtuoso
            style={{ height: '100%', width: '100%' }}
            data={data}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={itemContent}
        />
    );
}

export default Table;
