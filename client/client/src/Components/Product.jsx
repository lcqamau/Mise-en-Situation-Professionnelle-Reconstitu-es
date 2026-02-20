import React, { useEffect, useState } from 'react';
import '../App.css';

const API_URL = 'http://localhost:3002/Product';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Champs du formulaire
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Erreur chargement produits:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!name || !price) return;

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock) || 0
        }),
      });
      // Reset
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error('Erreur ajout produit:', err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error('Erreur suppression produit:', err);
    }
  };

  return (
    <div>
      <div className="header-row">
        <h2>Liste des produits</h2>
        <button onClick={() => setShowModal(true)} className="nav-button">Ajouter</button>
      </div>

      <div className="responsive-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price} €</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => deleteProduct(p.id)} className="delete-button">
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
            <h3>Ajouter un produit</h3>
            <input
              type="text"
              placeholder="Nom *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Prix *"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              min="0"
              step="0.01"
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="input"
              min="0"
            />
            <div className="modal-buttons">
              <button onClick={addProduct} className="nav-button">Enregistrer</button>
              <button onClick={() => setShowModal(false)} className="cancel-button">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
