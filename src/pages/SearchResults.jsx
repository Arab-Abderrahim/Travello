import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Plane, Hotel, Compass, Sparkles, MapPin } from 'lucide-react';
import Loader from '../components/Loader';
import { fetchWithFallback } from '../utils/api';
import { globalSearch } from '../utils/search';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        performSearch();
    }, [query]);

    const performSearch = async () => {
        setLoading(true);
        try {
            const [flights, hotels, trips, activities, destinations] = await Promise.all([
                fetchWithFallback(null, '/src/data/flights.json'),
                fetchWithFallback(null, '/src/data/hotels.json'),
                fetchWithFallback(null, '/src/data/trips.json'),
                fetchWithFallback(null, '/src/data/activities.json'),
                fetchWithFallback(null, '/src/data/destinations.json'),
            ]);

            const searchResults = globalSearch(query, {
                flights: flights || [],
                hotels: hotels || [],
                trips: trips || [],
                activities: activities || [],
                destinations: destinations || [],
            });

            setResults(searchResults);
        } catch (error) {
            console.error('Error performing search:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    const totalResults =
        (results?.flights?.length || 0) +
        (results?.hotels?.length || 0) +
        (results?.trips?.length || 0) +
        (results?.activities?.length || 0) +
        (results?.destinations?.length || 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Search Results</h1>
                <p className="text-xl text-gray-600">
                    Showing results for "{query}" ({totalResults} results)
                </p>
            </div>

            {totalResults === 0 ? (
                <div className="text-center py-12">
                    <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
                    <p className="text-gray-600">Try searching with different keywords</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Flights */}
                    {results.flights.length > 0 && (
                        <section>
                            <div className="flex items-center mb-6">
                                <Plane className="h-6 w-6 text-primary-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-900">Flights ({results.flights.length})</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {results.flights.slice(0, 4).map(flight => (
                                    <Link
                                        key={flight.id}
                                        to={`/flights/results?origin=${flight.origin}&destination=${flight.destination}`}
                                        className="card p-4 hover:shadow-lg transition"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-lg">{flight.airline}</span>
                                            <span className="text-primary-600 font-bold">${flight.price}</span>
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {flight.origin} → {flight.destination}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {results.flights.length > 4 && (
                                <Link to="/flights" className="inline-block mt-4 text-primary-600 font-medium hover:text-primary-700">
                                    View all flights →
                                </Link>
                            )}
                        </section>
                    )}

                    {/* Hotels */}
                    {results.hotels.length > 0 && (
                        <section>
                            <div className="flex items-center mb-6">
                                <Hotel className="h-6 w-6 text-primary-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-900">Hotels ({results.hotels.length})</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {results.hotels.slice(0, 6).map(hotel => (
                                    <Link
                                        key={hotel.id}
                                        to={`/hotels/${hotel.id}`}
                                        className="card overflow-hidden hover:shadow-lg transition"
                                    >
                                        <img src={hotel.image} alt={hotel.name} className="w-full h-32 object-cover" />
                                        <div className="p-4">
                                            <h3 className="font-bold mb-1 line-clamp-1">{hotel.name}</h3>
                                            <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-sm">★ {hotel.reviewScore}</span>
                                                <span className="font-bold text-primary-600">${hotel.price}/night</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {results.hotels.length > 6 && (
                                <Link to="/hotels" className="inline-block mt-4 text-primary-600 font-medium hover:text-primary-700">
                                    View all hotels →
                                </Link>
                            )}
                        </section>
                    )}

                    {/* Trips */}
                    {results.trips.length > 0 && (
                        <section>
                            <div className="flex items-center mb-6">
                                <Compass className="h-6 w-6 text-primary-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-900">Trips ({results.trips.length})</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {results.trips.slice(0, 6).map(trip => (
                                    <Link
                                        key={trip.id}
                                        to={`/trips/${trip.id}`}
                                        className="card overflow-hidden hover:shadow-lg transition"
                                    >
                                        <img src={trip.image} alt={trip.title} className="w-full h-32 object-cover" />
                                        <div className="p-4">
                                            <h3 className="font-bold mb-1 line-clamp-1">{trip.title}</h3>
                                            <p className="text-sm text-gray-600">{trip.destination}</p>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-sm">{trip.duration}</span>
                                                <span className="font-bold text-primary-600">${trip.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {results.trips.length > 6 && (
                                <Link to="/trips" className="inline-block mt-4 text-primary-600 font-medium hover:text-primary-700">
                                    View all trips →
                                </Link>
                            )}
                        </section>
                    )}

                    {/* Activities */}
                    {results.activities.length > 0 && (
                        <section>
                            <div className="flex items-center mb-6">
                                <Sparkles className="h-6 w-6 text-primary-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-900">Activities ({results.activities.length})</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {results.activities.slice(0, 6).map(activity => (
                                    <Link
                                        key={activity.id}
                                        to={`/activities/${activity.id}`}
                                        className="card overflow-hidden hover:shadow-lg transition"
                                    >
                                        <img src={activity.image} alt={activity.title} className="w-full h-32 object-cover" />
                                        <div className="p-4">
                                            <h3 className="font-bold mb-1 line-clamp-1">{activity.title}</h3>
                                            <p className="text-sm text-gray-600">{activity.location}</p>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                                                    {activity.category}
                                                </span>
                                                <span className="font-bold text-primary-600">${activity.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {results.activities.length > 6 && (
                                <Link to="/activities" className="inline-block mt-4 text-primary-600 font-medium hover:text-primary-700">
                                    View all activities →
                                </Link>
                            )}
                        </section>
                    )}

                    {/* Destinations */}
                    {results.destinations.length > 0 && (
                        <section>
                            <div className="flex items-center mb-6">
                                <MapPin className="h-6 w-6 text-primary-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-900">Destinations ({results.destinations.length})</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {results.destinations.slice(0, 6).map(dest => (
                                    <Link
                                        key={dest.id}
                                        to={`/destinations/${dest.id}`}
                                        className="card overflow-hidden hover:shadow-lg transition"
                                    >
                                        <img src={dest.image} alt={dest.name} className="w-full h-32 object-cover" />
                                        <div className="p-4">
                                            <h3 className="font-bold mb-1">{dest.name}</h3>
                                            <p className="text-sm text-gray-600">{dest.country}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {results.destinations.length > 6 && (
                                <Link to="/destinations" className="inline-block mt-4 text-primary-600 font-medium hover:text-primary-700">
                                    View all destinations →
                                </Link>
                            )}
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}
