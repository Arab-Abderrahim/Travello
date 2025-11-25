/**
 * Booking management utilities for localStorage
 */

const BOOKINGS_KEY = 'travel_bookings';
const SELECTED_PLAN_KEY = 'selected_plan';

/**
 * Get all bookings from localStorage
 * @returns {Array} - Array of booking objects
 */
export function getBookings() {
    try {
        const bookings = localStorage.getItem(BOOKINGS_KEY);
        return bookings ? JSON.parse(bookings) : [];
    } catch (error) {
        console.error('Error reading bookings:', error);
        return [];
    }
}

/**
 * Save a new booking to localStorage
 * @param {Object} booking - Booking object with required fields
 * @returns {boolean} - Success status
 */
export function saveBooking(booking) {
    try {
        const bookings = getBookings();
        const newBooking = {
            id: generateId(),
            createdAt: new Date().toISOString(),
            confirmed: false,
            ...booking,
        };
        bookings.push(newBooking);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
        return true;
    } catch (error) {
        console.error('Error saving booking:', error);
        return false;
    }
}

/**
 * Update an existing booking
 * @param {string} id - Booking ID
 * @param {Object} updates - Updated booking fields
 * @returns {boolean} - Success status
 */
export function updateBooking(id, updates) {
    try {
        const bookings = getBookings();
        const index = bookings.findIndex(b => b.id === id);
        if (index !== -1) {
            bookings[index] = {
                ...bookings[index],
                ...updates,
                updatedAt: new Date().toISOString(),
            };
            localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error updating booking:', error);
        return false;
    }
}

/**
 * Confirm a booking
 * @param {string} id - Booking ID
 * @returns {boolean} - Success status
 */
export function confirmBooking(id) {
    try {
        return updateBooking(id, { confirmed: true, confirmedAt: new Date().toISOString() });
    } catch (error) {
        console.error('Error confirming booking:', error);
        return false;
    }
}

/**
 * Delete a booking by ID
 * @param {string} id - Booking ID
 * @returns {boolean} - Success status
 */
export function deleteBooking(id) {
    try {
        const bookings = getBookings();
        const filtered = bookings.filter(b => b.id !== id);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting booking:', error);
        return false;
    }
}

/**
 * Calculate total price of all bookings
 * @returns {number} - Total price
 */
export function calculateTotal() {
    const bookings = getBookings();
    return bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
}

/**
 * Get selected pricing plan
 * @returns {string|null} - Selected plan name
 */
export function getSelectedPlan() {
    try {
        return localStorage.getItem(SELECTED_PLAN_KEY);
    } catch (error) {
        console.error('Error reading selected plan:', error);
        return null;
    }
}

/**
 * Save selected pricing plan
 * @param {string} plan - Plan name (Basic, Premium, Agency)
 * @returns {boolean} - Success status
 */
export function saveSelectedPlan(plan) {
    try {
        localStorage.setItem(SELECTED_PLAN_KEY, plan);
        return true;
    } catch (error) {
        console.error('Error saving selected plan:', error);
        return false;
    }
}

/**
 * Generate a unique ID
 * @returns {string} - Unique ID
 */
function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
