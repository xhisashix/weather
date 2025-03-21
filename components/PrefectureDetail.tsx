"use client";

import React, { useEffect, useState } from "react";
import { WeatherForecast } from "../types/weather";
import { fetchWeatherByCity } from "../utils/api";
import { prefectures } from "../data/prefectures";
import WeatherIcon from "./WeatherIcon";

interface PrefectureDetailProps {
  prefectureCode: string | null;
}

const PrefectureDetail: React.FC<PrefectureDetailProps> = ({
  prefectureCode,
}) => {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 選択された都道府県が変わったらデータを取得
  useEffect(() => {
    if (!prefectureCode) {
      setForecast(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWeatherByCity(prefectureCode);
        setForecast(data);
      } catch (err) {
        setError("天気データの取得に失敗しました。");
        console.error("Error fetching prefecture weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [prefectureCode]);

  // 日付のフォーマット方法を修正し、SSRとCSRで同じ結果になるようにする
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  if (!prefectureCode) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>都道府県を選択すると、詳細な天気予報が表示されます</p>
      </div>
    );
  }

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

  if (!forecast) {
    return null;
  }

  const prefecture = prefectures.find((p) => p.code === prefectureCode);
  const prefectureName = prefecture?.name || "選択された地域";

  // 今日の天気
  const weatherInfo = forecast;
  // 降水確率
  const chanceOfRain = weatherInfo.forecasts?.[0].chanceOfRain;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-white">
        {prefectureName}の天気予報
      </h2>

      {/* 今日の天気 - モバイル表示調整 */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 dark:text-white">
          今日の天気
        </h3>
        {/* モバイル表示で折り返しやすいように調整 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center my-4 gap-4">
          <div className="flex items-center">
            <WeatherIcon
              imagePath={weatherInfo.forecasts?.[0].image.url}
              className="w-12 h-12 mr-3"
            />
            <div>
              <p className="text-base sm:text-lg dark:text-white">
                {weatherInfo.forecasts?.[0].telop}
              </p>
              <div className="mt-1">
                <span className="text-red-500 font-medium mr-2">
                  {weatherInfo.forecasts?.[0].temperature.max?.celsius || "-"}°C
                </span>
                <span className="text-blue-500 font-medium">
                  {weatherInfo.forecasts?.[0].temperature.min?.celsius || "-"}°C
                </span>
              </div>
            </div>
          </div>

          {/* 降水確率 - モバイル表示調整 */}
          <div className="w-full sm:w-auto sm:ml-auto text-sm bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2 text-center sm:text-right">
              降水確率
            </h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              <div className="flex items-center">
                <span className="w-14 font-medium text-xs">0〜6時:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width:
                        weatherInfo.forecasts?.[0].chanceOfRain?.["T00_06"],
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-xs whitespace-nowrap">
                  {weatherInfo.forecasts?.[0].chanceOfRain?.["T00_06"] || "-"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-14 font-medium text-xs">6〜12時:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width:
                        weatherInfo.forecasts?.[0].chanceOfRain?.["T06_12"],
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-xs whitespace-nowrap">
                  {weatherInfo.forecasts?.[0].chanceOfRain?.["T06_12"] || "-"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-14 font-medium text-xs">12〜18時:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${chanceOfRain?.["T12_18"] || 0}` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs whitespace-nowrap">
                  {chanceOfRain?.["T12_18"] || "-"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-14 font-medium text-xs">18〜24時:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${chanceOfRain?.["T18_24"] || 0}` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs whitespace-nowrap">
                  {chanceOfRain?.["T18_24"] || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 明日・明後日の天気 - モバイル表示調整 */}
        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 dark:text-white">
            明日・明後日の天気
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {weatherInfo.forecasts?.slice(1).map((forecast, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg shadow-md text-center text-gray-500 dark:text-gray-300"
              >
                <p className="font-medium">{forecast.dateLabel}</p>
                <WeatherIcon
                  imagePath={forecast.image.url}
                  className="w-10 h-10 mx-auto my-2"
                />
                <p className="text-sm dark:text-white">{forecast.telop}</p>
                <div className="mt-1">
                  <span className="text-red-500 font-medium mr-2 text-sm">
                    {forecast.temperature.max?.celsius || "-"}°C
                  </span>
                  <span className="text-blue-500 font-medium text-sm">
                    {forecast.temperature.min?.celsius || "-"}°C
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>発表元: {forecast.publishingOffice}</p>
          <p>発表日時: {formatDate(forecast.publicTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default PrefectureDetail;
