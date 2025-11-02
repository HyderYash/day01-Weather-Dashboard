'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const initialTheme = savedTheme || 'system';
        setThemeState(initialTheme);
    }, []);

    // Resolve the actual theme (system -> light/dark)
    useEffect(() => {
        const resolveTheme = (): 'light' | 'dark' => {
            if (theme === 'system') {
                return window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
            }
            return theme;
        };

        const resolved = resolveTheme();
        setResolvedTheme(resolved);

        // Apply theme to document
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolved);

        // Listen for system theme changes
        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => {
                const newResolved = mediaQuery.matches ? 'dark' : 'light';
                setResolvedTheme(newResolved);
                root.classList.remove('light', 'dark');
                root.classList.add(newResolved);
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        if (theme === 'system') {
            // If system, toggle based on current resolved theme
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        } else {
            // If manual, toggle between light and dark
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
