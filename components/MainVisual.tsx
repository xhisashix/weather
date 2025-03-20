"use client";

import React, { useEffect, useState } from "react";
import { WeatherForecast } from "../types/weather";
import { fetchWeatherByCity } from "../utils/api";
import { MAJOR_CITIES, prefectures } from "../data/prefectures";
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

  // 都市コードから地域情報を取得する関数
  const getRegionForCity = (cityCode: string) => {
    const prefecture = prefectures.find((p) => p.code === cityCode);
    return prefecture?.region || "";
  };

  // 色のマッピング（地方ごとに色を設定）
  const regionColors: Record<string, string> = {
    北海道: "border-blue-400 dark:border-blue-800",
    東北: "border-green-400 dark:border-green-800",
    関東: "border-red-400 dark:border-red-800",
    中部: "border-yellow-400 dark:border-yellow-800",
    関西: "border-purple-400 dark:border-purple-800",
    中国: "border-pink-400 dark:border-pink-800",
    四国: "border-indigo-400 dark:border-indigo-800",
    九州: "border-orange-400 dark:border-orange-800",
    沖縄: "border-teal-400 dark:border-teal-800",
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        主要都市の天気予報
      </h2>
      {/* スマホ表示で途切れないように調整 */}
      <div className="overflow-x-auto pb-2 p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-w-full">
          {Object.entries(forecasts).map(([cityCode, forecast]) =>
            forecast ? (
              <div
                key={cityCode}
                className={`border-l-4 pl-2 ${
                  regionColors[getRegionForCity(cityCode)]
                }`}
              >
                {/* WeatherCardのサイズと内部余白を調整 */}
                <WeatherCard
                  forecast={forecast}
                  className="w-full min-w-[280px]"
                />
              </div>
            ) : (
              <div
                key={cityCode}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md text-center text-gray-500 dark:text-gray-300 min-w-[280px]"
              >
                データを取得できませんでした
              </div>
            )
          )}
        </div>
      </div>
      {/* 地方の色凡例 - モバイル対応のために調整 */}
    </section>
  );
};

export default MainVisual;
