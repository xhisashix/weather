export interface WeatherForecast {
  publicTime: string;
  publicTimeFormatted: string;
  publishingOffice: string;
  title: string;
  link: string;
  description: Description;
  forecasts: TodayWeather[];
  location: Location;
}

export interface Area {
  area: {
    name: string;
    code: string;
  };
  weatherCodes?: string[];
  weathers?: string[];
  winds?: string[];
  waves?: string[];
  pops?: string[];
  temps?: string[];
  tempsMin?: string[];
  tempsMax?: string[];
  reliabilities?: string[];
}

export interface Prefecture {
  name: string;
  code: string;
  region: string;
}

export interface TodayWeather {
  date: string;
  dateLabel: string;
  telop: string;
  detail: {
    weather: string;
    wind: string;
    wave: string;
  };
  temperature: {
    min: {
      celsius: number | null;
      fahrenheit: number | null;
    };
    max: {
      celsius: number | string;
      fahrenheit: number | string;
    };
  };
  chanceOfRain: {
    T00_06: string;
    T06_12: string;
    T12_18: string;
    T18_24: string;
  };
  image: {
    title: string;
    url: string;
    width: number;
    height: number;
  };
}

export interface Description {
  publicTime: string;
  publicTimeFormatted: string;
  headlineText: string;
  bodyText: string;
  text: string;
}

export interface Location {
  area: string;
  prefecture: string;
  district: string;
  city: string;
}
