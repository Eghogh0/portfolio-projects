import { Customer, Order } from '../types';

const API_URL = 'http://localhost:8000';

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_URL}/customers/`);
  return await response.json();
};

export const getCustomer = async (id: number): Promise<Customer> => {
  const response = await fetch(`${API_URL}/customers/${id}/`);
  return await response.json();
};

export const createCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
  const response = await fetch(`${API_URL}/customers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...customer,
      developer_honor: true // Your matric number
    }),
  });
  return await response.json();
};

export const updateCustomer = async (id: number, customer: Partial<Customer>): Promise<Customer> => {
  const response = await fetch(`${API_URL}/customers/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });
  return await response.json();
};

export const deleteCustomer = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/customers/${id}`, {
    method: 'DELETE',
  });
};