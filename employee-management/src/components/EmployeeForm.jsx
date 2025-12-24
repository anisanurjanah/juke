import React, { useState, useEffect } from "react";
import { createEmployee, updateEmployee } from "../services/api";

export default function EmployeeForm({ employee, onDone }) {
  const [form, setForm] = useState(
    { 
      name: "", 
      email: "", 
      position: "", 
      salary: 0 
    }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) setForm(employee);
  }, [employee]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "salary") {
      value = Number(value);
    }
    setForm({ ...form, [e.target.name]: value });
  };

  const validate = () => {
    let errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    if (!form.position) errs.position = "Position is required";
    if (!form.salary) errs.salary = "Salary is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    let payload = {
      ...form,
    };
    if (!employee) {
      payload = {
        ...payload,
        createdAt: new Date().toISOString()
      };
      await createEmployee(payload);
    } else {
      await updateEmployee(employee.id, payload);
    }
    onDone();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mb-4">
      <h2 className="text-lg font-semibold mb-3">Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            type="text"
            name="name" 
            value={form.name} 
            onChange={handleChange} />
          <p style={{ color: "red" }}>{errors.name}</p>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            type="email"
            name="email" 
            value={form.email} 
            onChange={handleChange} />
          <p style={{ color: "red" }}>{errors.email}</p>
        </div>
        <div className="mb-3">
          <label>Position</label>
          <input 
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            name="position" 
            value={form.position} 
            onChange={handleChange} />
          <p style={{ color: "red" }}>{errors.position}</p>
        </div>
        <div className="mb-3">
          <label>Salary</label>
          <input 
            type="number"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            name="salary" 
            value={form.salary} 
            onChange={handleChange} />
          <p style={{ color: "red" }}>{errors.salary}</p>
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
