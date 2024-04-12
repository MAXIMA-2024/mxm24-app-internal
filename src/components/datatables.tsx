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
    <>
      <Prose
        p={"25px"}
        // w={["full", "80vw", "60vw", "full"]}
        h={["75vh", "75vh", "60vh", "65vh"]}
        overflow={"auto"}
      >
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={""}
            data={data}
            columns={colDefs}
            options={{
              rowsPerPage: 5,
              rowsPerPageOptions: [5, 10, 15, 20],
              selectableRows: "none",
              elevation: 0,
              tableBodyHeight: "auto",
              tableBodyMaxHeight: "none",
              responsive: "vertical",
            }}
          />
        </ThemeProvider>
      </Prose>
    </>
  );
};

export default DataTable;
