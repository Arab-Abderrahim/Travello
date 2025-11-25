import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import HotelCard from '../components/HotelCard';
import Loader from '../components/Loader';
import { fetchWithFallback, fuzzySearch } from '../utils/api';

export default function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        city: '',
        minPrice: 0,
        maxPrice: 2000,
        minRating: 0,
    });

    useEffect(() => {
        loadHotels();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [hotels, searchQuery, filters]);

    const loadHotels = async () => {
        setLoading(true);
        try {
            const data = await fetchWithFallback(null, '/src/data/hotels.json');
            setHotels(data || []);
        } catch (error) {
            console.error('Error loading hotels:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = hotels;

        // Apply search
        if (searchQuery) {
            filtered = fuzzySearch(filtered, searchQuery, ['name', 'city', 'country', 'description']);
        }

        // Apply filters
        if (filters.city) {
            filtered = filtered.filter(h => h.city === filters.city);
        }

        filtered = filtered.filter(h =>
            h.price >= filters.minPrice &&
            h.price <= filters.maxPrice &&
            h.reviewScore >= filters.minRating
        );

        setFilteredHotels(filtered);
    };

    const uniqueCities = [...new Set(hotels.map(h => h.city))].sort();

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Find Your Perfect Hotel</h1>

            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search hotels by name, city, or country..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-lg"
                    />
                    <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <div className="flex items-center mb-6">
                            <SlidersHorizontal className="h-5 w-5 mr-2 text-primary-600" />
                            <h2 className="text-xl font-bold">Filters</h2>
                        </div>

                        <div className="space-y-6">
                            {/* City Filter */}
                            <div>
                                <label className="label">City</label>
                                <select
                                    value={filters.city}
                                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">All Cities</option>
                                    {uniqueCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="label">
                                    Price Range: ${filters.minPrice} - ${filters.maxPrice}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="2000"
                                    step="50"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <label className="label">Minimum Rating</label>
                                <select
                                    value={filters.minRating}
                                    onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                                    className="input-field"
                                >
                                    <option value="0">Any Rating</option>
                                    <option value="3.0">3.0+</option>
                                    <option value="3.5">3.5+</option>
                                    <option value="4.0">4.0+</option>
                                    <option value="4.5">4.5+</option>
                                </select>
                            </div>

                            <button
                                onClick={() => {
                                    setFilters({ city: '', minPrice: 0, maxPrice: 2000, minRating: 0 });
                                    setSearchQuery('');
                                }}
                                className="btn-secondary w-full"
                            >
                                Reset All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hotels Grid */}
                <div className="lg:col-span-3">
                    <p className="text-gray-600 mb-6">{filteredHotels.length} hotels found</p>

                    {filteredHotels.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No hotels found matching your criteria.</p>
                            <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredHotels.map(hotel => (
                                <HotelCard key={hotel.id} hotel={hotel} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
