import { Prose } from "@nikolovlazar/chakra-ui-prose";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

type DataTableProps = {
  data: (object | number[] | string[])[];
  colDefs: MUIDataTableColumn[];
};

const DataTable = ({ colDefs, data }: DataTableProps) => {
  return (
    <Prose p={"25px"}>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={""}
          data={data}
          columns={colDefs}
          options={{
            rowsPerPage: 10,
            selectableRows: "none",
            elevation: 0,
            tableBodyHeight: "100%",
            tableBodyMaxHeight: "100%",
            responsive: "standard",
          }}
        />
      </ThemeProvider>
    </Prose>
  );
};

export default DataTable;
