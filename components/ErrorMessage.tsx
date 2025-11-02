'use client';

import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface ErrorMessageProps {
    message: string;
    onDismiss?: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
        onDismiss?.();
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-apple-red/10 border border-apple-red/30 text-apple-red rounded-card p-4 flex items-center gap-3 shadow-lg backdrop-blur-sm"
        >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{message}</p>
            {onDismiss && (
                <button
                    onClick={handleDismiss}
                    className="p-1 hover:bg-apple-red/20 rounded-full transition-colors"
                    aria-label="Dismiss error"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </motion.div>
    );
}
