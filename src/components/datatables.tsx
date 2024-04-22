import { Prose } from "@nikolovlazar/chakra-ui-prose";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

type DataTableProps = {
  data: (object | number[] | string[])[];
  colDefs: MUIDataTableColumn[];
};

const DataTable = ({ colDefs, data }: DataTableProps) => {
  return (
    <Prose h={"100%"}>
      {/* chakra-ui disabled in here */}
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
          }}
        />
      </ThemeProvider>
    </Prose>
  );
};

export default DataTable;
