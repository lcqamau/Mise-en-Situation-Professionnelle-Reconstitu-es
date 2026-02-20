import React, { useEffect, useState } from 'react';
import '../App.css';

const API_URL = 'http://localhost:3001/customers';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchCustomers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error('Erreur chargement clients:', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async () => {
    if (!name || !email) return;

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      setName('');
      setEmail('');
      setShowModal(false);
      fetchCustomers();
    } catch (err) {
      console.error('Erreur ajout client:', err);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchCustomers();
    } catch (err) {
      console.error('Erreur suppression client:', err);
    }
  };

  return (
    <div>
      <div className="header-row">
        <h2>Liste des clients</h2>
        <button onClick={() => setShowModal(true)} className="nav-button">Ajouter</button>
      </div>

      <div className="responsive-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>
                  <button onClick={() => deleteCustomer(c.id)} className="delete-button">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Ajouter un client</h3>
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <div className="modal-buttons">
              <button onClick={addCustomer} className="nav-button">Enregistrer</button>
              <button onClick={() => setShowModal(false)} className="cancel-button">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
