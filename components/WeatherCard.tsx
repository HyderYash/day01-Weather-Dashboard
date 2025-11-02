'use client';

import { motion } from 'framer-motion';
import { Droplets, Wind, Thermometer, Eye, MapPin, Sunrise, Sunset } from 'lucide-react';
import type { CurrentWeather } from '@/types/weather';
import { getWeatherIconUrl, capitalize, formatTime } from '@/lib/utils';

interface WeatherCardProps {
    weather: CurrentWeather;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
    const condition = weather.weather[0];
    const main = weather.main;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-surface rounded-card p-6 md:p-8 shadow-lg backdrop-blur-sm"
        >
            {/* Main Weather Info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src={getWeatherIconUrl(condition.icon, '4x')}
                        alt={condition.description}
                        className="w-24 h-24 md:w-32 md:h-32"
                    />
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold">{Math.round(main.temp)}°C</h2>
                        <p className="text-lg text-text/70 flex items-center gap-2">
                            {capitalize(condition.description)}
                        </p>
                        <p className="text-sm text-text/50 flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {weather.name}, {weather.sys.country}
                        </p>
                    </div>
                </div>
                <div className="text-right space-y-2">
                    <p className="text-lg font-semibold flex items-center gap-2 justify-end">
                        <Thermometer className="w-4 h-4 text-accent" />
                        Feels like {Math.round(main.feels_like)}°C
                    </p>
                    <p className="text-sm text-text/70">
                        <span className="text-apple-red font-medium">
                            H: {Math.round(main.temp_max)}°
                        </span>
                        {' '}
                        <span className="text-apple-blue font-medium">
                            L: {Math.round(main.temp_min)}°
                        </span>
                    </p>
                </div>
            </div>

            {/* Sunrise/Sunset */}
            <div className="flex items-center justify-center gap-6 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-text/70">
                    <Sunrise className="w-4 h-4 text-apple-yellow" />
                    <span>{formatTime(weather.sys.sunrise + weather.timezone)}</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2 text-sm text-text/70">
                    <Sunset className="w-4 h-4 text-orange-500" />
                    <span>{formatTime(weather.sys.sunset + weather.timezone)}</span>
                </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-4 bg-bg rounded-lg border border-border"
                >
                    <Droplets className="w-5 h-5 text-accent" />
                    <div>
                        <p className="text-sm text-text/70">Humidity</p>
                        <p className="text-lg font-semibold">{main.humidity}%</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-4 bg-bg rounded-lg border border-border"
                >
                    <Wind className="w-5 h-5 text-accent" />
                    <div>
                        <p className="text-sm text-text/70">Wind Speed</p>
                        <p className="text-lg font-semibold">{weather.wind.speed} m/s</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-4 bg-bg rounded-lg border border-border"
                >
                    <Thermometer className="w-5 h-5 text-accent" />
                    <div>
                        <p className="text-sm text-text/70">Pressure</p>
                        <p className="text-lg font-semibold">{main.pressure} hPa</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-4 bg-bg rounded-lg border border-border"
                >
                    <Eye className="w-5 h-5 text-accent" />
                    <div>
                        <p className="text-sm text-text/70">Visibility</p>
                        <p className="text-lg font-semibold">
                            {(weather.visibility / 1000).toFixed(1)} km
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
