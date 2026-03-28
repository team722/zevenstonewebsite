import React from 'react';

export const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-32 min-h-[50vh] text-center px-4">
    <div className="text-red-500 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-zeven-dark mb-2">Error Loading Data</h2>
    <p className="text-zeven-gray">There was a problem communicating with the content API. Please try again later.</p>
  </div>
);
