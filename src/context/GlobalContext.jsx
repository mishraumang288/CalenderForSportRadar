import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},

  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},

  daySelected: null,
  setDaySelected: (day) => {},

  // modal naming - pick one spelling and keep it consistent across app
  showEventModal: false,
  setShowEventModal: () => {},

  // reducer-style events API for add/update/delete
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],

  // selected event for edit/view
  selectedEvent: null,
  setSelectedEvent: () => {},

  // labels / filtering
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},

  // derived list (based on labels)
  filteredEvents: [],
});

export default GlobalContext;