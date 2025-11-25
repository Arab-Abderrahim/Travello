import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Calendar, Users, DollarSign, Edit2, CheckCircle, ShoppingCart } from 'lucide-react';
import { getBookings, deleteBooking, calculateTotal, updateBooking, confirmBooking } from '../utils/bookings';
import ImagePlaceholder from '../components/ImagePlaceholder';

export default function Bookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [total, setTotal] = useState(0);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [imageErrors, setImageErrors] = useState({});

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = () => {
        const allBookings = getBookings();
        setBookings(allBookings);
        setTotal(calculateTotal());
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            deleteBooking(id);
            loadBookings();
        }
    };

    const handleConfirm = (id) => {
        if (confirmBooking(id)) {
            loadBookings();
        }
    };

    const startEdit = (booking) => {
        setEditingId(booking.id);
        setEditForm({
            date: booking.date,
            guests: booking.guests,
            nights: booking.nights || 1,
            fullName: booking.extraDetails?.fullName || '',
            email: booking.extraDetails?.email || '',
            phone: booking.extraDetails?.phone || '',
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = (booking) => {
        let totalPrice = booking.price * parseInt(editForm.guests);

        // For hotels, multiply by nights too
        if (booking.itemType === 'hotel') {
            totalPrice = booking.price * parseInt(editForm.nights) * parseInt(editForm.guests);
        }

        const updates = {
            date: editForm.date,
            guests: parseInt(editForm.guests),
            nights: booking.itemType === 'hotel' ? parseInt(editForm.nights) : undefined,
            totalPrice,
            extraDetails: {
                fullName: editForm.fullName,
                email: editForm.email,
                phone: editForm.phone,
            },
        };

        if (updateBooking(booking.id, updates)) {
            setEditingId(null);
            setEditForm({});
            loadBookings();
        }
    };

    const getItemTypeIcon = (type) => {
        switch (type) {
            case 'flight':
                return '✈️';
            case 'hotel':
                return '🏨';
            case 'trip':
                return '🧳';
            case 'activity':
                return '🎯';
            default:
                return '📍';
        }
    };

    if (bookings.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar className="h-12 w-12 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">No Bookings Yet</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Start exploring and book your next adventure!
                    </p>
                    <div className="flex gap-4 justify-center">
                        <a href="/flights" className="btn-primary">Book a Flight</a>
                        <a href="/hotels" className="btn-secondary">Find Hotels</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bookings List */}
                <div className="lg:col-span-2 space-y-4">
                    {bookings.map((booking) => {
                        const isEditing = editingId === booking.id;

                        return (
                            <div key={booking.id} className={`card p-6 ${booking.confirmed ? 'ring-2 ring-green-500' : ''}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <span className="text-2xl mr-3">{getItemTypeIcon(booking.itemType)}</span>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <div className="text-xs uppercase text-gray-500 font-medium">
                                                        {booking.itemType}
                                                    </div>
                                                    {booking.confirmed && (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                            Confirmed
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">{booking.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {!booking.confirmed && !isEditing && (
                                            <>
                                                <button
                                                    onClick={() => handleConfirm(booking.id)}
                                                    className="text-green-600 hover:text-green-700 transition p-2"
                                                    title="Confirm booking"
                                                >
                                                    <CheckCircle className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => startEdit(booking)}
                                                    className="text-blue-600 hover:text-blue-700 transition p-2"
                                                    title="Edit booking"
                                                >
                                                    <Edit2 className="h-5 w-5" />
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => handleDelete(booking.id)}
                                            className="text-red-600 hover:text-red-700 transition p-2"
                                            title="Cancel booking"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                {booking.image && !imageErrors[booking.id] ? (
                                    <img
                                        src={booking.image}
                                        alt={booking.title}
                                        className="w-full h-32 object-cover rounded-lg mb-4"
                                        onError={() => setImageErrors({ ...imageErrors, [booking.id]: true })}
                                    />
                                ) : (
                                    <div className="mb-4">
                                        <ImagePlaceholder type={booking.itemType} className="w-full h-32" />
                                    </div>
                                )}

                                {isEditing ? (
                                    <div className="space-y-4 mb-4 bg-blue-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="label">Date</label>
                                                <input
                                                    type="date"
                                                    value={editForm.date}
                                                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                                    className="input-field"
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                            <div>
                                                <label className="label">
                                                    {booking.itemType === 'flight' ? 'Passengers' : booking.itemType === 'hotel' ? 'Rooms' : 'Guests'}
                                                </label>
                                                <input
                                                    type="number"
                                                    value={editForm.guests}
                                                    onChange={(e) => setEditForm({ ...editForm, guests: e.target.value })}
                                                    className="input-field"
                                                    min="1"
                                                    max="20"
                                                />
                                            </div>
                                        </div>

                                        {booking.itemType === 'hotel' && (
                                            <div>
                                                <label className="label">Number of Nights</label>
                                                <input
                                                    type="number"
                                                    value={editForm.nights}
                                                    onChange={(e) => setEditForm({ ...editForm, nights: e.target.value })}
                                                    className="input-field"
                                                    min="1"
                                                    max="30"
                                                />
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Total: ${booking.price} × {editForm.nights} night(s) × {editForm.guests} room(s) = ${booking.price * editForm.nights * editForm.guests}
                                                </p>
                                            </div>
                                        )}

                                        <div>
                                            <label className="label">Full Name</label>
                                            <input
                                                type="text"
                                                value={editForm.fullName}
                                                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                                className="input-field"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="label">Email</label>
                                                <input
                                                    type="email"
                                                    value={editForm.email}
                                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                                    className="input-field"
                                                />
                                            </div>
                                            <div>
                                                <label className="label">Phone</label>
                                                <input
                                                    type="tel"
                                                    value={editForm.phone}
                                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                                    className="input-field"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => saveEdit(booking)} className="btn-primary text-sm py-2 px-4">
                                                Save Changes
                                            </button>
                                            <button onClick={cancelEdit} className="btn-secondary text-sm py-2 px-4">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Users className="h-4 w-4 mr-2" />
                                                <span className="text-sm">{booking.guests} {booking.itemType === 'flight' ? 'passengers' : booking.itemType === 'hotel' ? 'rooms' : 'guests'}</span>
                                            </div>
                                            {booking.nights && (
                                                <div className="flex items-center text-gray-600 col-span-2">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    <span className="text-sm">{booking.nights} night(s)</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-sm text-gray-600">Price per unit</div>
                                                    <div className="text-lg font-semibold text-gray-900">${booking.price}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-600">Total</div>
                                                    <div className="text-2xl font-bold text-primary-600">${booking.totalPrice}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {booking.extraDetails && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <div className="text-sm text-gray-600">
                                                    <p><span className="font-semibold">Name:</span> {booking.extraDetails.fullName}</p>
                                                    <p><span className="font-semibold">Email:</span> {booking.extraDetails.email}</p>
                                                    <p><span className="font-semibold">Phone:</span> {booking.extraDetails.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Total Bookings</span>
                                <span className="font-semibold">{bookings.length}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Confirmed</span>
                                <span className="font-semibold text-green-600">
                                    {bookings.filter(b => b.confirmed).length}
                                </span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Pending</span>
                                <span className="font-semibold text-orange-600">
                                    {bookings.filter(b => !b.confirmed).length}
                                </span>
                            </div>

                            {['flight', 'hotel', 'trip', 'activity'].map(type => {
                                const count = bookings.filter(b => b.itemType === type).length;
                                if (count === 0) return null;
                                return (
                                    <div key={type} className="flex justify-between text-gray-600">
                                        <span className="capitalize">{type}s</span>
                                        <span className="font-semibold">{count}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-semibold text-gray-900">Grand Total</span>
                                <div className="flex items-center">
                                    <DollarSign className="h-6 w-6 text-primary-600" />
                                    <span className="text-3xl font-bold text-primary-600">${total}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">Total amount for all bookings</p>

                            {bookings.filter(b => b.confirmed).length > 0 && (
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-3"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Proceed to Checkout ({bookings.filter(b => b.confirmed).length})
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
