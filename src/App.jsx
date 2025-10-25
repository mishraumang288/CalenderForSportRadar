import { useState } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalenderNav from "./components/CalenderNav";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";

function App() {
  console.table(getMonth());
const [currentMonth, setCurrentMonth] = useState(getMonth())

  return (
    <>
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

export default App;
