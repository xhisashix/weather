import React from "react";
import { WeatherForecast } from "../types/weather";
import WeatherIcon from "./WeatherIcon";

interface WeatherCardProps {
  forecast: WeatherForecast;
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  forecast,
  className = "",
}) => {
  // 今日の天気データを取得
  const weatherInfo = forecast;
  const title = weatherInfo.title;
  const weatherIcon = weatherInfo.forecasts?.[0].image.url;
  const date = weatherInfo.forecasts?.[0].dateLabel;
  const weather = weatherInfo.forecasts?.[0].detail.weather || "情報なし";
  const maxTemp = weatherInfo.forecasts?.[0].temperature.max?.celsius || "-";
  const minTemp = weatherInfo.forecasts?.[0].temperature.min?.celsius || "-";

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${className}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold dark:text-white">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {date}
        </p>
      </div>

      <div className="flex items-center my-4">
        <WeatherIcon imagePath={weatherIcon} className="text-5xl mr-4" />
        <div>
          <p className="text-lg dark:text-white">{weather}</p>
          <div className="mt-1">
            <span className="text-red-500 font-medium mr-2">{maxTemp}°C</span>
            <span className="text-blue-500 font-medium">{minTemp}°C</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        発表元: {forecast.publishingOffice}
      </p>
    </div>
  );
};

export default WeatherCard;
