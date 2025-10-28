import { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { getMonth } from "./util";
import CalenderNav from "./components/CalenderNav";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import Event from "./components/Event";
import EventDetail from "./components/EventDetail";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModel } = useContext(GlobalContext);
  
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModel && <Event />}
      <div className="h-screen flex flex-col">
        <CalenderNav />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calendar />} />
      <Route path="/event/:eventId" element={<EventDetail />} />
    </Routes>
  );
}

export default App;
