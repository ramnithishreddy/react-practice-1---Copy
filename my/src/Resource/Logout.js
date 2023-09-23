import React,{useEffect} from 'react'
import {useNavigate } from 'react-router-dom'

export default function Logout() {
  const nav = useNavigate()
  useEffect(() =>{
    nav('/')
  })
  return (
    <div>
    
    </div>
  )
}
