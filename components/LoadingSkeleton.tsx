'use client';

import { motion } from 'framer-motion';

export function WeatherCardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface rounded-card p-6 md:p-8 shadow-lg"
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-bg rounded-full animate-pulse" />
                    <div className="space-y-2">
                        <div className="w-32 h-12 bg-bg rounded animate-pulse" />
                        <div className="w-48 h-6 bg-bg rounded animate-pulse" />
                        <div className="w-40 h-4 bg-bg rounded animate-pulse" />
                    </div>
                </div>
                <div className="space-y-2 text-right">
                    <div className="w-40 h-6 bg-bg rounded animate-pulse ml-auto" />
                    <div className="w-32 h-4 bg-bg rounded animate-pulse ml-auto" />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-bg rounded-lg border border-border"
                    >
                        <div className="w-5 h-5 bg-border rounded animate-pulse" />
                        <div className="flex-1 space-y-1">
                            <div className="w-16 h-4 bg-border rounded animate-pulse" />
                            <div className="w-12 h-6 bg-border rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export function ForecastSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-surface rounded-card p-4 shadow-md border border-border"
                >
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-4 bg-bg rounded animate-pulse" />
                        <div className="w-16 h-16 bg-bg rounded-full animate-pulse" />
                        <div className="w-16 h-8 bg-bg rounded animate-pulse" />
                        <div className="w-24 h-4 bg-bg rounded animate-pulse" />
                        <div className="w-32 h-4 bg-bg rounded animate-pulse" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
