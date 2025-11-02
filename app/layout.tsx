import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard built with Next.js and OpenWeather API',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.variable}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
