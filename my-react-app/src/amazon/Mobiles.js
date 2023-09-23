import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from './data.json'
import FilterButton from './FilterButton'

const Mobiles = () => {
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState(data.Mobiles)

  const onItemClick = (item) => {
    item = { ...item, Qty: item.Qty + 1 } 
    navigate(`/ItemDetails`, { state: item })
  }
  
  const handleLowToHigh = () => {
    const sortedItems = [...data.Mobiles].sort((a, b) => a.Price - b.Price)
    setSortedData(sortedItems)
  }

  const handleHighToLow = () => {
    const sortedItems = [...data.Mobiles].sort((a, b) => b.Price - a.Price)
    setSortedData(sortedItems)
  }

  return (
    <div>
      <FilterButton handleLowToHigh={handleLowToHigh} handleHighToLow={handleHighToLow} />
      <div className='Style'>
        {sortedData.map((item) => (
          <div key={item.id} className='item' onClick={() => onItemClick(item)}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p>Price: ₹{item.Price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mobiles
