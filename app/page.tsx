'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import SearchBar from '@/components/SearchBar';
import ErrorMessage from '@/components/ErrorMessage';
import AdditionalMetrics from '@/components/AdditionalMetrics';
import HourlyForecast from '@/components/HourlyForecast';
import WeatherInsights from '@/components/WeatherInsights';
import ThemeToggle from '@/components/ThemeToggle';
import { WeatherCardSkeleton, ForecastSkeleton } from '@/components/LoadingSkeleton';
import {
    getCurrentWeather,
    getCurrentWeatherByCoords,
    getForecast,
    getForecastByCoords,
} from '@/lib/api/weather';
import type { CurrentWeather, ForecastResponse } from '@/types/weather';
import { getWeatherGradient } from '@/lib/utils';

const LAST_CITY_KEY = 'weather-dashboard-last-city';

export default function Home() {
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [forecast, setForecast] = useState<ForecastResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [backgroundGradient, setBackgroundGradient] = useState<string>(
        'from-blue-400 via-blue-300 to-blue-200'
    );

    // Load weather data
    const loadWeather = useCallback(
        async (city: string) => {
            setIsLoading(true);
            setError(null);
            try {
                const [current, forecastData] = await Promise.all([
                    getCurrentWeather(city),
                    getForecast(city),
                ]);
                setWeather(current);
                setForecast(forecastData);
                setBackgroundGradient(getWeatherGradient(current.weather[0].main));
                localStorage.setItem(LAST_CITY_KEY, city);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch weather data');
                setWeather(null);
                setForecast(null);
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    // Load weather by coordinates
    const loadWeatherByCoords = useCallback(
        async (lat: number, lon: number) => {
            setIsLoading(true);
            setError(null);
            try {
                const [current, forecastData] = await Promise.all([
                    getCurrentWeatherByCoords(lat, lon),
                    getForecastByCoords(lat, lon),
                ]);
                setWeather(current);
                setForecast(forecastData);
                setBackgroundGradient(getWeatherGradient(current.weather[0].main));
                localStorage.setItem(LAST_CITY_KEY, current.name);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch weather data');
                setWeather(null);
                setForecast(null);
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    // Handle search
    const handleSearch = async (city: string) => {
        setIsSearching(true);
        setError(null);
        try {
            await loadWeather(city);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch weather data');
        } finally {
            setIsSearching(false);
        }
    };

    // Get user location
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        loadWeatherByCoords(position.coords.latitude, position.coords.longitude);
                    },
                    (err) => {
                        // If geolocation fails, try to load last searched city or default
                        const lastCity = localStorage.getItem(LAST_CITY_KEY);
                        if (lastCity) {
                            loadWeather(lastCity);
                        } else {
                            setIsLoading(false);
                            setError(
                                'Unable to get your location. Please search for a city manually.'
                            );
                        }
                    }
                );
            } else {
                // Geolocation not supported
                const lastCity = localStorage.getItem(LAST_CITY_KEY);
                if (lastCity) {
                    loadWeather(lastCity);
                } else {
                    setIsLoading(false);
                    setError('Geolocation is not supported by your browser.');
                }
            }
        };

        getLocation();
    }, [loadWeather, loadWeatherByCoords]);

    // Update page title
    useEffect(() => {
        if (weather) {
            document.title = `Weather Dashboard — ${weather.name}`;
        } else {
            document.title = 'Weather Dashboard';
        }
    }, [weather]);

    // Get forecast items for the next 5 days (one per day)
    const getDailyForecast = () => {
        if (!forecast) return [];
        const dailyData: ForecastResponse['list'] = [];
        const seenDates = new Set<string>();

        for (const item of forecast.list) {
            const date = new Date(item.dt_txt).toDateString();
            if (!seenDates.has(date) && dailyData.length < 5) {
                seenDates.add(date);
                dailyData.push(item);
            }
        }

        return dailyData;
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Dynamic Background */}
            <motion.div
                key={backgroundGradient}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient} opacity-20 dark:opacity-10`}
            />

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        Weather Dashboard
                        {weather && (
                            <span className="text-accent"> — {weather.name}</span>
                        )}
                    </h1>
                    <p className="text-text/70 text-sm md:text-base">
                        Stay informed about weather conditions worldwide
                    </p>
                </motion.header>

                {/* Search Bar */}
                <div className="mb-8">
                    <SearchBar
                        onSearch={handleSearch}
                        isLoading={isSearching}
                        placeholder="Search for a city..."
                    />
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <div className="mb-6 max-w-2xl mx-auto">
                            <ErrorMessage
                                message={error}
                                onDismiss={() => setError(null)}
                            />
                        </div>
                    )}
                </AnimatePresence>

                {/* Loading State */}
                {isLoading && (
                    <div className="space-y-6">
                        <WeatherCardSkeleton />
                        <div>
                            <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
                            <ForecastSkeleton />
                        </div>
                    </div>
                )}

                {/* Weather Content */}
                {!isLoading && weather && (
                    <div className="space-y-8">
                        {/* Current Weather Card */}
                        <AnimatePresence mode="wait">
                            <WeatherCard key={weather.id} weather={weather} />
                        </AnimatePresence>

                        {/* Hourly Forecast */}
                        {forecast && forecast.list.length > 0 && (
                            <HourlyForecast forecastItems={forecast.list} />
                        )}

                        {/* Additional Metrics */}
                        <AdditionalMetrics weather={weather} />

                        {/* Weather Insights */}
                        {forecast && (
                            <WeatherInsights weather={weather} forecast={forecast} />
                        )}

                        {/* 5-Day Forecast */}
                        {forecast && getDailyForecast().length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-accent" />
                                    5-Day Forecast
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {getDailyForecast().map((item, index) => (
                                        <ForecastCard
                                            key={`${item.dt}-${index}`}
                                            forecast={item}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !weather && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-text/70 text-lg">
                            Search for a city to see weather information
                        </p>
                    </motion.div>
                )}

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center opacity-70 text-sm"
                >
                    Built by <strong>Yash Sharma 🍏</strong> — #100Days100Projects
                </motion.footer>
            </div>
        </div>
    );
}
