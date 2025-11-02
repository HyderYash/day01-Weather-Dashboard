/**
 * Utility function to merge class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Get weather icon URL from OpenWeather
 */
export function getWeatherIconUrl(icon: string, size: '2x' | '4x' = '2x'): string {
    return `https://openweathermap.org/img/wn/${icon}@${size}.png`;
}

/**
 * Format date to readable string
 */
export function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Format date for forecast items
 */
export function formatForecastDate(dtTxt: string): string {
    const date = new Date(dtTxt);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Get time from timestamp
 */
export function formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });
}

/**
 * Format timestamp to hour only
 */
export function formatHour(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
    });
}

/**
 * Get background gradient based on weather condition
 * Returns subtle gradients that work well with Apple design aesthetic
 */
export function getWeatherGradient(weatherMain: string): string {
    const gradients: Record<string, string> = {
        Clear: 'from-blue-300 via-blue-200 to-yellow-100',
        Clouds: 'from-gray-300 via-gray-200 to-blue-100',
        Rain: 'from-gray-500 via-blue-400 to-blue-300',
        Drizzle: 'from-gray-400 via-blue-300 to-blue-200',
        Thunderstorm: 'from-gray-600 via-gray-500 to-blue-500',
        Snow: 'from-gray-200 via-gray-100 to-white',
        Mist: 'from-gray-300 via-gray-200 to-gray-100',
        Fog: 'from-gray-300 via-gray-200 to-gray-100',
        Haze: 'from-yellow-200 via-yellow-100 to-orange-100',
        Dust: 'from-yellow-300 via-yellow-200 to-orange-200',
        Sand: 'from-yellow-400 via-yellow-300 to-orange-300',
        Ash: 'from-gray-400 via-gray-300 to-gray-200',
        Squall: 'from-gray-400 via-gray-300 to-blue-300',
        Tornado: 'from-gray-600 via-gray-500 to-red-300',
    };

    return (
        gradients[weatherMain] ||
        'from-blue-300 via-blue-200 to-blue-100'
    );
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}