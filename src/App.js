// src/App.js
import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';

function App() {
  const [items, setItems] = useState([]);

  // Cargar los artículos desde localStorage cuando la aplicación se inicializa
  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Guardar los artículos en localStorage cada vez que se actualiza el estado
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = (name, quantity, price) => {
    const newItem = {
      id: Date.now(),
      name,
      quantity,
      price: parseFloat(price),
      addedToCart: false
    };
    setItems([...items, newItem]);
  };

  const toggleItem = (id) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id ? { ...item, addedToCart: !item.addedToCart } : item
      );
      // Reorganizar los artículos: los no marcados primero, los marcados al final
      updatedItems.sort((a, b) => a.addedToCart - b.addedToCart);
      return updatedItems;
    });
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearList = () => {
    setItems([]);
  };

  // Calcular el total del carrito incluyendo todos los artículos
  const totalCartPrice = items.reduce((total, item) => 
    total + item.price * item.quantity
  , 0);

  return (
    <div className="App">
      <h1>Lista de Supermercado</h1>
      <AddItemForm addItem={addItem} />
      <ItemList items={items} toggleItem={toggleItem} removeItem={removeItem} />
      <h2>Total a Pagar: ${totalCartPrice.toFixed(2)}</h2>
      <button onClick={clearList}>Vaciar Lista</button>
    </div>
  );
}

export default App;
