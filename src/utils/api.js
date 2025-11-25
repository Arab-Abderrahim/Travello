/**
 * Fetch data from an API with automatic fallback to local JSON file
 * @param {string} apiUrl - The API endpoint to fetch from (can be null for fallback-only)
 * @param {string} fallbackFile - Path to local JSON fallback file
 * @returns {Promise<any>} - The fetched data
 */
export async function fetchWithFallback(apiUrl, fallbackFile) {
    // If no API URL provided, use fallback immediately
    if (!apiUrl) {
        return await loadFallback(fallbackFile);
    }

    try {
        console.log(`Attempting to fetch from API: ${apiUrl}`);
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        console.log(`Successfully fetched from API: ${apiUrl}`);
        return data;
    } catch (error) {
        console.warn(`API fetch failed: ${error.message}. Using fallback data.`);
        return await loadFallback(fallbackFile);
    }
}

/**
 * Load fallback data from local JSON file
 * @param {string} fallbackFile - Path to fallback JSON file
 * @returns {Promise<any>} - The fallback data
 */
async function loadFallback(fallbackFile) {
    try {
        const response = await fetch(fallbackFile);
        if (!response.ok) {
            throw new Error(`Failed to load fallback file: ${fallbackFile}`);
        }
        const data = await response.json();
        console.log(`Loaded fallback data from: ${fallbackFile}`);
        return data;
    } catch (error) {
        console.error(`Error loading fallback data: ${error.message}`);
        return null;
    }
}

/**
 * Search through data using fuzzy matching
 * @param {Array} data - Array of items to search
 * @param {string} query - Search query
 * @param {Array<string>} fields - Fields to search in
 * @returns {Array} - Filtered results
 */
export function fuzzySearch(data, query, fields) {
    if (!query || query.trim() === '') return data;

    const lowerQuery = query.toLowerCase().trim();

    return data.filter(item => {
        return fields.some(field => {
            const value = getNestedValue(item, field);
            if (!value) return false;
            return String(value).toLowerCase().includes(lowerQuery);
        });
    });
}

/**
 * Get nested object value using dot notation
 * @param {Object} obj - The object to search
 * @param {string} path - Dot-notation path (e.g., 'location.city')
 * @returns {any} - The value at the path
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}
