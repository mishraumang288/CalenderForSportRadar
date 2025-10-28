import React, { useContext } from 'react'
import plus from '../assets/plus.png'
import GlobalContext from '../context/GlobalContext'
export default function CreateEventButton() {
  const {setShowEventModel} = useContext(GlobalContext)
  return (
    <button onClick={() => setShowEventModel(true)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center' >
   <img className='w-7 h-7' src={plus} alt="plus_logo" />
   <span className='pl-3 pr-7'>Create</span>
    </button>
  )
}
