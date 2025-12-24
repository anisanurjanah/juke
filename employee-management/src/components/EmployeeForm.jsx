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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        <p style={{ color: "red" }}>{errors.name}</p>
      </div>

      <div>
        <label>Position</label>
        <input name="position" value={form.position} onChange={handleChange} />
        <p style={{ color: "red" }}>{errors.position}</p>
      </div>

      <button type="submit">Save</button>
      <button type="button" onClick={onDone}>Cancel</button>
    </form>
  );
}
