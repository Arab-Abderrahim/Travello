import { fuzzySearch } from './api';

/**
 * Search across all travel data types
 * @param {string} query - Search query
 * @param {Object} data - Object containing flights, hotels, trips, activities, destinations
 * @returns {Object} - Search results categorized by type
 */
export function globalSearch(query, data) {
    if (!query || query.trim() === '') {
        return {
            flights: [],
            hotels: [],
            trips: [],
            activities: [],
            destinations: [],
        };
    }

    return {
        flights: fuzzySearch(data.flights || [], query, [
            'airline',
            'origin',
            'destination',
            'flightNumber',
        ]),
        hotels: fuzzySearch(data.hotels || [], query, [
            'name',
            'city',
            'country',
            'description',
        ]),
        trips: fuzzySearch(data.trips || [], query, [
            'title',
            'destination',
            'description',
            'difficulty',
        ]),
        activities: fuzzySearch(data.activities || [], query, [
            'title',
            'location',
            'category',
            'description',
        ]),
        destinations: fuzzySearch(data.destinations || [], query, [
            'name',
            'country',
            'description',
        ]),
    };
}

/**
 * Filter items by multiple criteria
 * @param {Array} items - Items to filter
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered items
 */
export function filterItems(items, filters) {
    return items.filter(item => {
        for (const [key, value] of Object.entries(filters)) {
            if (value === null || value === undefined || value === '') continue;

            // Handle range filters (e.g., price)
            if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
                const itemValue = item[key];
                if (itemValue < value.min || itemValue > value.max) return false;
            }
            // Handle exact match
            else if (item[key] !== value) {
                return false;
            }
        }
        return true;
    });
}
