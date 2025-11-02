import axios from 'axios';
import type { CurrentWeather, ForecastResponse } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
    console.warn('NEXT_PUBLIC_OPENWEATHER_API_KEY is not set. Weather features will not work.');
}

/**
 * Fetch current weather for a city
 */
export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
    if (!API_KEY) {
        throw new Error('OpenWeather API key is not configured');
    }

    try {
        const response = await axios.get<CurrentWeather>(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            }
            if (error.response?.status === 401) {
                throw new Error('Invalid API key. Please check your configuration.');
            }
            throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
        }
        throw error;
    }
}

/**
 * Fetch current weather by coordinates (for geolocation)
 */
export async function getCurrentWeatherByCoords(
    lat: number,
    lon: number
): Promise<CurrentWeather> {
    if (!API_KEY) {
        throw new Error('OpenWeather API key is not configured');
    }

    try {
        const response = await axios.get<CurrentWeather>(`${BASE_URL}/weather`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
        }
        throw error;
    }
}

/**
 * Fetch 5-day weather forecast
 */
export async function getForecast(city: string): Promise<ForecastResponse> {
    if (!API_KEY) {
        throw new Error('OpenWeather API key is not configured');
    }

    try {
        const response = await axios.get<ForecastResponse>(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
        }
        throw error;
    }
}

/**
 * Fetch 5-day weather forecast by coordinates
 */
export async function getForecastByCoords(
    lat: number,
    lon: number
): Promise<ForecastResponse> {
    if (!API_KEY) {
        throw new Error('OpenWeather API key is not configured');
    }

    try {
        const response = await axios.get<ForecastResponse>(`${BASE_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
        }
        throw error;
    }
}
