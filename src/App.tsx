import { useEffect } from "react";
import "./App.css";
import useStore from "./store/store";
import DataTable from "./components/DataTable";
import { Box } from "@mui/material";

function App() {
  const {
    companies,
    consultancies,
    consultants,
    fetchCompanies,
    fetchConsultancies,
    fetchConsultants,
  } = useStore();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchCompanies(),
          fetchConsultancies(),
          fetchConsultants(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [fetchCompanies, fetchConsultancies, fetchConsultants]);

  console.log(companies, consultancies, consultants);

  return (
    <>
      <Box sx={{ justifyContent: "center", width: "100%" }}>
        <h1>Companies:</h1>
        {companies.length > 0 ? <DataTable rows={companies} /> : "Loading..."}
        <br />
        <br />
        <h1>Consultancies:</h1>
        {consultancies.length > 0 ? (
          <DataTable rows={consultancies} />
        ) : (
          "Loading..."
        )}
        <br />
        <br />
        <h1>Consultants:</h1>
        {consultants.length > 0 ? (
          <DataTable rows={consultants} />
        ) : (
          "Loading..."
        )}
      </Box>
    </>
  );
}

export default App;
