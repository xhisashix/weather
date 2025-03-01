import { WeatherForecast } from "../types/weather";

export async function fetchWeatherByCity(
  cityCode: string
): Promise<WeatherForecast> {
  try {
    // Next.jsのAPI Routeを使用
    const response = await fetch(`/api/weather?city=${cityCode}`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data as WeatherForecast;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
}
