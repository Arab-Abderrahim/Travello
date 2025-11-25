import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import HotelCard from '../components/HotelCard';
import ActivityCard from '../components/ActivityCard';
import Loader from '../components/Loader';
import { fetchWithFallback } from '../utils/api';

export default function DestinationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDestinationData();
    }, [id]);

    const loadDestinationData = async () => {
        setLoading(true);
        try {
            const [destData, hotelData, activityData] = await Promise.all([
                fetchWithFallback(null, '/src/data/destinations.json'),
                fetchWithFallback(null, '/src/data/hotels.json'),
                fetchWithFallback(null, '/src/data/activities.json'),
            ]);

            const foundDest = destData?.find(d => d.id === id);
            setDestination(foundDest);

            if (foundDest) {
                const destHotels = hotelData?.filter(h => h.city === foundDest.name) || [];
                const destActivities = activityData?.filter(a => a.location === foundDest.name) || [];
                setHotels(destHotels);
                setActivities(destActivities);
            }
        } catch (error) {
            console.error('Error loading destination:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    if (!destination) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h2>
                <button onClick={() => navigate('/destinations')} className="btn-primary">
                    Back to Destinations
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate('/destinations')}
                className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium"
            >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Destinations
            </button>

            <div className="relative h-96 rounded-xl overflow-hidden mb-8">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                    <div className="text-white">
                        <h1 className="text-5xl font-bold mb-2">{destination.name}</h1>
                        <p className="text-xl flex items-center">
                            <MapPin className="h-6 w-6 mr-2" />
                            {destination.country}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                <p className="text-lg text-gray-700 mb-6">{destination.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                        <ul className="space-y-2">
                            {destination.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start">
                                    <span className="text-primary-600 mr-2">✓</span>
                                    <span className="text-gray-700">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">Best Time to Visit</h3>
                        <div className="flex items-center bg-primary-50 p-4 rounded-lg">
                            <Calendar className="h-6 w-6 text-primary-600 mr-3" />
                            <span className="text-gray-800">{destination.bestTimeToVisit}</span>
                        </div>
                    </div>
                </div>
            </div>

            {hotels.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Hotels in {destination.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.slice(0, 6).map(hotel => (
                            <HotelCard key={hotel.id} hotel={hotel} />
                        ))}
                    </div>
                </div>
            )}

            {activities.length > 0 && (
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Activities in {destination.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities.slice(0, 6).map(activity => (
                            <ActivityCard key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
