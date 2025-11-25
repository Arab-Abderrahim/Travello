import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, ArrowLeft, CheckCircle } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import Loader from '../components/Loader';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { fetchWithFallback } from '../utils/api';

export default function HotelDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        loadHotel();
    }, [id]);

    const loadHotel = async () => {
        setLoading(true);
        try {
            const data = await fetchWithFallback(null, '/src/data/hotels.json');
            const foundHotel = data?.find(h => h.id === id);
            setHotel(foundHotel);
        } catch (error) {
            console.error('Error loading hotel:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    if (!hotel) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h2>
                <button onClick={() => navigate('/hotels')} className="btn-primary">
                    Back to Hotels
                </button>
            </div>
        );
    }

    const renderStars = (rating) => {
        return [...Array(rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ));
    };

    // Mock reviews data
    const reviews = [
        { author: 'Sarah M.', rating: 5, comment: 'Amazing hotel with excellent service and beautiful rooms!', date: '2 weeks ago' },
        { author: 'Ahmed K.', rating: 4, comment: 'Great location and facilities. Would definitely return.', date: '1 month ago' },
        { author: 'Maria L.', rating: 5, comment: 'Perfect for our family vacation. The staff was incredibly helpful.', date: '1 month ago' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate('/hotels')}
                className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium"
            >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Hotels
            </button>

            {/* Image Carousel */}
            <div className="relative h-96 rounded-xl overflow-hidden mb-8">
                {!imageError && hotel.image ? (
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <ImagePlaceholder type="hotel" className="w-full h-96" />
                )}
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-3xl font-bold text-primary-600">${hotel.price}</span>
                    <span className="text-gray-600">/night</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span className="text-lg">{hotel.city}, {hotel.country}</span>
                                </div>
                                <div className="flex items-center">
                                    {renderStars(hotel.rating)}
                                    <span className="ml-2 text-gray-600">{hotel.rating}-Star Hotel</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-gray-700 mb-6">{hotel.description}</p>
                    </div>

                    {/* Amenities */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {hotel.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center bg-gray-50 p-3 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Guest Reviews</h2>
                        <div className="flex items-center mb-6">
                            <div className="text-5xl font-bold text-primary-600 mr-4">{hotel.reviewScore}</div>
                            <div>
                                <div className="flex items-center mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < Math.floor(hotel.reviewScore) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600">{hotel.reviews} reviews</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {reviews.map((review, idx) => (
                                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold">{review.author}</span>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Booking Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <div className="text-center mb-6">
                            <div className="text-4xl font-bold text-primary-600 mb-1">${hotel.price}</div>
                            <div className="text-gray-600">per night</div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn-primary w-full text-lg py-3 mb-4"
                        >
                            Book Now
                        </button>

                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="font-semibold mb-3">Why book with us?</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-primary-600 mr-2 mt-0.5" />
                                    <span>Best price guarantee</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-primary-600 mr-2 mt-0.5" />
                                    <span>Free cancellation</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-primary-600 mr-2 mt-0.5" />
                                    <span>Instant confirmation</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={hotel}
                itemType="hotel"
            />
        </div>
    );
}
