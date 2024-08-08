// src/components/AddItemForm.js
import React, { useState } from 'react';

function AddItemForm({ addItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity) return;
    addItem(name, quantity, price);
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Artículo" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Cantidad" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
      />
      
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddItemForm;
