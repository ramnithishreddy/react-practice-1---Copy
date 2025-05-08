export const updateItemQuantity = (items, id, newQuantity) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, Qty: Number(newQuantity) } : item
    );
    return updatedItems;
  };
  
  export const decrementOrRemoveItem = (items, id) => {
    const updatedItems = items
      .map((item) =>
        item.id === id ? { ...item, Qty: item.Qty - 1 } : item
      )
      .filter((item) => item.Qty > 0);
    return updatedItems;
  };
  
  export const removeItemById = (items, id) =>
    items.filter((item) => item.id !== id);
  
  export const persistToSession = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };
  
  export const loadFromSession = (key) =>
    JSON.parse(sessionStorage.getItem(key)) || [];
  