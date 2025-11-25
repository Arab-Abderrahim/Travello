import { Link } from 'react-router-dom';
import { Plane, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="gradient-bg p-2 rounded-lg">
                                <Plane className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Travello</span>
                        </div>
                        <p className="text-sm mb-4">
                            Your complete travel booking platform for flights, hotels, trips, and unforgettable experiences worldwide.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary-400 transition">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/flights" className="hover:text-primary-400 transition">Book Flights</Link>
                            </li>
                            <li>
                                <Link to="/hotels" className="hover:text-primary-400 transition">Find Hotels</Link>
                            </li>
                            <li>
                                <Link to="/trips" className="hover:text-primary-400 transition">Explore Trips</Link>
                            </li>
                            <li>
                                <Link to="/activities" className="hover:text-primary-400 transition">Activities</Link>
                            </li>
                            <li>
                                <Link to="/destinations" className="hover:text-primary-400 transition">Destinations</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/bookings" className="hover:text-primary-400 transition">My Bookings</Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="hover:text-primary-400 transition">Pricing Plans</Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition">Help Center</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition">Contact Us</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition">Terms & Conditions</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-primary-400" />
                                <span>support@travello.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-primary-400" />
                                <span>+213 555 123 456</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-primary-400 mt-1" />
                                <span>Algiers, Algeria</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Travello. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
