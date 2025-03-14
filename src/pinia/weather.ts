import axios from "axios";
import { defineStore } from "pinia";

interface State {}

export const useWeatherStore = defineStore("weather", {
  state: (): State => {
    return {};
  },
  getters: {},
  actions: {
    async getWeather() {
      // 中国天气网城市id https://www.weather.com.cn/
      const adcode = "101280601"; // 101030100|101280601
      const result = await axios.get(`http://t.weather.itboy.net/api/weather/city/${adcode}`);
      console.log(result);
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
  },
});
