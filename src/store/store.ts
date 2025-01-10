import { create } from "zustand";
import { z } from "zod";

const BASE_URL = "http://localhost:3001";

const CompanySchema = z.object({
  id: z.string().transform((val) => Number(val)),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  email: z.string().email(),
});

const ConsultancySchema = z.object({
  id: z.string().transform((val) => Number(val)),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  email: z.string().email(),
});

const ConsultantSchema = z.object({
  id: z.string().transform((val) => Number(val)),
  name: z.string(),
  email: z.string().email(),
});

type Company = z.infer<typeof CompanySchema>;
type Consultancy = z.infer<typeof ConsultancySchema>;
type Consultant = z.infer<typeof ConsultantSchema>;

interface StoreState {
  companies: Company[];
  consultancies: Consultancy[];
  consultants: Consultant[];
  fetchCompanies: () => void;
  fetchConsultancies: () => void;
  fetchConsultants: () => void;
}

const useStore = create<StoreState>((set) => ({
  companies: [],
  consultancies: [],
  consultants: [],
  fetchCompanies: async () => {
    const response = await fetch(`${BASE_URL}/companies`);
    const data = await response.json();
    console.log("companies", data);
    const parsedData = CompanySchema.array().parse(data);
    set({ companies: parsedData });
  },
  fetchConsultancies: async () => {
    const response = await fetch(`${BASE_URL}/consultancies`);
    const data = await response.json();
    console.log("consultancies", data);
    const parsedData = ConsultancySchema.array().parse(data);
    set({ consultancies: parsedData });
  },
  fetchConsultants: async () => {
    const response = await fetch(`${BASE_URL}/consultants`);
    const data = await response.json();
    console.log("consultants", data);
    const parsedData = ConsultantSchema.array().parse(data);
    set({ consultants: parsedData });
  },
}));

export default useStore;
