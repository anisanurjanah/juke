import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/api";

export default function EmployeeList({ onEdit }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const { data } = await getEmployees();
    setEmployees(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      await deleteEmployee(id);
      fetchEmployees();
    }
  };

  return (
    <div>
      <button 
        onClick={() => onEdit(null)}
        className="px-3 py-1 my-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Add New
      </button>
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Position</th>
            <th className="p-3 text-left">Salary</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(employees) && employees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{employee.name}</td>
                <td className="p-3">{employee.email}</td>
                <td className="p-3">{employee.position}</td>
                <td className="p-3">Rp {employee.salary.toLocaleString()}</td>
                <td className="p-3 text-center flex gap-2 justify-center">
                  <button 
                    onClick={() => onEdit(employee)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(employee.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
