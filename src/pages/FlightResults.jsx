import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FlightCard from '../components/FlightCard';
import BookingModal from '../components/BookingModal';
import Loader from '../components/Loader';
import { fetchWithFallback } from '../utils/api';
import { Filter } from 'lucide-react';

export default function FlightResults() {
    const [searchParams] = useSearchParams();
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        maxPrice: 1000,
        airline: '',
        class: '',
    });

    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    useEffect(() => {
        loadFlights();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [flights, filters]);

    const loadFlights = async () => {
        setLoading(true);
        try {
            const data = await fetchWithFallback(null, '/src/data/flights.json');

            // Filter by origin and destination if provided
            let filtered = data || [];
            if (origin) {
                filtered = filtered.filter(f => f.origin === origin);
            }
            if (destination) {
                filtered = filtered.filter(f => f.destination === destination);
            }

            setFlights(filtered);
        } catch (error) {
            console.error('Error loading flights:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...flights];

        if (filters.maxPrice) {
            filtered = filtered.filter(f => f.price <= filters.maxPrice);
        }

        if (filters.airline) {
            filtered = filtered.filter(f => f.airline === filters.airline);
        }

        if (filters.class) {
            filtered = filtered.filter(f => f.class === filters.class);
        }

        setFilteredFlights(filtered);
    };

    const handleBook = (flight) => {
        setSelectedFlight(flight);
        setIsModalOpen(true);
    };

    const uniqueAirlines = [...new Set(flights.map(f => f.airline))];

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Available Flights</h1>
                {origin && destination && (
                    <p className="text-xl text-gray-600">
                        {origin} → {destination}
                    </p>
                )}
                <p className="text-gray-500 mt-2">{filteredFlights.length} flights found</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <div className="flex items-center mb-6">
                            <Filter className="h-5 w-5 mr-2 text-primary-600" />
                            <h2 className="text-xl font-bold">Filters</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Price Filter */}
                            <div>
                                <label className="label">Max Price: ${filters.maxPrice}</label>
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

                            {/* Airline Filter */}
                            <div>
                                <label className="label">Airline</label>
                                <select
                                    value={filters.airline}
                                    onChange={(e) => setFilters({ ...filters, airline: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">All Airlines</option>
                                    {uniqueAirlines.map(airline => (
                                        <option key={airline} value={airline}>{airline}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Class Filter */}
                            <div>
                                <label className="label">Travel Class</label>
                                <select
                                    value={filters.class}
                                    onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">All Classes</option>
                                    <option value="Economy">Economy</option>
                                    <option value="Business">Business</option>
                                    <option value="First">First Class</option>
                                </select>
                            </div>

                            <button
                                onClick={() => setFilters({ maxPrice: 1000, airline: '', class: '' })}
                                className="btn-secondary w-full"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Flight Results */}
                <div className="lg:col-span-3">
                    {filteredFlights.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No flights found matching your criteria.</p>
                            <p className="text-gray-500 mt-2">Try adjusting your filters or search again.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredFlights.map(flight => (
                                <FlightCard
                                    key={flight.id}
                                    flight={flight}
                                    onBook={handleBook}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedFlight}
                itemType="flight"
            />
        </div>
    );
}
