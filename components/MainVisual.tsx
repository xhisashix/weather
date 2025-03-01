"use client";

import React, { useEffect, useState } from "react";
import { WeatherForecast } from "../types/weather";
import { fetchWeatherByCity } from "../utils/api";
import { MAJOR_CITIES } from "../data/prefectures";
import WeatherCard from "./WeatherCard";

const MainVisual: React.FC = () => {
  const [forecasts, setForecasts] = useState<
    Record<string, WeatherForecast | null>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecasts = async () => {
      setLoading(true);
      setError(null);

      try {
        const results: Record<string, WeatherForecast | null> = {};

        // 並列で各都市のデータを取得
        const requests = Object.entries(MAJOR_CITIES).map(
          async ([cityName, cityCode]) => {
            try {
              const data = await fetchWeatherByCity(cityCode);
              return { cityCode, data };
            } catch (err) {
              console.error(`Failed to fetch data for ${cityName}:`, err);
              return { cityCode, data: null };
            }
          }
        );

        const responses = await Promise.all(requests);

        // 結果を整理
        responses.forEach(({ cityCode, data }) => {
          results[cityCode] = data;
        });

        setForecasts(results);
      } catch (err) {
        setError(
          "天気データの取得に失敗しました。後でもう一度お試しください。"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecasts();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        主要都市の天気予報
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(forecasts).map(([cityCode, forecast]) =>
          forecast ? (
            <WeatherCard key={cityCode} forecast={forecast} />
          ) : (
            <div
              key={cityCode}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md text-center text-gray-500 dark:text-gray-300"
            >
              データを取得できませんでした
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default MainVisual;
