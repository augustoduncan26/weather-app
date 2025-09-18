"use client"
// pages/index.tsx
import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const res = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Error al obtener el clima')
      }

      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Head>
        <title>Clima App 🌤️</title>
      </Head>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Consulta el Clima</h1>
        <form onSubmit={fetchWeather} className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ingresa una ciudad..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-100 text-red-600 rounded-lg mb-4">
            {error}
          </div>
        )}

        {weather && (
          <div className="mt-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-700">{weather.city}, {weather.country}</h2>
            <div className="flex items-center my-4">
              <img src={weather.icon} alt={weather.condition} className="w-16 h-16" />
              <p className="text-5xl font-extrabold text-blue-600 ml-4">{weather.temp_c}°C</p>
            </div>
            <p className="text-lg text-gray-500">{weather.condition}</p>
          </div>
        )}
      </div>
    </div>
  )
}