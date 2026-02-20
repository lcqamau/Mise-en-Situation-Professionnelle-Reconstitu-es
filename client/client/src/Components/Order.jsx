import React, { useEffect, useState } from 'react';
import '../App.css';

const API_URL = 'http://localhost:3003/orders';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [products, setProducts] = useState([{ productId: '', quantity: 1 }]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Erreur chargement commandes:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = field === 'quantity' ? parseInt(value) : value;
    setProducts(updated);
  };

  const addProductField = () => {
    setProducts([...products, { productId: '', quantity: 1 }]);
  };

  const removeProductField = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const addOrder = async () => {
    if (!customerId || products.some(p => !p.productId || p.quantity <= 0)) return;

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, products }),
      });
      setCustomerId('');
      setProducts([{ productId: '', quantity: 1 }]);
      setShowModal(false);
      fetchOrders();
    } catch (err) {
      console.error('Erreur ajout commande:', err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchOrders();
    } catch (err) {
      console.error('Erreur suppression commande:', err);
    }
  };

  return (
    <div>
      <div className="header-row">
        <h2>Liste des commandes</h2>
        <button onClick={() => setShowModal(true)} className="nav-button">Ajouter</button>
      </div>

      <div className="responsive-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client ID</th>
              <th>Date</th>
              <th>Produits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customerId}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>
                  {o.OrderProducts?.length > 0 ? (
                    <ul>
                      {o.OrderProducts.map((op, i) => (
                        <li key={i}>
                          {op.product?.name || op.productId} × {op.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : <em>Aucun produit</em>}
                </td>
                <td>
                  <button onClick={() => deleteOrder(o.id)} className="delete-button">
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
            <h3>Nouvelle commande</h3>

            <input
              type="text"
              placeholder="ID du client"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="input"
            />

            <h4>Produits</h4>
            {products.map((p, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="ID produit"
                  value={p.productId}
                  onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Quantité"
                  value={p.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                  className="input"
                  style={{ width: '80px' }}
                />
                <button onClick={() => removeProductField(index)} className="delete-button">✖</button>
              </div>
            ))}

            <button onClick={addProductField} className="nav-button">+ Produit</button>

            <div className="modal-buttons">
              <button onClick={addOrder} className="nav-button">Enregistrer</button>
              <button onClick={() => setShowModal(false)} className="cancel-button">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
