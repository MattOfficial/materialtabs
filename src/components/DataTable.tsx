import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Company, Consultancy, Consultant } from "../store/store";

const paginationModel = { page: 0, pageSize: 5 };

interface IDataTableProps<T extends Company[] | Consultancy[] | Consultant[]> {
  rows: T;
}

export default function DataTable<
  T extends Company[] | Consultancy[] | Consultant[]
>({ rows }: IDataTableProps<T>) {
  const columns: GridColDef[] = Object.keys(rows[0]).map((key, index) => ({
    field: key,
    headerName: key,
    width:
      index === 0
        ? 70
        : Math.floor(
            (window.innerWidth - 70) / (Object.keys(rows[0]).length - 1)
          ),
    flex: index === 0 ? 0 : 1,
    headerAlign: "center",
    align: "left",
  }));

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
