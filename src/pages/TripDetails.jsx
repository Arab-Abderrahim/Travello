import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, TrendingUp, Star, CheckCircle } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import HotelCard from '../components/HotelCard';
import Loader from '../components/Loader';
import { fetchWithFallback } from '../utils/api';

export default function TripDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadTrip();
    }, [id]);

    const loadTrip = async () => {
        setLoading(true);
        try {
            const data = await fetchWithFallback(null, '/src/data/trips.json');
            const foundTrip = data?.find(t => t.id === id);
            setTrip(foundTrip);

            // Load hotels if this is an Umrah or Hajj trip
            if (foundTrip && (foundTrip.id.includes('umrah') || foundTrip.id.includes('hajj'))) {
                const hotelsData = await fetchWithFallback(null, '/src/data/hotels.json');
                const saudiHotels = hotelsData?.filter(h => h.city === 'Mecca' || h.city === 'Medina') || [];
                setHotels(saudiHotels);
            }
        } catch (error) {
            console.error('Error loading trip:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    if (!trip) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Not Found</h2>
                <button onClick={() => navigate('/trips')} className="btn-primary">Back to Trips</button>
            </div>
        );
    }

    const isUmrahOrHajj = trip.id.includes('umrah') || trip.id.includes('hajj');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button onClick={() => navigate('/trips')} className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Trips
            </button>

            <div className="relative h-96 rounded-xl overflow-hidden mb-8">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                    <div className="text-white">
                        <h1 className="text-5xl font-bold mb-2">{trip.title}</h1>
                        <p className="text-xl">{trip.destination}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                                <span className="font-semibold">{trip.duration}</span>
                            </div>
                            <div className="flex items-center">
                                <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
                                <span className="font-semibold capitalize">{trip.difficulty}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="h-5 w-5 mr-2 text-primary-600" />
                                <span className="font-semibold">Max {trip.maxGroupSize} people</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 mr-1" />
                            <span className="font-bold text-lg">{trip.rating}</span>
                            <span className="text-gray-500 ml-1">({trip.reviews} reviews)</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Trip</h2>
                        <p className="text-lg text-gray-700">{trip.description}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {trip.included.map((item, idx) => (
                                <div key={idx} className="flex items-center bg-primary-50 p-3 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-primary-600 mr-3" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hotels Section for Umrah/Hajj */}
                    {isUmrahOrHajj && hotels.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Hotels in Mecca & Medina</h2>
                            <p className="text-gray-600 mb-6">Choose from our selection of hotels near the holy mosques</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {hotels.map(hotel => (
                                    <Link key={hotel.id} to={`/hotels/${hotel.id}`}>
                                        <HotelCard hotel={hotel} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <div className="text-center mb-6">
                            <div className="text-5xl font-bold text-primary-600 mb-1">${trip.price}</div>
                            <div className="text-gray-600">per person</div>
                        </div>

                        <button onClick={() => setIsModalOpen(true)} className="btn-primary w-full text-lg py-3 mb-4">
                            Book This Trip
                        </button>

                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="font-semibold mb-3">Trip Highlights</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>✓ Expert local guide</li>
                                <li>✓ Small group experience</li>
                                <li>✓ Quality accommodation</li>
                                <li>✓ All meals included</li>
                                <li>✓ Transportation covered</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={trip} itemType="trip" />
        </div>
    );
}
