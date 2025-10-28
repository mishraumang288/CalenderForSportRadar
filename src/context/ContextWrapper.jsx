
import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}

function initEvents() {
  try {
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
  } catch (err) {
    console.warn("Failed to parse savedEvents from localStorage", err);
    return [];
  }
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModel, setShowEventModel] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);

  // reducer-managed events (uses localStorage seed)
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  // keep labels in sync with savedEvents (unique labels + checked state)
  useEffect(() => {
    setLabels((prevLabels) => {
      const unique = Array.from(new Set(savedEvents.map((evt) => evt.label))).filter(Boolean);
      return unique.map((label) => {
        const current = prevLabels.find((p) => p.label === label);
        return { label, checked: current ? current.checked : true };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedEvents]);

  // persist to localStorage (remove this effect if you want runtime-only)
  useEffect(() => {
    try {
      localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    } catch (err) {
      console.warn("Unable to write savedEvents to localStorage", err);
    }
  }, [savedEvents]);

  // filteredEvents uses labels.checked to include/exclude events
  const filteredEvents = useMemo(() => {
    const activeLabels = labels.filter((l) => l.checked).map((l) => l.label);
    if (activeLabels.length === 0) return [];
    return savedEvents.filter((evt) => activeLabels.includes(evt.label));
  }, [savedEvents, labels]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModel) {
      // close modal clears selection
      setSelectedEvent(null);
    }
  }, [showEventModel]);

  function updateLabel(labelObj) {
    setLabels((prev) => prev.map((l) => (l.label === labelObj.label ? labelObj : l)));
  }

  // helper: return events for a given day (accepts dayjs or "YYYY-MM-DD" or timestamp)
  function getEventsForDate(dateInput) {
    const target = typeof dateInput === "object" && dateInput?.format ? dateInput : dayjs(dateInput);
    const targetDateStr = target.format("YYYY-MM-DD");
    return savedEvents.filter((ev) => {
      if (!ev) return false;
      if (ev.date && ev.date === targetDateStr) return true;
      if (ev.day && typeof ev.day === "number") {
        return dayjs(ev.day).format("YYYY-MM-DD") === targetDateStr;
      }
      return false;
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModel,
        setShowEventModel,
        dispatchCalEvent,     // reducer dispatcher for push/update/delete
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        getEventsForDate,     // handy helper for Day.jsx
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
