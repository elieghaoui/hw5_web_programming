import React from 'react';
export default function ErrorMessage({ message, onRetry, canRetry }) {
  return (
    <div className="status status-error" role="alert">
      <span aria-hidden="true">!</span>
      <span>{message}</span>
      {canRetry && <button className="retry-button" onClick={onRetry}>Try again</button>}
    </div>
  );
}
