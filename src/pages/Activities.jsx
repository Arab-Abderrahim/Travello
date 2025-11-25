import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import Loader from '../components/Loader';
import { fetchWithFallback, fuzzySearch } from '../utils/api';

export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        maxPrice: 200,
    });

    useEffect(() => {
        loadActivities();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [activities, searchQuery, filters]);

    const loadActivities = async () => {
        setLoading(true);
        try {
            const data = await fetchWithFallback(null, '/src/data/activities.json');
            setActivities(data || []);
        } catch (error) {
            console.error('Error loading activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = activities;

        if (searchQuery) {
            filtered = fuzzySearch(filtered, searchQuery, ['title', 'location', 'description', 'category']);
        }

        if (filters.category) {
            filtered = filtered.filter(a => a.category === filters.category);
        }

        if (filters.location) {
            filtered = filtered.filter(a => a.location === filters.location);
        }

        filtered = filtered.filter(a => a.price <= filters.maxPrice);

        setFilteredActivities(filtered);
    };

    const uniqueCategories = [...new Set(activities.map(a => a.category))];
    const uniqueLocations = [...new Set(activities.map(a => a.location))];

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Discover Activities</h1>

            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search activities..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-lg"
                    />
                    <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <div className="flex items-center mb-6">
                            <SlidersHorizontal className="h-5 w-5 mr-2 text-primary-600" />
                            <h2 className="text-xl font-bold">Filters</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="label">Category</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">All Categories</option>
                                    {uniqueCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label">Location</label>
                                <select
                                    value={filters.location}
                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">All Locations</option>
                                    {uniqueLocations.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label">Max Price: ${filters.maxPrice}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="300"
                                    step="10"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    setFilters({ category: '', location: '', maxPrice: 200 });
                                    setSearchQuery('');
                                }}
                                className="btn-secondary w-full"
                            >
                                Reset All
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <p className="text-gray-600 mb-6">{filteredActivities.length} activities found</p>

                    {filteredActivities.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No activities found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredActivities.map(activity => (
                                <ActivityCard key={activity.id} activity={activity} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
