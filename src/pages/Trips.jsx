import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import TripCard from '../components/TripCard';
import Loader from '../components/Loader';
import { fetchWithFallback, fuzzySearch } from '../utils/api';

export default function Trips() {
    const [trips, setTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        maxPrice: 5000,
    });

    useEffect(() => {
        loadTrips();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [trips, searchQuery, filters]);

    const loadTrips = async () => {
        setLoading(true);
        try {
            const data = await fetchWithFallback(null, '/src/data/trips.json');
            setTrips(data || []);
        } catch (error) {
            console.error('Error loading trips:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = trips;

        if (searchQuery) {
            filtered = fuzzySearch(filtered, searchQuery, ['title', 'destination', 'description', 'country']);
        }

        filtered = filtered.filter(t => t.price <= filters.maxPrice);

        setFilteredTrips(filtered);
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Explore Amazing Trips</h1>

            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search trips by destination, title, or description..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-lg"
                    />
                    <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <div className="flex items-center mb-6">
                            <SlidersHorizontal className="h-5 w-5 mr-2 text-primary-600" />
                            <h2 className="text-xl font-bold">Filters</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="label">Max Price: ${filters.maxPrice}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="15000"
                                    step="500"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    setFilters({ maxPrice: 5000 });
                                    setSearchQuery('');
                                }}
                                className="btn-secondary w-full"
                            >
                                Reset All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trips Grid */}
                <div className="lg:col-span-3">
                    <p className="text-gray-600 mb-6">{filteredTrips.length} trips found</p>

                    {filteredTrips.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No trips found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredTrips.map(trip => (
                                <TripCard key={trip.id} trip={trip} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
