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
      return prevItems.map(item => {
        if (item.id === id) {
          // Solo solicitar el precio si el artículo no está en el carrito
          if (!item.addedToCart) {
            const userInput = window.prompt("Por favor, ingrese el precio del artículo:");

            // Si el usuario cancela o no ingresa un número, no hacemos nada
            if (userInput === null || isNaN(userInput)) {
              return item; // Devolvemos el artículo sin cambios
            }

            // Actualizamos el precio del artículo
            item.price = parseFloat(userInput);
          }

          // Cambiar el estado de agregado al carrito
          return { ...item, addedToCart: !item.addedToCart };
        }
        return item;
      }).sort((a, b) => a.addedToCart - b.addedToCart); // Reorganizar después de actualizar
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
