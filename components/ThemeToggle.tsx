'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
    const { resolvedTheme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-surface/90 dark:bg-surface/90 border border-border rounded-full shadow-lg backdrop-blur-md hover:shadow-xl transition-all flex items-center justify-center group"
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <motion.div
                initial={false}
                animate={{ rotate: resolvedTheme === 'dark' ? 0 : 360 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="relative"
            >
                {resolvedTheme === 'dark' ? (
                    <Sun className="w-5 h-5 text-apple-yellow group-hover:text-yellow-400 transition-colors" />
                ) : (
                    <Moon className="w-5 h-5 text-apple-space-gray group-hover:text-apple-space-gray/80 transition-colors" />
                )}
            </motion.div>
        </motion.button>
    );
}
