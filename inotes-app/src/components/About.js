import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/noteContext'
export default function About() {
  const a = useContext(NoteContext);
  return (
    <div>
      My name {a.Name} and I am from {a.Class}

      
    </div>
  )
}
