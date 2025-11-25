import { Link, useNavigate } from 'react-router-dom';
import { Plane, Search, Menu, X, MapPin, Calendar, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="gradient-bg p-2 rounded-lg">
                            <Plane className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Travello</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/flights" className="text-gray-700 hover:text-primary-600 font-medium transition">
                            Flights
                        </Link>
                        <Link to="/hotels" className="text-gray-700 hover:text-primary-600 font-medium transition">
                            Hotels
                        </Link>
                        <Link to="/trips" className="text-gray-700 hover:text-primary-600 font-medium transition">
                            Trips
                        </Link>
                        <Link to="/activities" className="text-gray-700 hover:text-primary-600 font-medium transition">
                            Activities
                        </Link>
                        <Link to="/destinations" className="text-gray-700 hover:text-primary-600 font-medium transition">
                            Destinations
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden lg:flex items-center">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search flights, hotels, trips..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </form>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/bookings" className="text-gray-700 hover:text-primary-600 font-medium transition">
                            My Bookings
                        </Link>
                        <Link to="/pricing" className="btn-primary text-sm py-2">
                            Plans
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </form>
                        <div className="space-y-2">
                            <Link
                                to="/flights"
                                className="block py-2 text-gray-700 hover:text-primary-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Flights
                            </Link>
                            <Link
                                to="/hotels"
                                className="block py-2 text-gray-700 hover:text-primary-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Hotels
                            </Link>
                            <Link
                                to="/trips"
                                className="block py-2 text-gray-700 hover:text-primary-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Trips
                            </Link>
                            <Link
                                to="/activities"
                                className="block py-2 text-gray-700 hover:text-primary-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Activities
                            </Link>
                            <Link
                                to="/destinations"
                                className="block py-2 text-gray-700 hover:text-primary-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Destinations
                            </Link>
                            <Link
                                to="/bookings"
                                className="block py-2 text-gray-700 hover:text-primary-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Bookings
                            </Link>
                            <Link
                                to="/pricing"
                                className="block py-2 text-primary-600 font-semibold"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing Plans
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
