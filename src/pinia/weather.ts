import axios from "axios";
import { defineStore } from "pinia";

interface CityInfo {
  city: string;
  citykey: string;
  parent: string;
  updateTime: string;
}

interface Forecast {
  aqi: number;
  date: string;
  fl: string;
  fx: string;
  high: string;
  low: string;
  notice: string;
  sunrise: string;
  sunset: string;
  type: string;
  week: string;
  ymd: string;
}

interface WeatherData {
  forecast: Forecast[];
  ganmao: string;
  pm10: number;
  pm25: number;
  quality: string;
  shidu: string;
  wendu: string;
  yesterday: Forecast;
}

interface State {
  cityInfo: CityInfo | null;
  weatherData: WeatherData | null;
}

export const useWeatherStore = defineStore("weather", {
  state: (): State => {
    return {
      cityInfo: null,
      weatherData: null,
    };
  },
  getters: {
    gCityInfo: (state) => state.cityInfo,
    gWeatherData: (state) => state.weatherData,
    gForecast: (state) => state.weatherData?.forecast || [],
  },
  actions: {
    async getWeather() {
      // 中国天气网城市id https://www.weather.com.cn/
      const adcode = "101280601"; // 101030100|101280601
      const { data } = await axios.get(`http://t.weather.itboy.net/api/weather/city/${adcode}`);
      if (!data) return;
      this.cityInfo = data.cityInfo;
      this.weatherData = data.data;
    },
    async gdGetWeather() {
      const location = await this.gdGetLocationByIP();
      const params = {
        key: "977703a034729bb78f2c78c387011b37",
        city: location?.adcode,
        extensions: "all",
      };
      const result = await axios.get("https://restapi.amap.com/v3/weather/weatherInfo", { params });
      console.log(result);
    },
    async gdGetLocationByIP() {
      const ip = await this.getIPAddress();
      const params = { key: "977703a034729bb78f2c78c387011b37", ip };
      const { data } = await axios.get("https://restapi.amap.com/v3/ip", { params });
      return data;
    },
    async getIPAddress() {
      try {
        const response = await fetch("https://ipinfo.io/json");
        const data = await response.json();
        return data.ip;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async getLocationByIP() {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
});
