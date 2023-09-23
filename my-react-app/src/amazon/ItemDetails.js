import React, { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { useCart } from './CartProvider'

const ItemDetails = () => {
  
  const [ currentQuantity, setCurrentQuantity] = useState(null)
  const loc = useLocation()
  const item = loc.state
  const {addToCart, buyNow} = useCart()
  const nav = useNavigate()

  if (!item) {
    return <div>Item not found</div>
  }

  const handleAddToCart = () => {
  const itemQty = {...item, Qty:currentQuantity}
    
    if(itemQty.Qty > 0) {
    addToCart(itemQty)
    nav('/Cart',{state: itemQty})
  } else
    alert('Quantity is not selected')
  }

 
  const handleBuyNow = () => {    
    const itemQty = {...item, Qty: currentQuantity};
    if (itemQty.Qty > 0) {
      buyNow(itemQty)
      nav('/Checkout')
    } else 
      alert('Quantity is not selected')
  }
  
  
    /* let check = cartItems.map(item => {
      if (item.id === id) {
        const maxQuantity = item.maxQuantity || 10; 
        if (maxQuantity === 0 && newQuantity > 0) {
          return null
        } else {
          return { ...item, Qty: newQuantity }
        }
      }
      return item;
    })
  
    check = check.filter(item => item !== null) */

  const handleQuantityChangeC = (newQuantity) =>{
    setCurrentQuantity(newQuantity)
  }
 /*  const handleQuantityChange = (id, newQuantity) => {
    let check = checkoutItems.map(item => {
      if (item.id === id) {
        const maxQuantity = item.maxQuantity || 10; 
        if (maxQuantity === 0 && newQuantity > 0) {
          return null;
        } else {
          return { ...item, Qty: newQuantity };
        }
      }
      return item;
    })
  
    check = check.filter(item => item !== null);

    setCheckoutItems(check);
  } */
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="col-md-6">
        <h2>{item.title}</h2>
        <h4>Price: ₹{item.Price}/-</h4>
        <label>
                  Qty:
                  <select
                    name="Qty:"
                    value={currentQuantity}
                    onChange={(e) => handleQuantityChangeC(e.target.value)}
                  >
                    {[...Array(Math.max(item.maxQuantity || 10, 1) + 1).keys()].map(q => (
                      <option key={q} value={q}>
                        {q === 1 ? '1' : q}
                      </option>
                    ))}
                  </select>

                </label>
        <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
        <button onClick={handleBuyNow} className="btn btn-success">Buy Now</button>
      </div>
    </div>
  </div>
)
}

export default ItemDetails