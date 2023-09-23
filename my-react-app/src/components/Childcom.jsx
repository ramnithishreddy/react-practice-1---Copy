import React, { useContext } from 'react'
import { Mycontext } from './Parentcom';

export default function Childcom() {

  const contextValue = useContext(Mycontext)

  return (      
    <div>
      <p>Childcom</p>
      <p>{contextValue}</p>
      
    </div>
  )
}

