// Same weather descriptions and icons used in HW4.
export function getWeatherInfo(code, isDay = 1) {
  if (code === 0) return { text: 'Clear sky', icon: isDay ? '☀️' : '🌙' };
  if (code === 1) return { text: 'Mainly clear', icon: '🌤️' };
  if (code === 2) return { text: 'Partly cloudy', icon: '⛅' };
  if (code === 3) return { text: 'Overcast', icon: '☁️' };
  if (code === 45 || code === 48) return { text: 'Foggy', icon: '🌫️' };
  if (code >= 51 && code <= 57) return { text: 'Drizzle', icon: '🌦️' };
  if (code >= 61 && code <= 67) return { text: 'Rain', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { text: 'Snow', icon: '❄️' };
  if (code >= 80 && code <= 82) return { text: 'Rain showers', icon: '🌦️' };
  if (code >= 95) return { text: 'Thunderstorm', icon: '⛈️' };
  return { text: 'Cloudy', icon: '☁️' };
}
