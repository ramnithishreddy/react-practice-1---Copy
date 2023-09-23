import React, { createContext } from 'react'
import Childcom from './Childcom'
const Mycontext = createContext()
export default function Parentcom() {
  const contextValue = 'Hello from Context!'
  return (
    <div>
     <p> Parentcom </p>
     <Mycontext.Provider value={contextValue}>
      <Childcom />
     </Mycontext.Provider>

      </div>

  )
}
export {Mycontext}
