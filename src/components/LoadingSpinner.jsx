import React from 'react';
export default function LoadingSpinner({ city }) {
  return <div className="status status-loading" role="status">Loading weather for {city}...</div>;
}
