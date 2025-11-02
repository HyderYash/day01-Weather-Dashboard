# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Get OpenWeather API Key**
   - Visit [OpenWeather](https://openweathermap.org/)
   - Sign up for a free account
   - Go to [API Keys](https://home.openweathermap.org/api_keys)
   - Create a new API key
   - Copy the key

3. **Create Environment File**
   Create a file named `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with your actual API key.

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### API Key Issues
- Make sure the variable name is exactly `NEXT_PUBLIC_OPENWEATHER_API_KEY`
- No spaces around the `=` sign
- Restart the dev server after creating/modifying `.env.local`

### Location Permission
- The app will request location permission on first load
- If denied, you can manually search for cities
- Location is only used for automatic weather detection

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variable: `NEXT_PUBLIC_OPENWEATHER_API_KEY`
4. Deploy!

### Other Platforms
Make sure to set the `NEXT_PUBLIC_OPENWEATHER_API_KEY` environment variable in your hosting platform's settings.
