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
import { PRICE_TITLE } from "./appDefault";

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onItemClick = (item) => {
    // Reset suggestions and navigate to item details
    setSuggestions([]);
    const updatedItem = { ...item, Qty: Math.max(Number(item.Qty), 1) }; // Ensure Qty is at least 1
    navigate(`/itemDetails`, { state: updatedItem });
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter suggestions based on search input
    const filteredSuggestions = Object.keys(data)
      .flatMap((category) => data[category])
      .filter((item) => 
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      );

    setSuggestions(inputValue.length > 0 ? filteredSuggestions : []);
  };

  return (
    <div data-testid="render" className="home-container">
      <div className="search-container">
        <input
          data-testid="input"
          type="text"
          placeholder="Search for items..."
          value={searchInput}
          onChange={handleInputChange}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul data-testid="suggestions" className="suggestions">
            {suggestions.map((item, idx) => (
              <li
                data-testid="data"
                key={idx}
                onClick={() => onItemClick(item)}
                className="suggestion-item"
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {Object.keys(data).map((category) => (
        <div key={category} className="category-container">
          <h2 className="category-title">{category}</h2>
          <div className="item-container">
            {data[category].map((item) => (
              <div key={item.id} className="item" onClick={() => onItemClick(item)}>
                <img src={item.image} alt={item.title} className="item-image" />
                <p className="item-title">{item.title}</p>
                <p className="item-price">
                  {PRICE_TITLE} ₹{item.Price}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
