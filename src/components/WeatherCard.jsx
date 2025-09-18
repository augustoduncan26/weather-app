// components/WeatherCard.jsx
import React from 'react'

const WeatherCard = ({ city, country, temperature, condition, aiMessage }) => {
  if (!city) return null

  return (
    <div className="bg-gradient-to-br from-blue-400 to-indigo-600 text-white rounded-xl shadow-lg p-6 md:p-8 mt-8 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        {city}
        {country && `, ${country}`}
      </h2>
      <p className="text-5xl md:text-6xl font-extrabold mb-4">{temperature}°C</p>
      <p className="text-xl md:text-2xl font-medium mb-6">{condition}</p>
      <div className="bg-white bg-opacity-20 rounded-lg p-4 text-sm md:text-base italic">
        <p className="leading-relaxed">{aiMessage}</p>
      </div>
    </div>
  )
}

export default WeatherCard