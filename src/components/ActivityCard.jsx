import { Link } from 'react-router-dom';
import { MapPin, Clock, Tag } from 'lucide-react';
import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

export default function ActivityCard({ activity }) {
    const [imageError, setImageError] = useState(false);
    return (
        <div className="card overflow-hidden hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
                {!imageError && activity.image ? (
                    <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <ImagePlaceholder type="activity" className="w-full h-48" />
                )}
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-lg font-bold text-primary-600">${activity.price}</span>
                </div>
                <div className="absolute top-3 left-3">
                    <span className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {activity.category}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{activity.title}</h3>

                <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{activity.location}, {activity.country}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{activity.description}</p>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Clock className="h-4 w-4 mr-2 text-primary-500" />
                    <span>{activity.duration}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {activity.included.map((item, idx) => (
                        <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                            ✓ {item}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-semibold text-gray-900 mr-1">{activity.rating}</span>
                        <span className="text-sm text-gray-500">({activity.reviews})</span>
                    </div>
                    <Link to={`/activities/${activity.id}`} className="btn-primary text-sm py-2 px-5">
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
