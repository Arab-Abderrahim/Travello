import { Link } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee } from 'lucide-react';
import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

export default function HotelCard({ hotel, onBook }) {
    const [imageError, setImageError] = useState(false);
    const renderStars = (rating) => {
        return [...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ));
    };

    return (
        <div className="card overflow-hidden hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
                {!imageError && hotel.image ? (
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <ImagePlaceholder type="hotel" className="w-full h-48" />
                )}
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-lg font-bold text-primary-600">${hotel.price}</span>
                    <span className="text-xs text-gray-600">/night</span>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{hotel.name}</h3>
                    <div className="flex">{renderStars(hotel.rating)}</div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hotel.city}, {hotel.country}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                            {amenity}
                        </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                        <span className="text-xs text-gray-500">+{hotel.amenities.length - 3} more</span>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="font-semibold text-gray-900 mr-1">{hotel.reviewScore}</span>
                        <span className="text-sm text-gray-500">({hotel.reviews} reviews)</span>
                    </div>
                    <Link to={`/hotels/${hotel.id}`} className="btn-primary text-sm py-2 px-5">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
