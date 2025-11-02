# Weather Dashboard 🌤️

A beautiful, modern weather dashboard built with Next.js, TypeScript, Tailwind CSS, and the OpenWeather API. Featuring an Apple-inspired design aesthetic with smooth animations, responsive layout, and automatic location detection.

## ✨ Features

- 🔍 **City Search**: Search for weather in any city worldwide
- 📍 **Auto Location**: Automatically detects your location using browser geolocation
- 📊 **Current Weather**: Displays temperature, conditions, humidity, wind speed, pressure, and visibility
- 📅 **5-Day Forecast**: View upcoming weather conditions with detailed information
- 🎨 **Dynamic Backgrounds**: Background color adapts based on weather conditions
- 🌓 **Dark Mode**: Automatically adapts to your system's color scheme preference
- 💾 **LocalStorage**: Remembers your last searched city
- ✨ **Smooth Animations**: Powered by Framer Motion for delightful interactions
- 📱 **Fully Responsive**: Works beautifully on mobile, tablet, and desktop

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- OpenWeather API key ([Get one here](https://openweathermap.org/api))

### Installation

1. Clone this repository or navigate to the project directory:
   ```bash
   cd "day01-Weather Dashboard (OpenWeather API)"
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
.
├── app/
│   ├── globals.css          # Global styles with Apple design system
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── WeatherCard.tsx      # Current weather display card
│   ├── ForecastCard.tsx     # Forecast item card
│   ├── SearchBar.tsx        # City search input
│   ├── LoadingSkeleton.tsx  # Loading state skeletons
│   └── ErrorMessage.tsx     # Error display component
├── lib/
│   ├── api/
│   │   └── weather.ts       # OpenWeather API service
│   └── utils.ts             # Utility functions
├── types/
│   └── weather.ts           # TypeScript type definitions
└── public/                  # Static assets
```

## 🎨 Design System

The app follows Apple's Human Interface Guidelines with:

- **Minimalistic UI**: Clean, spacious layouts with generous white space
- **Smooth Animations**: Fast, subtle transitions (0.25s ease-in-out)
- **Rounded Corners**: 16px border radius for cards and buttons
- **Color Palette**: Apple-inspired colors with automatic dark mode support
- **Typography**: Inter font family for elegant, readable text

## 🔧 Technologies Used

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **Axios** (HTTP Client)
- **Lucide React** (Icons)
- **OpenWeather API**

## 📝 API Setup

1. Sign up for a free account at [OpenWeather](https://openweathermap.org/)
2. Navigate to the [API Keys](https://home.openweathermap.org/api_keys) section
3. Generate a new API key
4. Copy the key and paste it in your `.env.local` file

**Note**: Free tier allows 60 calls/minute and 1,000,000 calls/month.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `NEXT_PUBLIC_OPENWEATHER_API_KEY` environment variable
4. Deploy!

The app will be live in minutes.

## 🎯 Features in Detail

### Search Functionality
- Type a city name and press Enter or click the search button
- Invalid cities show friendly error messages
- Search state is preserved in localStorage

### Location Detection
- On first load, the app requests location permission
- If granted, automatically shows weather for your location
- Falls back to last searched city if location is unavailable

### Weather Display
- **Current Conditions**: Temperature, feels-like, high/low, description
- **Weather Details**: Humidity, wind speed, atmospheric pressure, visibility
- **5-Day Forecast**: One forecast per day with temperature ranges and conditions

### Responsive Design
- Mobile-first approach
- Adapts seamlessly to all screen sizes
- Touch-friendly interactions

## 🤝 Contributing

This is part of the #100Days100Projects challenge. Feel free to fork, modify, and create your own version!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built by **Yash Sharma 🍏** as part of the #100Days100Projects Challenge.

---

**Note**: Make sure to keep your API key secure and never commit it to version control. The `.env.local` file is already included in `.gitignore`.
