import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import Loader from '../components/Loader';
import { fetchWithFallback, fuzzySearch } from '../utils/api';

export default function Destinations() {
    const [destinations, setDestinations] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadDestinations();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = fuzzySearch(destinations, searchQuery, ['name', 'country', 'description']);
            setFilteredDestinations(filtered);
        } else {
            setFilteredDestinations(destinations);
        }
    }, [destinations, searchQuery]);

    const loadDestinations = async () => {
        setLoading(true);
        try {
            const data = await fetchWithFallback(null, '/src/data/destinations.json');
            setDestinations(data || []);
        } catch (error) {
            console.error('Error loading destinations:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Explore Destinations</h1>

            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search destinations..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-lg"
                    />
                    <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                </div>
            </div>

            <p className="text-gray-600 mb-6">{filteredDestinations.length} destinations</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map(dest => (
                    <Link
                        key={dest.id}
                        to={`/destinations/${dest.id}`}
                        className="group card overflow-hidden hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={dest.image}
                                alt={dest.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <div className="text-white">
                                    <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                                    <p className="text-sm flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {dest.country}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5">
                            <p className="text-gray-600 mb-4 line-clamp-3">{dest.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {dest.highlights.slice(0, 2).map((highlight, idx) => (
                                    <span key={idx} className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
