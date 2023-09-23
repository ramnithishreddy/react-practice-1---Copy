import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from './data.json'

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const onItemClick = (item) => {
    setSuggestions([])
    item = { ...item, Qty: item.Qty + 1 }
    navigate(`/ItemDetails`, { state: item })
  }
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue)
    /* const totaldata = [...data.Fashion, ...data.Grocery, ...data.Mobiles] */
    const filteredSuggestions = Object.keys(data)
      .flatMap((category) => data[category])
      .filter((item) =>
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      )
    if (inputValue.length > 0) {
      setSuggestions(filteredSuggestions)
    }
    else setSuggestions([])
  }
  return (
    <div>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search for items...'
          value={searchInput}
          onChange={handleInputChange}
        />
        <ul className='suggestions'>
          {suggestions.map((item,idx) => (
            <li key={item.id} onClick={() => onItemClick(item)}>
              {idx} {item.title}
            </li>
          ))}
        </ul>
      </div>
        <div className='Style'>
          {Object.keys(data).map((category) =>
            data[category].map((item) => (
              <div key={item.id} className='item' onClick={() => onItemClick(item)}>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>Price: ₹{item.Price}</p>
              </div>
            ))
          )}
        </div>
      </div>
  )
}