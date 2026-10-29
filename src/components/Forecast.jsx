import React from 'react';
import { getWeatherInfo } from '../weatherInfo.js';

export default function Forecast({ daily }) {
  return (
    <section className="forecast-section" aria-labelledby="forecast-title">
      <div className="forecast-heading">
        <h3 id="forecast-title">3-day forecast</h3>
        <span>UP NEXT</span>
      </div>
      <div className="forecast-list">
        {daily.time.map((date, index) => {
          const info = getWeatherInfo(daily.weather_code[index]);
          const dayName = new Date(`${date}T12:00:00`).toLocaleDateString('en', { weekday: 'long' });
          return (
            <article className="forecast-day" key={date}>
              <span className="forecast-name">{dayName}</span>
              <span className="forecast-icon" aria-hidden="true">{info.icon}</span>
              <span className="forecast-desc">{info.text}</span>
              <div className="forecast-temperatures">
                <span>{Math.round(daily.temperature_2m_max[index])}°</span>
                <span className="forecast-low">{Math.round(daily.temperature_2m_min[index])}°</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
