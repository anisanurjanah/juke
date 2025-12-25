import axios from "axios";

const BACKEND_URL = "https://juke-backend.onrender.com";
const TYPICODE_URL = "https://my-json-server.typicode.com/anisanurjanah/juke";

const API = axios.create({
  baseURL: BACKEND_URL
});

export const getEmployees = async () => {
  try {
    const response = await API.get("/employees");
    return response.data;
  } catch (error) {
    console.warn("Render offline, fallback to Typicode");
    const typicodeResponse = await axios.get(`${TYPICODE_URL}/employees`);
    return typicodeResponse.data;
  }
};

// export const getEmployees = () => API.get("/employees");
export const getEmployee = (id) => API.get(`/employees/${id}`);
export const createEmployee = (data) => API.post("/employees", data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
