import { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const labelToClass = {
  indigo: "bg-indigo-500",
  gray: "bg-gray-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
};

export default function Event() {
  // pull actions & optional selectedEvent from context
  const {dispatchCalEvent,
    setShowEventModel,
    daySelected,
    addEvent,
    updateEvent,
    // optional: your context may provide selectedEvent for edit mode
    selectedEvent,
  } = useContext(GlobalContext);

  // default date uses daySelected if available
  const defaultDate = daySelected
    ? daySelected.format("YYYY-MM-DD")
    : new Date().toISOString().slice(0, 10);

  // initialize fields, if selectedEvent exists prefill them
  const [title, setTitle] = useState(selectedEvent?.title ?? "");
  const [description, setDescription] = useState(selectedEvent?.description ?? "");
  const [date, setDate] = useState(selectedEvent?.date ?? defaultDate);
  const [time, setTime] = useState(selectedEvent?.time ?? "18:00");
  const [sport, setSport] = useState(selectedEvent?.sport ?? "");
  const [participants, setParticipants] = useState(selectedEvent?.participants ?? "");
  const [error, setError] = useState("");

  // label state (color)
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent?.label ?? labelClasses[0]
  );

  // If selectedEvent changes at runtime, sync inputs
  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title ?? "");
      setDescription(selectedEvent.description ?? "");
      setDate(selectedEvent.date ?? defaultDate);
      setTime(selectedEvent.time ?? "18:00");
      setSport(selectedEvent.sport ?? "");
      setParticipants(selectedEvent.participants ?? "");
      setSelectedLabel(selectedEvent.label ?? labelClasses[0]);
    } else {
      // if creating new, reset to defaults
      setTitle("");
      setDescription("");
      setDate(defaultDate);
      setTime("18:00");
      setSport("");
      setParticipants("");
      setSelectedLabel(labelClasses[0]);
      setError("");
    }

  }, [selectedEvent, daySelected]);

  function handleClose(e) {
    e?.preventDefault();
    setShowEventModel(false);
  }

 
function handleSubmit(e) {
  e.preventDefault();

  const dayTimestamp = daySelected ? daySelected.valueOf() : dayjs(date).valueOf();
//displaying the event
  const calendarEvent = {
    id: selectedEvent ? selectedEvent.id : Date.now().toString(),
    title: title.trim(),
    description: description.trim(),
    label: selectedLabel,
    day: dayTimestamp,
    date, // YYYY-MM-DD
    time,
    sport: sport.trim(),
    participants: participants.trim(),
    createdAt: selectedEvent?.createdAt ?? new Date().toISOString(),
  };

  if (selectedEvent) {
    dispatchCalEvent({ type: "update", payload: calendarEvent });
  } else {
    dispatchCalEvent({ type: "push", payload: calendarEvent });
  }

  setShowEventModel(false);
}

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-full max-w-xl"
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center rounded-t-lg">
          <span>{selectedEvent ? "Edit Event" : "Add Event"}</span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModel(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModel(false)} >
              <span className="material-icons-outlined text-gray-400 cursor-pointer ml-1 ">
                close
              </span>
            </button>
          </div>
      
        </header>

        <div className="p-4 space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Salzburg vs Sturm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 pb-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 pb-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time *</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 pb-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sport *</label>
            <select name="sport" id="sport" value={sport} onChange={(e) => setSport(e.target.value)} className="mt-1 block w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 pb-2" required>
              <option value="">Select a sport</option>
              <option value="Football">Football</option>
              <option value="Ice Hockey">Ice Hockey</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
            </select>
        
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teams *
            </label>
            <select name="participants" id="participants" value={participants} onChange={(e) => setParticipants(e.target.value)} className="mt-1 block w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 pb-2" required>
              <option value="">Select teams</option>
              <option value="Al Shabab vs FC Nasaf">Al Shabab vs FC Nasaf</option>
              <option value="Al Hilal vs Shabab Al Ahli">Al Hilal vs Shabab Al Ahli</option>
              <option value="Al Duhail vs Al Rayyan">Al Duhail vs Al Rayyan</option>
            </select>
          
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes about the event"
              className="mt-1 block w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 pb-2"
            />
          </div>

          {/* label picker + actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {labelClasses.map((lblClass) => (
                <button
                  key={lblClass}
                  type="button"
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center focus:outline-none ${labelToClass[lblClass]}`}
                  aria-label={`label-${lblClass}`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">check</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200 transition cursor-pointer" 
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                {selectedEvent ? "Update" : "Save event"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
