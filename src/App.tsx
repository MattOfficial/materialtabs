import { useEffect } from "react";
import { Box } from "@mui/material";
import useStore from "./store/store";
import DataTable from "./components/DataTable";
import { TabsPage } from "./components/TabsPage";
import "./App.css";

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

  const tabs = [
    {
      label: "Companies",
      content:
        companies.length > 0 ? <DataTable rows={companies} /> : "Loading...",
    },
    {
      label: "Consultancies",
      content:
        consultancies.length > 0 ? (
          <DataTable rows={consultancies} />
        ) : (
          "Loading..."
        ),
    },
    {
      label: "Consultants",
      content:
        consultants.length > 0 ? (
          <DataTable rows={consultants} />
        ) : (
          "Loading..."
        ),
    },
    {
      label: "Companies",
      content:
        companies.length > 0 ? <DataTable rows={companies} /> : "Loading...",
    },
    {
      label: "Consultancies",
      content:
        consultancies.length > 0 ? (
          <DataTable rows={consultancies} />
        ) : (
          "Loading..."
        ),
    },
    {
      label: "Consultants",
      content:
        consultants.length > 0 ? (
          <DataTable rows={consultants} />
        ) : (
          "Loading..."
        ),
    },
    {
      label: "Companies",
      content:
        companies.length > 0 ? <DataTable rows={companies} /> : "Loading...",
    },
    {
      label: "Consultancies",
      content:
        consultancies.length > 0 ? (
          <DataTable rows={consultancies} />
        ) : (
          "Loading..."
        ),
    },
    {
      label: "Consultants",
      content:
        consultants.length > 0 ? (
          <DataTable rows={consultants} />
        ) : (
          "Loading..."
        ),
    },
    {
      label: "Companies",
      content:
        companies.length > 0 ? <DataTable rows={companies} /> : "Loading...",
    },
    {
      label: "Consultancies",
      content:
        consultancies.length > 0 ? (
          <DataTable rows={consultancies} />
        ) : (
          "Loading..."
        ),
    },
    {
      label: "Consultants",
      content:
        consultants.length > 0 ? (
          <DataTable rows={consultants} />
        ) : (
          "Loading..."
        ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
        }}
      >
        <TabsPage tabs={tabs} />
      </Box>
    </>
  );
}

export default App;
