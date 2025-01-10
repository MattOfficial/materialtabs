import { useEffect } from "react";
import "./App.css";
import useStore from "./store/store";

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
        // Handle any errors that occur during fetching
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [fetchCompanies, fetchConsultancies, fetchConsultants]);

  return (
    <>
      <div>
        <h1>Companies:</h1>
        {companies.map((company) => (
          <div key={company.id}>
            <p>{company.name}</p>
            <p>{company.address}</p>
            <p>{company.city}</p>
            <p>{company.country}</p>
            <p>{company.email}</p>
          </div>
        ))}
        <br />
        <br />
        <h1>Consultancies:</h1>
        {consultancies.map((consultancy) => (
          <div key={consultancy.id}>
            <p>{consultancy.name}</p>
            <p>{consultancy.address}</p>
            <p>{consultancy.city}</p>
            <p>{consultancy.country}</p>
            <p>{consultancy.email}</p>
          </div>
        ))}
        <br />
        <br />
        <h1>Consultants:</h1>
        {consultants.map((consultant) => (
          <div key={consultant.id}>
            <p>{consultant.name}</p>
            <p>{consultant.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
