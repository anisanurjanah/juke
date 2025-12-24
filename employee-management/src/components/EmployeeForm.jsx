import React, { useState, useEffect } from "react";
import { createEmployee, updateEmployee } from "../services/api";

export default function EmployeeForm({ employee, onDone }) {
  const [form, setForm] = useState({ name: "", position: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) setForm(employee);
  }, [employee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.position) errs.position = "Position is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (employee) await updateEmployee(employee.id, form);
    else await createEmployee(form);

    onDone();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mb-4">
      <h2 className="text-lg font-semibold mb-3">Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            name="name" 
            value={form.name} 
            onChange={handleChange} />
          <p style={{ color: "red" }}>{errors.name}</p>
        </div>

        <div>
          <label>Position</label>
          <input 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            name="position" 
            value={form.position} 
            onChange={handleChange} />
          <p style={{ color: "red" }}>{errors.position}</p>
        </div>

        <button 
          type="submit"
          className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
          Save
        </button>
        <button 
          type="button" onClick={onDone}
          className="mt-3 w-full bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-lg">
          Cancel
        </button>
      </form>
    </div>
  );
}
