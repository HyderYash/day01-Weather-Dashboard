'use client';

import { motion } from 'framer-motion';
import { Lightbulb, CloudRain, Wind, Sun, Moon, Droplets } from 'lucide-react';
import type { CurrentWeather, ForecastResponse } from '@/types/weather';
import { capitalize } from '@/lib/utils';

interface WeatherInsightsProps {
    weather: CurrentWeather;
    forecast: ForecastResponse | null;
}

export default function WeatherInsights({ weather, forecast }: WeatherInsightsProps) {
    const insights = [];

    // Temperature insights
    const tempDiff = weather.main.temp_max - weather.main.temp_min;
    if (tempDiff > 10) {
        insights.push({
            icon: Sun,
            type: 'info',
            message: `Large temperature variation today (${Math.round(tempDiff)}°C difference between high and low).`,
        });
    }

    // Wind insights
    if (weather.wind.speed > 10) {
        insights.push({
            icon: Wind,
            type: 'warning',
            message: `Strong winds expected (${weather.wind.speed} m/s). Be cautious outdoors.`,
        });
    }

    // Precipitation insights
    if (forecast) {
        const todayPrecipitation = forecast.list
            .slice(0, 8)
            .filter(item => item.pop > 0.5);
        if (todayPrecipitation.length > 0) {
            const maxPop = Math.max(...todayPrecipitation.map(item => item.pop));
            insights.push({
                icon: CloudRain,
                type: maxPop > 0.7 ? 'warning' : 'info',
                message: `High chance of precipitation today (up to ${Math.round(maxPop * 100)}%).`,
            });
        }
    }

    // Humidity insights
    if (weather.main.humidity > 80) {
        insights.push({
            icon: Droplets,
            type: 'info',
            message: 'High humidity levels. It may feel warmer than the actual temperature.',
        });
    } else if (weather.main.humidity < 30) {
        insights.push({
            icon: Droplets,
            type: 'info',
            message: 'Low humidity. Stay hydrated and use moisturizer.',
        });
    }

    // Cloud coverage insights
    if (weather.clouds.all > 80) {
        insights.push({
            icon: CloudRain,
            type: 'info',
            message: 'Heavy cloud coverage expected throughout the day.',
        });
    } else if (weather.clouds.all < 20) {
        insights.push({
            icon: Sun,
            type: 'info',
            message: 'Clear skies expected. Perfect weather for outdoor activities!',
        });
    }

    // Visibility insights
    if (weather.visibility < 5000) {
        insights.push({
            icon: Wind,
            type: 'warning',
            message: `Low visibility (${(weather.visibility / 1000).toFixed(1)} km). Drive carefully.`,
        });
    }

    if (insights.length === 0) {
        insights.push({
            icon: Sun,
            type: 'info',
            message: 'Weather conditions are favorable with no major concerns.',
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-surface rounded-card p-6 shadow-lg backdrop-blur-sm border border-border"
        >
            <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-apple-yellow" />
                <h3 className="text-xl font-bold">Weather Insights</h3>
            </div>
            <div className="space-y-3">
                {insights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className={`flex items-start gap-3 p-3 rounded-lg border ${insight.type === 'warning'
                                    ? 'bg-apple-red/10 border-apple-red/30 text-apple-red'
                                    : 'bg-accent/10 border-accent/30 text-accent'
                                }`}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{insight.message}</p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
