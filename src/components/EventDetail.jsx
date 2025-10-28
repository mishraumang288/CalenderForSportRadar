import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';

const labelToClass = {
  indigo: "bg-indigo-500",
  gray: "bg-gray-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
};

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { savedEvents } = useContext(GlobalContext);

  const event = savedEvents.find(evt => evt.id === eventId);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Event not found</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-slideUp">
        <div className={`${labelToClass[event.label]} h-2 w-full`}></div>
        
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Back to Calendar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Event Details</h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span> {dayjs(event.date).format('MMMM D, YYYY')}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Time:</span> {event.time}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Sport:</span> {event.sport}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Teams:</span> {event.participants}
                </p>
              </div>
            </div>

            {event.description && (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Created: {dayjs(event.createdAt).format('MMMM D, YYYY [at] HH:mm')}
          </div>
        </div>
      </div>
    </div>
  );
}