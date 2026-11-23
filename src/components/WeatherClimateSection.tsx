import React from 'react';
import { MonthWeatherPicker } from './MonthWeatherPicker';

export const WeatherClimateSection: React.FC = () => {
  return (
    <section id="weather-climate" className="pt-6 sm:pt-8 pb-10 sm:pb-16 bg-[#f6f4ee] md:bg-white scroll-mt-24">
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
        <MonthWeatherPicker />
      </div>
    </section>
  );
};
