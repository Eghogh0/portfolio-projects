import React, { useState, useEffect } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import CustomerView from './components/CustomerView';
import { getCustomers } from './services/api';
import './App.css';
import { Customer } from './types';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [view, setView] = useState<'list' | 'create' | 'view'>('list');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TastyBites Customer Management</h1>
        <p>Developer: Eghogho Esele (_24120111119)</p>
      </header>

      <nav className="app-nav">
        <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>
          All Customers
        </button>
        <button onClick={() => {
          setSelectedCustomer(null);
          setView('create');
        }} className={view === 'create' ? 'active' : ''}>
          Add New Customer
        </button>
      </nav>

      <main className="app-main">
        {view === 'list' && (
          <CustomerList 
            customers={customers} 
            onSelectCustomer={(cust) => {
              setSelectedCustomer(cust);
              setView('view');
            }}
            onRefresh={fetchCustomers}
          />
        )}
        {view === 'create' && (
          <CustomerForm 
            customer={selectedCustomer || undefined} 
            onSuccess={() => {
              fetchCustomers();
              setView('list');
    }}
    onCancel={() => setView('list')}
          />
        )}

        {view === 'view' && selectedCustomer && (
          <CustomerView 
            customer={selectedCustomer}
            onBack={() => setView('list')}
            onEdit={() => {
              setView('create');
            }}
          />
        )}
        {view === 'view' && selectedCustomer && (
          <CustomerView 
            customer={selectedCustomer} 
            onBack={() => setView('list')}
            onRefresh={fetchCustomers}
          />
        )}
      </main>
    </div>
  );
}

export default App;