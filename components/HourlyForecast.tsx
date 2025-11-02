'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { ForecastItem } from '@/types/weather';
import { getWeatherIconUrl } from '@/lib/utils';

interface HourlyForecastProps {
    forecastItems: ForecastItem[];
}

export default function HourlyForecast({ forecastItems }: HourlyForecastProps) {
    // Get next 24 hours (8 items, 3-hour intervals)
    const hourlyData = forecastItems.slice(0, 8);

    // Find min and max temps for scale
    const temps = hourlyData.map(item => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempRange = maxTemp - minTemp || 1;

    // Helper to get hour from dt_txt
    const getHour = (dtTxt: string): string => {
        const date = new Date(dtTxt);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-surface rounded-card p-6 shadow-lg backdrop-blur-sm border border-border"
        >
            <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold">24-Hour Forecast</h3>
            </div>

            {/* Temperature Chart */}
            <div className="mb-6 relative h-32 bg-bg/50 rounded-lg p-4">
                <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                        <line
                            key={y}
                            x1="20"
                            y1={y}
                            x2="380"
                            y2={y}
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-border opacity-30"
                        />
                    ))}

                    {/* Temperature line */}
                    <polyline
                        points={hourlyData.map((item, index) => {
                            const x = 20 + (index / (hourlyData.length - 1)) * 360;
                            const normalizedTemp = (item.main.temp - minTemp) / tempRange;
                            const y = 80 - normalizedTemp * 60 + 10; // Inverted Y, with padding
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="currentColor"
                        className="text-accent"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Temperature points */}
                    {hourlyData.map((item, index) => {
                        const x = 20 + (index / (hourlyData.length - 1)) * 360;
                        const normalizedTemp = (item.main.temp - minTemp) / tempRange;
                        const y = 80 - normalizedTemp * 60 + 10;
                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="3"
                                fill="currentColor"
                                className="text-accent"
                            />
                        );
                    })}

                    {/* Temperature labels */}
                    {[minTemp, (minTemp + maxTemp) / 2, maxTemp].map((temp, i) => {
                        const y = i === 0 ? 90 : i === 1 ? 50 : 10;
                        return (
                            <text
                                key={i}
                                x="5"
                                y={y + 3}
                                fontSize="10"
                                className="text-text/60 fill-current"
                            >
                                {Math.round(temp)}°
                            </text>
                        );
                    })}
                </svg>
            </div>

            {/* Hourly items */}
            <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
                {hourlyData.map((item, index) => {
                    const condition = item.weather[0];
                    return (
                        <motion.div
                            key={`${item.dt}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-shrink-0 flex flex-col items-center gap-2 p-3 bg-bg rounded-lg border border-border min-w-[80px]"
                        >
                            <p className="text-xs font-semibold text-text/70">
                                {getHour(item.dt_txt)}
                            </p>
                            <img
                                src={getWeatherIconUrl(condition.icon, '2x')}
                                alt={condition.description}
                                className="w-12 h-12"
                            />
                            <div className="text-center">
                                <p className="text-sm font-bold">{Math.round(item.main.temp)}°</p>
                                <p className="text-xs text-text/60">
                                    {Math.round(item.main.feels_like)}°
                                </p>
                            </div>
                            {item.pop > 0 && (
                                <div className="flex items-center gap-1 text-xs text-apple-blue">
                                    <span>💧</span>
                                    <span>{Math.round(item.pop * 100)}%</span>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
