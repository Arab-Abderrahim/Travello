import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CheckCircle } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import Loader from '../components/Loader';
import { fetchWithFallback } from '../utils/api';

export default function ActivityDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadActivity();
    }, [id]);

    const loadActivity = async () => {
        setLoading(true);
        try {
            const data = await fetchWithFallback(null, '/src/data/activities.json');
            const found = data?.find(a => a.id === id);
            setActivity(found);
        } catch (error) {
            console.error('Error loading activity:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    if (!activity) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity Not Found</h2>
                <button onClick={() => navigate('/activities')} className="btn-primary">Back to Activities</button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button onClick={() => navigate('/activities')} className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Activities
            </button>

            <div className="relative h-96 rounded-xl overflow-hidden mb-8">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-3xl font-bold text-primary-600">${activity.price}</span>
                </div>
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium">
                    {activity.category}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{activity.title}</h1>

                    <div className="flex items-center space-x-6 mb-6">
                        <div className="flex items-center text-gray-600">
                            <MapPin className="h-5 w-5 mr-2" />
                            <span>{activity.location}, {activity.country}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Clock className="h-5 w-5 mr-2" />
                            <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="font-bold">{activity.rating}</span>
                            <span className="text-gray-500 ml-1">({activity.reviews} reviews)</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                        <p className="text-lg text-gray-700">{activity.description}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {activity.included.map((item, idx) => (
                                <div key={idx} className="flex items-center bg-gray-50 p-3 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-primary-600 mr-3" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <div className="text-center mb-6">
                            <div className="text-5xl font-bold text-primary-600 mb-1">${activity.price}</div>
                            <div className="text-gray-600">per person</div>
                        </div>

                        <button onClick={() => setIsModalOpen(true)} className="btn-primary w-full text-lg py-3">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={activity} itemType="activity" />
        </div>
    );
}
