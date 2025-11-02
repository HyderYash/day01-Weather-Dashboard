'use client';

import { useState, FormEvent } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
    onSearch: (city: string) => void;
    isLoading?: boolean;
    placeholder?: string;
}

export default function SearchBar({
    onSearch,
    isLoading = false,
    placeholder = 'Search for a city...',
}: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim() && !isLoading) {
            onSearch(query.trim());
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="relative flex items-center">
                <MapPin className="absolute left-5 w-5 h-5 text-text/40 z-10" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    disabled={isLoading}
                    className="w-full pl-14 pr-14 py-4 bg-surface border border-border rounded-full text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="absolute right-2 p-3 bg-accent text-white rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Search className="w-5 h-5" />
                    )}
                </button>
            </div>
        </motion.form>
    );
}
