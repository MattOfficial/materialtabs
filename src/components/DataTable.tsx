import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { Company, Consultancy, Consultant } from "../store/store";

interface IDataTableProps<T extends Company | Consultancy | Consultant> {
  rows: T[];
}

export default function DataTable<
  T extends Company | Consultancy | Consultant
>({ rows }: IDataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const columns = Object.keys(rows[0]).map((key) => ({
    field: key,
    headerName: key,
  }));

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleRow = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (selectedRows.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = new Set(rows.map((row) => row.id));
      setSelectedRows(newSelected);
    } else {
      setSelectedRows(new Set());
    }
  };

  return (
    <Paper sx={{ height: 400, width: "auto" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Switch
                  checked={rows.length > 0 && selectedRows.size === rows.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align="center"
                  style={{
                    width: column.field === "id" ? 70 : undefined,
                    flex: column.field === "id" ? 0 : 1,
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: T) => (
                <TableRow key={row.id}>
                  <TableCell align="center">
                    <Switch
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleToggleRow(row.id)}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.field} align="center">
                      {/* @ts-expect-error no-implicit-any */}
                      {row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
