// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import data from "./data.json";
// import { PRICE_TITLE } from "./appDefault";

// export default function Home() {
//   const navigate = useNavigate();
//   const [searchInput, setSearchInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const onItemClick = (item) => {
//     setSuggestions([]);
//     item = { ...item, Qty: Number(item.Qty) === 0 ? +1 : Number(item.Qty) };
//     navigate(`/itemDetails`, { state: item });
//   };
//   const handleInputChange = (event) => {
//     const inputValue = event.target.value;
//     setSearchInput(inputValue);
//     const filteredSuggestions = Object.keys(data)
//       .flatMap((category) => data[category])
//       .filter((item) =>
//         item.title.toLowerCase().includes(inputValue.toLowerCase())
//       );
//     if (inputValue.length > 0) {
//       setSuggestions(filteredSuggestions);
//     } else setSuggestions([]);
//   };
//   return (
//     <div data-testid="render">
//       <div className="search-container">
//         <input
//           data-testid="input"
//           type="text"
//           placeholder="Search for items..."
//           value={searchInput}
//           onChange={handleInputChange}
//         />
//         <ul data-testid="suggestions" className="suggestions">
//           {suggestions.map((item, idx) => (
//             <li
//               data-testid="data"
//               key={idx}
//               onClick={() => onItemClick(item)}
//             >
//               {item.title}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* <div className="Style">
//         {Object.keys(data).map((category) =>
//           data[category].map((item) => (
//             <div
//               key={item.id}
//               className="item"
//               onClick={() => onItemClick(item)}
//             >
//             {data[category] === Grocery || Mobiles || Fashion ? 
//               {"           "}
//               :
//               null
//             }
//               <img src={item.image} alt={item.title} />
//               <p>{item.title}</p>
//               <p>Price: ₹{item.Price}</p>
//             </div>
//           ))
//         )}
//       </div> */}
//       <div className="Style">
//         {data.Grocery.map((item) => (
//           <div key={item.id} className="item" onClick={() => onItemClick(item)}>
//             <img src={item.image} alt={item.title} />
//             <p>{item.title}</p>
//             <p>
//               {PRICE_TITLE}
//               {item.Price}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="Style">
//         {data.Mobiles.map((item) => (
//           <div key={item.id} className="item" onClick={() => onItemClick(item)}>
//             <img src={item.image} alt={item.title} />
//             <p>{item.title}</p>
//             <p>
//               {PRICE_TITLE}
//               {item.Price}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="Style">
//         {data.Fashion.map((item) => (
//           <div key={item.id} className="item" onClick={() => onItemClick(item)}>
//             <img src={item.image} alt={item.title} />
//             <p>{item.title}</p>
//             <p>
//               {PRICE_TITLE}
//               {item.Price}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "./data.json";

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onItemClick = (item) => {
    setSuggestions([]);
    const updatedItem = { ...item, Qty: Math.max(Number(item.Qty), 1) };
    navigate(`/itemDetails`, { state: updatedItem });
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    const filteredSuggestions = Object.keys(data)
      .flatMap((category) => data[category])
      .filter((item) => 
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      );

    setSuggestions(inputValue.length > 0 ? filteredSuggestions : []);
  };

  return (
    <div data-testid="render" className="home-page">
      {/* Banner Section */}
      <div className="home-banner">
        <div className="banner-content">
          <h2>Explore Amazon</h2>
          <p>Great deals on thousands of products!</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="home-search-section">
        <div className="search-container">
          <input
            data-testid="input"
            type="text"
            placeholder="Search Amazon.in for products, brands and more"
            value={searchInput}
            onChange={handleInputChange}
            className="search-input"
          />
          <ul data-testid="suggestions" className="suggestions">
            {suggestions.map((item, idx) => (
              <li
                data-testid="data"
                key={idx}
                onClick={() => onItemClick(item)}
                className="suggestion-item"
              >
                <span className="suggestion-title">{item.title}</span>
                <span className="suggestion-price">₹{item.Price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Categories */}
      <div className="home-categories">
        <div className="categories-grid">
          <div className="category-card" onClick={() => navigate("/grocery")}>
            <div className="category-icon">🛒</div>
            <h3>Grocery</h3>
            <p>Fresh & everyday essentials</p>
          </div>
          <div className="category-card" onClick={() => navigate("/mobiles")}>
            <div className="category-icon">📱</div>
            <h3>Mobiles</h3>
            <p>Latest smartphones & accessories</p>
          </div>
          <div className="category-card" onClick={() => navigate("/fashion")}>
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
            <p>Clothing, shoes & accessories</p>
          </div>
        </div>
      </div>

      {/* Products by Category */}
      <div className="home-products">
        {/* Grocery Section */}
        <section className="category-section">
          <div className="section-header">
            <h2>🛒 Grocery Essentials</h2>
            <a href="/grocery" className="view-all">View All →</a>
          </div>
          <div className="item-container">
            {data.Grocery.slice(0, 8).map((item) => (
              <div 
                key={item.id} 
                className="item" 
                onClick={() => onItemClick(item)}
                role="button"
                tabIndex="0"
              >
                <div className="item-image-wrapper">
                  <img src={item.image} alt={item.title} className="item-image" />
                </div>
                <h4 className="item-title">{item.title}</h4>
                <p className="item-price">₹{item.Price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mobiles Section */}
        <section className="category-section">
          <div className="section-header">
            <h2>📱 Latest Mobiles</h2>
            <a href="/mobiles" className="view-all">View All →</a>
          </div>
          <div className="item-container">
            {data.Mobiles.slice(0, 8).map((item) => (
              <div 
                key={item.id} 
                className="item" 
                onClick={() => onItemClick(item)}
                role="button"
                tabIndex="0"
              >
                <div className="item-image-wrapper">
                  <img src={item.image} alt={item.title} className="item-image" />
                </div>
                <h4 className="item-title">{item.title}</h4>
                <p className="item-price">₹{item.Price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fashion Section */}
        <section className="category-section">
          <div className="section-header">
            <h2>👕 Fashion Picks</h2>
            <a href="/fashion" className="view-all">View All →</a>
          </div>
          <div className="item-container">
            {data.Fashion.slice(0, 8).map((item) => (
              <div 
                key={item.id} 
                className="item" 
                onClick={() => onItemClick(item)}
                role="button"
                tabIndex="0"
              >
                <div className="item-image-wrapper">
                  <img src={item.image} alt={item.title} className="item-image" />
                </div>
                <h4 className="item-title">{item.title}</h4>
                <p className="item-price">₹{item.Price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
