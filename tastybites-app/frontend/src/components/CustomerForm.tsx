import React, { useState } from 'react';
import { Customer, CustomerFormProps } from '../types';
import { createCustomer, updateCustomer } from '../services/api';

const CustomerForm: React.FC<CustomerFormProps> = ({ 
  customer, 
  onSuccess, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Omit<Customer, 'id' | 'orders'>>({
    first_name: customer?.first_name || '',
    surname: customer?.surname || '',
    middle_name: customer?.middle_name || '',
    date_of_birth: customer?.date_of_birth || '',
    home_address: customer?.home_address || '',
    date_of_registration: customer?.date_of_registration || new Date().toISOString().split('T')[0],
    developer_honor: customer?.developer_honor || true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (customer?.id) {
        await updateCustomer(customer.id, formData);
      } else {
        await createCustomer(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container">
      <h2>{customer?.id ? 'Edit Customer' : 'Add New Customer'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Add other form fields similarly */}
        
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;