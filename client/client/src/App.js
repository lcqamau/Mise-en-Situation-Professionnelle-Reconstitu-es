import React, { useState } from 'react';
import CustomerTable from './Components/Customer';
import ProductPage from './Components/Product';
import OrderPage from './Components/Order';
import Dashboard from './Components/Dashboard';
import './App.css';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'customer':
        return <CustomerTable />;
      case 'product':
        return <ProductPage />;
      case 'service':
        return <OrderPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Tableau de Bord</h1>

      <div className="button-group">
        <button className={`nav-button ${activePage === 'customer' ? 'active' : ''}`} onClick={() => setActivePage('customer')}>
          Clients
        </button>
        <button className={`nav-button ${activePage === 'product' ? 'active' : ''}`} onClick={() => setActivePage('product')}>
          Produits
        </button>
        <button className={`nav-button ${activePage === 'service' ? 'active' : ''}`} onClick={() => setActivePage('service')}>
          Commandes
        </button>
      </div>

      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
