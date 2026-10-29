import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import WeatherCard from './components/WeatherCard.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  function searchWeather() {
    const name = query.trim();
    if (!name) {
      setWeatherData(null);
      setError('Please enter a city name, such as Beirut.');
      setStatus('error');
      return;
    }
    // The city state changes only after submitting the form.
    // Clicking Search again for the same city also works.
    setCity(name);
    setSearchNumber(number => number + 1);
  }

  const [searchNumber, setSearchNumber] = useState(0);

  useEffect(() => {
    if (!city || searchNumber === 0) return;
    let cancelled = false;

    async function loadWeather() {
      setStatus('loading');
      setError('');
      setWeatherData(null);
      try {
        // First search for the city's coordinates (same APIs as HW4).
        const cityParams = new URLSearchParams({ name: city, count: '1', language: 'en', format: 'json' });
        const cityResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${cityParams}`);
        if (!cityResponse.ok) throw new Error(cityResponse.status === 429 ? 'busy' : 'request');
        const cityData = await cityResponse.json();
        if (!cityData.results || cityData.results.length === 0) throw new Error('city');
        const place = cityData.results[0];

        const weatherParams = new URLSearchParams({
          latitude: place.latitude, longitude: place.longitude,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min',
          forecast_days: '3', timezone: 'auto'
        });
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${weatherParams}`);
        if (!response.ok) throw new Error(response.status === 429 ? 'busy' : 'request');
        const weather = await response.json();
        if (!weather.current || !weather.daily) throw new Error('data');
        if (!cancelled) {
          setWeatherData({ place, weather });
          setStatus('success');
        }
      } catch (err) {
        if (cancelled) return;
        let message = 'Something went wrong. Please try again.';
        if (err.message === 'city') message = 'City not found. Check the spelling and try again.';
        else if (err.message === 'busy') message = 'The weather service is busy. Please try again in a moment.';
        else if (err.message === 'request') message = 'Could not get weather data. Please try again.';
        else if (err.message === 'data') message = 'The weather service returned incomplete data.';
        else if (err instanceof TypeError) message = 'Could not connect. Check your internet connection.';
        setError(message);
        setStatus('error');
      }
    }
    loadWeather();
    return () => { cancelled = true; };
  }, [city, searchNumber]);

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Skycast home"><span className="brand-icon">☼ </span>skycast</a>
        <span className="header-label"><span className="header-dot">● </span>WEATHER DASHBOARD</span>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">YOUR DAY, AT A GLANCE</p>
            <h1>Weather made<br />simple.</h1>
            <p className="hero-description">Check current conditions and a 3-day forecast for any city.</p>
          </div>
          <div className="hero-footer"><span>LIVE WEATHER</span><span>•</span><span>POWERED BY OPEN-METEO</span></div>
        </section>
        <SearchBar query={query} setQuery={setQuery} onSearch={searchWeather} loading={status === 'loading'} />
        {status === 'idle' && <div className="status status-idle" role="status">☀ Search for a city to see its weather.</div>}
        {status === 'loading' && <LoadingSpinner city={city} />}
        {status === 'error' && <ErrorMessage message={error} onRetry={searchWeather} canRetry={!!query.trim()} />}
        {status === 'success' && weatherData && (
          <>
            <div className="status status-success" role="status">✓ Weather loaded for {weatherData.place.name}.</div>
            <WeatherCard place={weatherData.place} weather={weatherData.weather} />
          </>
        )}
        <footer className="site-footer">
          <span>Made for everyday planning</span>
          <span>Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></span>
        </footer>
      </main>
    </div>
  );
}
