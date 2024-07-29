// src/components/Item.js
import React from 'react';

function Item({ item, toggleItem, removeItem }) {
  return (
    <li style={{ textDecoration: item.addedToCart ? 'line-through' : 'none' }}>
      {item.name} - {item.quantity} x ${item.quantity * item.price.toFixed(2)}
      <button onClick={() => toggleItem(item.id)}>
        {item.addedToCart ? 'Desmarcar' : 'Agregar al Carrito'}
      </button>
      <button onClick={() => removeItem(item.id)}>Eliminar</button>
    </li>
  );
}

export default Item;
