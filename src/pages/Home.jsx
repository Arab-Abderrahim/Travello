import { Link } from 'react-router-dom';
import { Plane, Hotel, Compass, Sparkles, Search, ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="gradient-bg text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Your Journey Starts Here
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        Book flights, hotels, trips & activities worldwide
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/flights" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
                            Book a Flight
                        </Link>
                        <Link to="/hotels" className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition">
                            Find Hotels
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Access Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link to="/flights" className="card p-6 hover:shadow-2xl transition group">
                        <div className="gradient-bg p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition">
                            <Plane className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Flights</h3>
                        <p className="text-gray-600 text-sm mb-3">Search and book flights to destinations worldwide</p>
                        <span className="text-primary-600 font-medium flex items-center text-sm">
                            Book Now <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                    </Link>

                    <Link to="/hotels" className="card p-6 hover:shadow-2xl transition group">
                        <div className="gradient-bg p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition">
                            <Hotel className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Hotels</h3>
                        <p className="text-gray-600 text-sm mb-3">Find perfect accommodation for your stay</p>
                        <span className="text-primary-600 font-medium flex items-center text-sm">
                            Explore <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                    </Link>

                    <Link to="/trips" className="card p-6 hover:shadow-2xl transition group">
                        <div className="gradient-bg p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition">
                            <Compass className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Trips</h3>
                        <p className="text-gray-600 text-sm mb-3">Multi-day adventures and guided tours</p>
                        <span className="text-primary-600 font-medium flex items-center text-sm">
                            Discover <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                    </Link>

                    <Link to="/activities" className="card p-6 hover:shadow-2xl transition group">
                        <div className="gradient-bg p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Activities</h3>
                        <p className="text-gray-600 text-sm mb-3">Exciting experiences and local tours</p>
                        <span className="text-primary-600 font-medium flex items-center text-sm">
                            Browse <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                    </Link>
                </div>
            </section>

            {/* Featured Destinations */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
                    <p className="text-xl text-gray-600">Explore amazing places around the world</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/destinations/dest-alg" className="relative h-64 rounded-xl overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800"
                            alt="Algiers"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                            <div className="text-white">
                                <h3 className="text-2xl font-bold mb-1">Algiers</h3>
                                <p className="text-sm text-gray-200">Algeria's vibrant capital</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/destinations/dest-par" className="relative h-64 rounded-xl overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
                            alt="Paris"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                            <div className="text-white">
                                <h3 className="text-2xl font-bold mb-1">Paris</h3>
                                <p className="text-sm text-gray-200">The City of Light</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/destinations/dest-dxb" className="relative h-64 rounded-xl overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"
                            alt="Dubai"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                            <div className="text-white">
                                <h3 className="text-2xl font-bold mb-1">Dubai</h3>
                                <p className="text-sm text-gray-200">Luxury & Innovation</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="text-center mt-8">
                    <Link to="/destinations" className="btn-primary inline-block">
                        View All Destinations
                    </Link>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-gray-100 mt-20 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Travello?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Easy Booking</h3>
                            <p className="text-gray-600">Search, compare, and book all in one place</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Best Prices</h3>
                            <p className="text-gray-600">Competitive rates on flights, hotels & activities</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                                <Compass className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Worldwide Coverage</h3>
                            <p className="text-gray-600">Explore destinations across the globe</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
