import { useContext } from 'react'
import dayjs from 'dayjs';
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
  function handleReset(){
    setMonthIndex(dayjs().month()); //for today btn : rtn to current month
  }
  return (
    <header className='px-4 py-2 flex items-center bg-blue-50'>
      
      
      <img src={logo} alt="calender" className='mr-2 w-12 h-12' />
    <h1 className="mr-2 text-xl text-gray-500">Calender</h1>
    <button onClick={handleReset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-10">
      Today
    </button>
    <button onClick={handlePreviousMonth}>
      <span className='px-2 py-2 material-icons-outlined cursor-pointer text-gray-600 mx-2 '>
        chevron_left
      </span>
    </button>
     <button onClick={handleNextMonth}>
      <span className='px-2 py-2 material-icons-outlined cursor-pointer text-gray-600 mx-2'>
        chevron_right
      </span>
    </button>
    <h2 className='ml-4 text-xl text-gray-500 font-bold'>
      {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")} 
      {/* returns month and day */}
    </h2>
    </header>
 
  )
}
