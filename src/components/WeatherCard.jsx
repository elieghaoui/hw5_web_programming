import React from 'react';
import { getWeatherInfo } from '../weatherInfo.js';
import Forecast from './Forecast.jsx';

export default function WeatherCard({ place, weather }) {
  const current = weather.current;
  const info = getWeatherInfo(current.weather_code, current.is_day);

  return (
    <section className="weather-card" aria-labelledby="location-name">
      <div className="weather-card-header">
        <div>
          <p className="section-label">CURRENT WEATHER</p>
          <h2 id="location-name">{place.name}</h2>
          <p className="location-detail">{[place.admin1, place.country].filter(Boolean).join(', ')}</p>
        </div>
        <span className="current-badge"><span className="current-dot">● </span>NOW</span>
      </div>
      <div className="current-weather">
        <div className="current-summary">
          <div className="condition-line">
            <span className="weather-icon" aria-hidden="true">{info.icon}</span>
            <span>{info.text}</span>
          </div>
          <p className="temperature">{Math.round(current.temperature_2m)}°<span className="temperature-unit">C</span></p>
          <p className="updated-time">Local time: {current.time.replace('T', ' ')}</p>
        </div>
        <div className="metrics-grid">
          <article className="metric-card"><span className="metric-icon" aria-hidden="true">◌</span><p>Humidity</p><strong>{current.relative_humidity_2m}%</strong></article>
          <article className="metric-card"><span className="metric-icon" aria-hidden="true">〰</span><p>Wind speed</p><strong>{Math.round(current.wind_speed_10m)} km/h</strong></article>
          <article className="metric-card"><span className="metric-icon" aria-hidden="true">☼</span><p>Feels like</p><strong>{Math.round(current.apparent_temperature)}°C</strong></article>
        </div>
      </div>
      <Forecast daily={weather.daily} />
    </section>
  );
}
