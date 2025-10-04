import axios from "axios";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: import.meta.env.VITE_WEATHER_API_KEY,
    units: "metric",
  },
});

export default weatherApi;