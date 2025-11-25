import { Link } from 'react-router-dom';
import { Plane, Clock, Users } from 'lucide-react';

export default function FlightCard({ flight, onBook }) {
    return (
        <div className="card p-6 hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <Plane className="h-5 w-5 text-primary-600" />
                        <span className="font-bold text-lg text-gray-900">{flight.airline}</span>
                    </div>
                    <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">${flight.price}</div>
                    <div className="text-xs text-gray-500">{flight.class}</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <div className="text-xs text-gray-500 mb-1">From</div>
                    <div className="font-semibold text-gray-900">{flight.originCode}</div>
                    <div className="text-sm text-gray-700">{flight.origin}</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{flight.departureTime}</div>
                </div>

                <div className="flex flex-col items-center justify-center border-l border-r border-gray-200">
                    <Clock className="h-4 w-4 text-gray-400 mb-1" />
                    <div className="text-xs text-gray-600">{flight.duration}</div>
                </div>

                <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">To</div>
                    <div className="font-semibold text-gray-900">{flight.destinationCode}</div>
                    <div className="text-sm text-gray-700">{flight.destination}</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{flight.arrivalTime}</div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {flight.availableSeats} seats available
                </div>
                <button
                    onClick={() => onBook && onBook(flight)}
                    className="btn-primary text-sm py-2 px-6"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}
