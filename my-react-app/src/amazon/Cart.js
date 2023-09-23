import React from "react";
import { useCart } from "./CartProvider";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const { cartItems, calculateTotal, CbuyNow, setCartItems } = useCart();
  const nav = useNavigate();
  const loc = useLocation();
  const item = loc.state;
  const checkk = (id) => {
    let check = cartItems.filter((item) => item.id !== id && item.id === id);
    setCartItems(check);
  };

  /* const handleBuyNow = () => {
    cartItems.forEach((item) => {
      CbuyNow(item)
    });
    cartItems.filter(item => {
      return(
       checkk(item.id)
      )
    })
  //  console.log('Buy Now clicked for item:', item);
  if(item.Qty > 0){ 
    nav('/Checkout')
    } else
    alert('Quantity is not selected')
  }
   */

  const handleBuyNow = () => {
    cartItems.forEach((item) => {
      CbuyNow(item);

      if (item.Qty > 0) {
        /*  cartItems.forEach((item) => {
          CbuyNow(item); */
        nav("/Checkout");
        cartItems.filter((item) => {
          return checkk(item.id);
        });
        /*   cartItems.forEach((item) => {
            CbuyNow(item); */
      } else alert("Quantity is not selected");
    });
  };

  const handleDeleteC = (id) => {
    const filteredCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCartItems);
  };

  const handleQuantityChangeC = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            Qty: newQuantity,
          }
        : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <div className="container">
      <h2>Cart Items:</h2>
      {cartItems.length === 0 ? (
        <div>Cart is empty.</div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Price: ₹{item.Price}/-</p>
                <label>
                  Qty:
                  <select
                    name="Qty:"
                    value={item.Qty}
                    onChange={(e) =>
                      handleQuantityChangeC(item.id, e.target.value)
                    }
                  >
                    {[
                      ...Array(Math.max(item.maxQuantity || 10, 0) + 1).keys(),
                    ].map((q) => (
                      <option key={q} value={q}>
                        {q === 0 ? "0" : q}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={() => handleDeleteC(item.id)}>
                  {" "}
                  <DeleteIcon />{" "}
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>Total: ₹{calculateTotal(cartItems)}</h3>
            <button onClick={handleBuyNow} className="btn btn-success">
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
/* const Cart = () => {
  const { cartItems, calculateTotal, CbuyNow, setCartItems} = useCart()
  // const {quantity} = props
  // const [currentQuantity, setCurrentQuantity] = useState(quantity)
  const nav = useNavigate()
  const loc = useLocation()
  const item = loc.state
 // console.log(item,'cartQty')
  const handleBuyNow = () => {
    cartItems.filter(item => {
      return(
        CbuyNow(item)
      )
    })
  console.log('Buy Now clicked for item:', item);
   nav('/Checkout')
 }
 const handleDeleteC= (id) => {
  let filterData = cartItems.filter(items => items.id !== id)          
  setCartItems(filterData)
 }
 const handleQuantityChangeC = (id, newQuantity) => {

  //const updateQty = cartItems.map(item => item.id === id ? { ...item,Qty:newQuantity} : item) 
  let check = cartItems.map(item => {
   
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
      console.log(item,'4343')
  check = check.filter(item => item !== null);
  
console.log(check,'Cartqty')
   setCartItems(check);
} 
 //console.log(itemQty,"CartQty4747")
  return (
    <div className="container">
      <h2>Cart Items:</h2>
      {cartItems.length === 0 ? (
        <div>Cart is empty.</div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className='cart-item'>
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>Price: ₹{item.Price}/-</p>
              <label>
                  Qty:
                  <select
                    name="Qty:"
                    value={item.Qty}
                    onChange={(e) => handleQuantityChangeC(item.id, e.target.value)}
                  >
                    {[...Array(Math.max(item.maxQuantity || 10, 0) + 1).keys()].map(q => (
                      <option key={q} value={q}>
                        {q === 0 ? '0 (delete)' : q}
                      </option>
                    ))}
                  </select>

                </label>
              <button onClick={() => handleDeleteC(item.id)}> <DeleteIcon/> </button>
            </div>
          </div>
        ))}
          <div className='total'>
            <h3>Total: ₹{calculateTotal()}</h3>
            <button onClick={handleBuyNow} className="btn btn-success">Buy Now</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart */
