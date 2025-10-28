import React from 'react';
import CreateEventButton from './CreateEventButton';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function Sidebar() {
  const { savedEvents } = useContext(GlobalContext);

  // Get unique sports from events
  const uniqueSports = [...new Set(savedEvents.map(event => event.sport))].filter(Boolean);

  return (
    <aside className={`relative bg-blue-50 w-64 shadow-lg animate-slideRight`}>
      <div className={`p-5 opacity-100 transition-opacity duration-200`}>
        <div className="mb-8 transform transition hover:scale-105">
          <CreateEventButton />
        </div>

        <div className="space-y-6 animate-fadeIn">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Quick Stats</h3>
            <p className="text-gray-600">Total Events: {savedEvents.length}</p>
          </div>

          {/* Sports Filter */}
          {uniqueSports.length > 0 && (
            <div className="bg-white rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Sports</h3>
              <div className="space-y-2">
                {uniqueSports.map((sport) => (
                  <div
                    key={sport}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer
                      transform transition-all duration-200 hover:translate-x-1"
                  >
                    <span>•</span>
                    <span>{sport}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Today's Events */}
          <div className="bg-white rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Today's Events</h3>
            <p className="text-gray-600">
              {savedEvents.filter(event => 
                new Date(event.date).toDateString() === new Date().toDateString()
              ).length} events today
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
