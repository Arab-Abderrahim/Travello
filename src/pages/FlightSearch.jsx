import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';

const algerianCities = ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Ghardaia', 'Tlemcen', 'Bejaia', 'Setif'];
const internationalCities = ['Paris', 'Istanbul', 'Dubai', 'London', 'Madrid', 'Rome', 'Cairo'];
const allCities = [...algerianCities, ...internationalCities].sort();

export default function FlightSearch() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        adults: 1,
        children: 0,
        infants: 0,
        travelClass: 'Economy',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(formData).toString();
        navigate(`/flights/results?${params}`);
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="gradient-bg text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center mb-6">
                        <Plane className="h-12 w-12 mr-4" />
                        <h1 className="text-5xl font-bold">Book Your Flight</h1>
                    </div>
                    <p className="text-xl text-center text-blue-100">
                        Search flights to destinations worldwide at the best prices
                    </p>
                </div>
            </section>

            {/* Search Form */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <form onSubmit={handleSubmit} className="card p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Origin */}
                        <div>
                            <label className="label">
                                <MapPin className="inline h-4 w-4 mr-1" />
                                From (Origin)
                            </label>
                            <select
                                name="origin"
                                value={formData.origin}
                                onChange={handleChange}
                                required
                                className="input-field"
                            >
                                <option value="">Select origin city</option>
                                <optgroup label="Algerian Cities">
                                    {algerianCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="International Cities">
                                    {internationalCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>

                        {/* Destination */}
                        <div>
                            <label className="label">
                                <MapPin className="inline h-4 w-4 mr-1" />
                                To (Destination)
                            </label>
                            <select
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                required
                                className="input-field"
                            >
                                <option value="">Select destination city</option>
                                <optgroup label="Algerian Cities">
                                    {algerianCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="International Cities">
                                    {internationalCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>

                        {/* Departure Date */}
                        <div>
                            <label className="label">
                                <Calendar className="inline h-4 w-4 mr-1" />
                                Departure Date
                            </label>
                            <input
                                type="date"
                                name="departureDate"
                                value={formData.departureDate}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="input-field"
                            />
                        </div>

                        {/* Return Date */}
                        <div>
                            <label className="label">
                                <Calendar className="inline h-4 w-4 mr-1" />
                                Return Date (Optional)
                            </label>
                            <input
                                type="date"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={handleChange}
                                min={formData.departureDate || new Date().toISOString().split('T')[0]}
                                className="input-field"
                            />
                        </div>
                    </div>

                    {/* Passengers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="label">
                                <Users className="inline h-4 w-4 mr-1" />
                                Adults
                            </label>
                            <input
                                type="number"
                                name="adults"
                                value={formData.adults}
                                onChange={handleChange}
                                min="1"
                                max="9"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="label">Children (2-12 years)</label>
                            <input
                                type="number"
                                name="children"
                                value={formData.children}
                                onChange={handleChange}
                                min="0"
                                max="9"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="label">Infants (Under 2)</label>
                            <input
                                type="number"
                                name="infants"
                                value={formData.infants}
                                onChange={handleChange}
                                min="0"
                                max="4"
                                className="input-field"
                            />
                        </div>
                    </div>

                    {/* Travel Class */}
                    <div className="mb-6">
                        <label className="label">Travel Class</label>
                        <select
                            name="travelClass"
                            value={formData.travelClass}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="Economy">Economy</option>
                            <option value="Business">Business</option>
                            <option value="First">First Class</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary w-full text-lg py-4">
                        Search Flights
                        <ArrowRight className="inline ml-2 h-5 w-5" />
                    </button>
                </form>
            </div>

            {/* Info Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plane className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Multiple Airlines</h3>
                        <p className="text-gray-600">Compare prices from all major carriers</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Flexible Dates</h3>
                        <p className="text-gray-600">One-way or round-trip options</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Group Bookings</h3>
                        <p className="text-gray-600">Perfect for families and groups</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
