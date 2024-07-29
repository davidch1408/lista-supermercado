// src/components/ItemList.js
import React from 'react';
import Item from './Item';

function ItemList({ items, toggleItem, removeItem }) {
  return (
    <ul>
      {items.map(item => (
        <Item 
          key={item.id} 
          item={item} 
          toggleItem={toggleItem} 
          removeItem={removeItem} 
        />
      ))}
    </ul>
  );
}

export default ItemList;
