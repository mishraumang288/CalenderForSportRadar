import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const labelToClass = {
  indigo: "bg-indigo-200 text-indigo-800",
  gray: "bg-gray-200 text-gray-800",
  green: "bg-green-200 text-green-800",
  blue: "bg-blue-200 text-blue-800",
  red: "bg-red-200 text-red-800",
  purple: "bg-purple-200 text-purple-800",
};

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModel,
    filteredEvents,
    setSelectedEvent,
    savedEvents,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = savedEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
    setDayEvents(events);
  }, [savedEvents, day]);


  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white shadow-sm"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col p-1">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm font-medium text-slate-600">{day.format("ddd").toUpperCase()}</p>
        )}

        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>

      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModel(true);
        }}
      >
        <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModel(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            className={`${labelToClass[evt.label]} p-1 mr-3 text-sm rounded mb-1 relative group transform transition-all duration-200 hover:scale-102 hover:shadow-md`}
          >
            <div className="truncate cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent day click handler from firing
                setSelectedEvent(evt);
                setShowEventModel(true);
              }}
            >
              {evt.title} : {evt.time}
            </div>
            <div className="hidden group-hover:flex absolute right-0 top-0 h-full items-center pr-1 animate-fadeIn">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/event/${evt.id}`;
                }}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
        
      </div>
    </div>
  );
}
