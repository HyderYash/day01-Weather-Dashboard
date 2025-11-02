'use client';

import { motion } from 'framer-motion';
import { Droplets, Wind, ArrowUp, ArrowDown } from 'lucide-react';
import type { ForecastItem } from '@/types/weather';
import { getWeatherIconUrl, formatForecastDate } from '@/lib/utils';

interface ForecastCardProps {
    forecast: ForecastItem;
    index: number;
}

export default function ForecastCard({ forecast, index }: ForecastCardProps) {
    const condition = forecast.weather[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-surface rounded-card p-4 shadow-md border border-border backdrop-blur-sm"
        >
            <div className="flex flex-col items-center gap-3">
                <p className="text-sm font-semibold text-text/70">
                    {formatForecastDate(forecast.dt_txt)}
                </p>
                <img
                    src={getWeatherIconUrl(condition.icon, '2x')}
                    alt={condition.description}
                    className="w-16 h-16"
                />
                <div className="text-center">
                    <p className="text-xl font-bold">{Math.round(forecast.main.temp)}°C</p>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                        <div className="flex items-center gap-0.5">
                            <ArrowUp className="w-3 h-3 text-apple-red" />
                            <span className="text-xs text-apple-red font-medium">
                                {Math.round(forecast.main.temp_max)}°
                            </span>
                        </div>
                        <span className="text-xs text-text/50">/</span>
                        <div className="flex items-center gap-0.5">
                            <ArrowDown className="w-3 h-3 text-apple-blue" />
                            <span className="text-xs text-apple-blue font-medium">
                                {Math.round(forecast.main.temp_min)}°
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-text/70">
                    <div className="flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-accent" />
                        <span>{forecast.main.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Wind className="w-3.5 h-3.5 text-accent" />
                        <span>{forecast.wind.speed} m/s</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
