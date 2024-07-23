// import React from "react";
// import { useCart } from "./CartProvider";
// import { useNavigate } from "react-router-dom";
// import DeleteIcon from "@mui/icons-material/Delete";

// const Checkout = () => {
//   let { checkoutItems, calculateTotal, setCheckoutItems } = useCart();
//   const checkk = (id) => {
//     let check = checkoutItems.filter(
//       (item) => item.id !== id && item.id === id
//     );
//     setCheckoutItems(check);
//   };
//   const nav = useNavigate();
//   const handleAlert = () => {
//     checkoutItems.forEach((item) => {
//       if (item.Qty > 0) {
//         checkoutItems.filter((item) => {
//           return checkk(item.id);
//         });
//         alert("Order Placed Successfully");
//         nav("/");
//       } else alert("Quantity is not selected");
//     });
//   };
//   const handleDelete = (id) => {
//     let filterData = checkoutItems.filter((items) => items.id !== id);
//     setCheckoutItems(filterData);
//   };
//   const handleQuantityChange = (id, newQuantity) => {
//     let check = checkoutItems.map((item) => {
//       if (item.id === id) {
//         const maxQuantity = item.maxQuantity || item.TQty;
//         if (maxQuantity === 0 && newQuantity > 0) {
//           return null;
//         } else {
//           return { ...item, Qty: newQuantity };
//         }
//       }
//       return item;
//     });

//     check = check.filter((item) => item !== null);

//     setCheckoutItems(check);
//   };

//   return (
//     <div className="container">
//       <h2>Checkout</h2>
//       {checkoutItems.length === 0 ? (
//         <div>Your checkout is empty.</div>
//       ) : (
//         <div>
//           {checkoutItems.map((item) => (
//             <div key={item.id} className="cart-item">
//               <img src={item.image} alt={item.title} />
//               <div>
//                 <h3>{item.title}</h3>
//                 <p>Price: ₹{item.Price}/-</p>
//                 <label>
//                   Qty:
//                   <select
//                     name="Qty:"
//                     value={item.Qty}
//                     onChange={(e) =>
//                       handleQuantityChange(item.id, e.target.value)
//                     }
//                   >
//                     {[
//                       ...Array(
//                         Math.max(item.maxQuantity || item.TQty, 0) + 1
//                       ).keys(),
//                     ].map((q) => (
//                       <option key={q} value={q}>
//                         {q === 0 ? "0 (del)" : q}
//                       </option>
//                     ))}
//                   </select>
//                 </label>

//                 <button onClick={() => handleDelete(item.id)}>
//                   {" "}
//                   <DeleteIcon />{" "}
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div className="total">
//             <h3>Total: ₹{calculateTotal(checkoutItems)}/-</h3>
//             <button onClick={handleAlert}>Place Order</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;

import React, { useState } from "react";
import { useCart } from "./CartProvider";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ORDER_BUTTON,
  PAYMENT_STATUS,
  CHECKOUT_TITLE,
  CHECKOUT_MESSAGE,
  PRICE_TITLE,
  QTY_TITLE,
  TOTAL_TITLE,
} from "./appDefault";

const Checkout = () => {
  const { checkoutItems, calculateTotal, setCheckoutItems } = useCart();
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const item = loc.state;

  const handlePayment = async () => {
    // Perform any necessary validation before initiating payment
    if (checkoutItems.some((item) => item.Qty === 0)) {
      alert("Please select quantities for all items.");
      return;
    }

    // Set payment in progress to true to prevent multiple clicks
    setPaymentInProgress(true);

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate random payment success/failure
    const paymentSuccess = Math.random() < 0.8; // 80% chance of success

    if (paymentSuccess) {
      // Clear cart after successful payment
      setCheckoutItems([]);

      // Redirect to success page
      nav(`/SuccessPage`, { state: item.Tags });
    } else {
      // Handle payment failure
      alert("Payment failed. Please try again.");
      setPaymentInProgress(false);
    }
  };

  const handleDelete = (id) => {
    let filterData = checkoutItems.filter((items) => items.id !== id);
    setCheckoutItems(filterData);
  };
  const handleQuantityChange = (id, newQuantity) => {
    let check = checkoutItems.map((item) => {
      if (item.id === id) {
        const maxQuantity = item.maxQuantity || item.TQty;
        if (maxQuantity === 0 && newQuantity > 0) {
          return null;
        } else {
          return { ...item, Qty: newQuantity };
        }
      }
      return item;
    });

    check = check.filter((item) => item !== null);

    setCheckoutItems(check);
  };

  return (
    <div className="container">
      <h2>{CHECKOUT_TITLE}</h2>
      {checkoutItems.length === 0 ? (
        <div>{CHECKOUT_MESSAGE}</div>
      ) : (
        <div>
          {checkoutItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>
                  {PRICE_TITLE}
                  {item.Price}/-
                </p>
                <label>
                  {QTY_TITLE}
                  <select
                    name="Qty:"
                    value={item.Qty}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                  >
                    {[
                      ...Array(
                        Math.max(item.maxQuantity || item.TQty, 0) + 1
                      ).keys(),
                    ].map((q) => (
                      <option key={q} value={q}>
                        {q === 0 ? "0 (del)" : q}
                      </option>
                    ))}
                  </select>
                </label>

                <button onClick={() => handleDelete(item.id)}>
                  {" "}
                  <DeleteIcon />{" "}
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>
              {TOTAL_TITLE}
              {calculateTotal(checkoutItems)}/-
            </h3>
            <button onClick={handlePayment} disabled={paymentInProgress}>
              {paymentInProgress ?  PAYMENT_STATUS  :  ORDER_BUTTON }
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
