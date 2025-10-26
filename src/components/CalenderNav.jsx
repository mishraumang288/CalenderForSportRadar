import { useContext } from 'react'
import logo from '../assets/logo.png'
import GlobalContext from '../context/GlobalContext'

export default function CalenderNav() {
  const {monthIndex, setMonthIndex} = useContext(GlobalContext);
  function handlePreviousMonth(){
     setMonthIndex(monthIndex - 1);
  }
   function handleNextMonth(){
     setMonthIndex(monthIndex + 1);
  }
  return (
    <header className='px-4 py-2 flex items-center'>
      
      
      <img src={logo} alt="calender" className='mr-2 w-12 h-12' />
    <h1 className="mr-2 text-xl text-gray-500">Calender</h1>
    <button className="border rounded py-2 px-4 mr-5">
      Today
    </button>
    <button onClick={handlePreviousMonth}>
      <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2 '>
        chevron_left
      </span>
    </button>
     <button onClick={handleNextMonth}>
      <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
        chevron_right
      </span>
    </button>
    </header>
 
  )
}
