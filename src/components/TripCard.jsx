import { Link } from 'react-router-dom';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

export default function TripCard({ trip }) {
    const [imageError, setImageError] = useState(false);
    return (
        <div className="card overflow-hidden hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
                {!imageError && trip.image ? (
                    <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <ImagePlaceholder type="trip" className="w-full h-56" />
                )}
                <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-full shadow-md">
                    <span className="text-lg font-bold text-primary-600">${trip.price}</span>
                </div>
                <div className="absolute top-3 left-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {trip.duration}
                </div>
            </div>

            <div className="p-5">
                <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">{trip.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{trip.destination}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{trip.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="h-4 w-4 mr-2 text-primary-500" />
                        <span className="capitalize">{trip.difficulty}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-primary-500" />
                        <span>Max {trip.maxGroupSize}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {trip.included.slice(0, 3).map((item, idx) => (
                        <span
                            key={idx}
                            className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full"
                        >
                            ✓ {item}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-semibold text-gray-900 mr-1">{trip.rating}</span>
                        <span className="text-sm text-gray-500">({trip.reviews})</span>
                    </div>
                    <Link to={`/trips/${trip.id}`} className="btn-primary text-sm py-2 px-6">
                        View Trip
                    </Link>
                </div>
            </div>
        </div>
    );
}
