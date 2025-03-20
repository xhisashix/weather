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
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 ${className}`}
    >
      {/* モバイル表示で縦幅を縮小 */}
      <div className="flex justify-between items-center mb-1 sm:mb-2">
        <h3 className="text-lg sm:text-xl font-bold dark:text-white truncate">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm ml-2 whitespace-nowrap">
          {date}
        </p>
      </div>

      {/* モバイル表示で要素を適切に配置 */}
      <div className="flex items-center my-2 sm:my-4">
        <WeatherIcon imagePath={weatherIcon} className="w-10 h-10 sm:w-12 sm:h-12 mr-3" />
        <div>
          <p className="text-base sm:text-lg dark:text-white">{weather}</p>
          <div className="mt-1">
            <span className="text-red-500 font-medium mr-2 text-sm sm:text-base">{maxTemp}°C</span>
            <span className="text-blue-500 font-medium text-sm sm:text-base">{minTemp}°C</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        発表元: {forecast.publishingOffice}
      </p>
    </div>
  );
};

export default WeatherCard;
