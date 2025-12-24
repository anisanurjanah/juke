import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

export default function App() {
  const [editEmp, setEditEmp] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (employee) => {
    setEditEmp(employee);
    setShowForm(true);
  };

  const handleDone = () => {
    setShowForm(false);
    setEditEmp(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Employee Management
        </h1>
        {
          showForm ? (
            <EmployeeForm employee={editEmp} onDone={handleDone} />
          ) : (
            <EmployeeList onEdit={handleEdit} />
          )
        }
      </div>
    </div>
  );
}
