import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "./data.json";
import { PRICE_TITLE } from "./appDefault";

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onItemClick = (item) => {
    setSuggestions([]);
    item = { ...item, Qty: Number(item.Qty) === 0 ? +1 : Number(item.Qty) };
    navigate(`/itemDetails`, { state: item });
  };
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    const filteredSuggestions = Object.keys(data)
      .flatMap((category) => data[category])
      .filter((item) =>
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      );
    if (inputValue.length > 0) {
      setSuggestions(filteredSuggestions);
    } else setSuggestions([]);
  };
  return (
    <div data-testid="render">
      <div className="search-container">
        <input
          data-testid="input"
          type="text"
          placeholder="Search for items..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <ul data-testid="suggestions" className="suggestions">
          {suggestions.map((item, idx) => (
            <li
              data-testid="data"
              key={item.id}
              onClick={() => onItemClick(item)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="Style">
        {Object.keys(data).map((category) =>
          data[category].map((item) => (
            <div
              key={item.id}
              className="item"
              onClick={() => onItemClick(item)}
            >
            {data[category] === Grocery || Mobiles || Fashion ? 
              {"           "}
              :
              null
            }
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
              <p>Price: ₹{item.Price}</p>
            </div>
          ))
        )}
      </div> */}
      <div className="Style">
        {data.Grocery.map((item) => (
          <div key={item.id} className="item" onClick={() => onItemClick(item)}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p>
              {PRICE_TITLE}
              {item.Price}
            </p>
          </div>
        ))}
      </div>
      <div className="Style">
        {data.Mobiles.map((item) => (
          <div key={item.id} className="item" onClick={() => onItemClick(item)}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p>
              {PRICE_TITLE}
              {item.Price}
            </p>
          </div>
        ))}
      </div>
      <div className="Style">
        {data.Fashion.map((item) => (
          <div key={item.id} className="item" onClick={() => onItemClick(item)}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p>
              {PRICE_TITLE}
              {item.Price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
