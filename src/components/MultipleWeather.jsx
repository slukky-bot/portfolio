import React, { useState } from "react";
import axios from "axios";

// api key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function MultipleWeather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`
      );

      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          3‑Day Weather Forecast 🌤️
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {data && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              {data.location.name}, {data.location.country}
            </h2>

            {/* 3-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.forecast.forecastday.map((day) => (
                <div key={day.date} className="bg-blue-50 rounded shadow p-4">
                  <h3 className="font-medium mb-1">{day.date}</h3>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="mx-auto mb-2"
                  />
                  <p className="text-lg font-semibold">{day.day.avgtemp_c}°C</p>
                  <p className="capitalize text-gray-600 mb-1">
                    {day.day.condition.text}
                  </p>
                  <p className="text-sm text-gray-500">
                    Max: {day.day.maxtemp_c}°C | Min: {day.day.mintemp_c}°C
                  </p>
                  <p className="text-sm text-gray-500">
                    Humidity: {day.day.avghumidity}% <br />
                    Wind: {day.day.maxwind_kph} kph
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
