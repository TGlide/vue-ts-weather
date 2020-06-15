export type WeatherMain =
  | "clouds"
  | "clear"
  | "atmosphere"
  | "snow"
  | "rain"
  | "drizzle"
  | "thunderstorm";

export interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: WeatherMain;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export enum WeatherIcons {
  clouds = "cloud-sun",
  clear = "sun",
  atmosphere = "smog",
  snow = "snowflake",
  rain = "cloud-rain",
  drizzle = "cloud-rain",
  thunderstorm = "bolt"
}
