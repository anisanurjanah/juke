import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

export default function App() {
  const [editEmp, setEditEmp] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (emp) => {
    setEditEmp(emp);
    setShowForm(true);
  };

  const handleDone = () => {
    setShowForm(false);
    setEditEmp(null);
  };

  return (
    <div>
      <h1>Employee CRUD</h1>

      {showForm ? (
        <EmployeeForm employee={editEmp} onDone={handleDone} />
      ) : (
        <EmployeeList onEdit={handleEdit} />
      )}
    </div>
  );
}
