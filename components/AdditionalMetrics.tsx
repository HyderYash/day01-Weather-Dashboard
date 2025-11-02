'use client';

import { motion } from 'framer-motion';
import { Cloud, Compass, Droplets, Gauge, TrendingUp, Wind } from 'lucide-react';
import type { CurrentWeather } from '@/types/weather';

interface AdditionalMetricsProps {
    weather: CurrentWeather;
}

/**
 * Calculate dew point from temperature and humidity
 */
function calculateDewPoint(temp: number, humidity: number): number {
    const a = 17.27;
    const b = 237.7;
    const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100.0);
    return (b * alpha) / (a - alpha);
}

/**
 * Get wind direction name from degrees
 */
function getWindDirection(deg: number): string {
    const directions = [
        'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ];
    return directions[Math.round(deg / 22.5) % 16];
}

export default function AdditionalMetrics({ weather }: AdditionalMetricsProps) {
    const dewPoint = calculateDewPoint(weather.main.temp, weather.main.humidity);
    const windDirection = getWindDirection(weather.wind.deg);

    const metrics = [
        {
            icon: Cloud,
            label: 'Cloud Coverage',
            value: `${weather.clouds.all}%`,
            color: 'text-apple-space-gray',
        },
        {
            icon: Compass,
            label: 'Wind Direction',
            value: `${windDirection} (${weather.wind.deg}°)`,
            color: 'text-accent',
        },
        {
            icon: Droplets,
            label: 'Dew Point',
            value: `${Math.round(dewPoint)}°C`,
            color: 'text-apple-blue',
        },
        {
            icon: Gauge,
            label: 'Atmospheric',
            value: `${weather.main.pressure} hPa`,
            color: 'text-apple-purple',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-surface rounded-card p-6 shadow-lg backdrop-blur-sm border border-border"
        >
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold">Additional Metrics</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="flex flex-col items-center gap-2 p-4 bg-bg rounded-lg border border-border text-center"
                        >
                            <Icon className={`w-5 h-5 ${metric.color}`} />
                            <div>
                                <p className="text-xs text-text/70 mb-1">{metric.label}</p>
                                <p className="text-sm font-semibold">{metric.value}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
