import React from 'react';
import { Customer } from '../types';
import { deleteCustomer } from '../services/api';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onRefresh: () => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ 
  customers, 
  onSelectCustomer,
  onRefresh
}) => {
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        onRefresh(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  return (
    <div className="list-container">
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.first_name} {customer.surname}</td>
              <td>{new Date(customer.date_of_registration).toLocaleDateString()}</td>
              <td className="actions">
                <button 
                  onClick={() => onSelectCustomer(customer)}
                  className="view-btn"
                >
                  View
                </button>
                <button 
                  onClick={() => handleDelete(customer.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;