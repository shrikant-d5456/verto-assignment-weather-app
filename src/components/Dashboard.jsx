import React, { useEffect, useState } from "react";
import api from "../config/api";
import CurrentWeather from "./CurrentWeather";
import ForecastCard from "./ForecastCard";
import Select from "./Select";
import img from '../assets/img.png';

const Dashboard = () => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [long, setLong] = useState(null);
  const [lati, setLati] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLati(pos.coords.latitude);
          setLong(pos.coords.longitude);
        },
        (err) => setError(err.message)
      );
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        let params = {};
        if (query) params.q = query;
        else if (lati && long) params = { lat: lati, lon: long };
        else return;

        const currentRes = await api.get("/weather", { params });
        setCurrent(currentRes.data);

        const forecastRes = await api.get("/forecast", { params });
        const daily = {};
        forecastRes.data.list.forEach((item) => {
          const hour = new Date(item.dt_txt).getHours();
          if (hour === 12) {
            daily[item.dt_txt.split(" ")[0]] = item;
          }
        });
        setForecast(Object.values(daily));
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching weather");
        alert("City Not found");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [query, lati, long]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setQuery(city);
      setRecent((prev) => (prev.includes(city) ? prev : [...prev, city]));
    }
  };

  const getBackgroundImage = (weather) => {
    if (!weather)
      return img;

    weather = weather.toLowerCase();
    if (weather.includes("thunderstorm"))
      return "https://th.bing.com/th/id/OSK.HERObhIWTRKl2_5E3J_W2j49SvEUCEv6-SRQfl63ZocK9eM?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3";
    if (weather.includes("drizzle"))
      return "https://img.freepik.com/premium-photo/car-is-driving-through-thick-fog-headlights-are-they-are-very-effective-car-is-surrounded-by-trees-road-is-wet_36682-74569.jpg";
    if (weather.includes("rain"))
      return "https://miro.medium.com/v2/resize:fit:1200/1*uWDRMi2XvuQIL48mMxwP4Q.jpeg";
    if (weather.includes("snow"))
      return "https://wallpapercave.com/wp/wp5112924.jpg";
    if (weather.includes("atmosphere"))
      return "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/atmosphere/view-edge-earth-atmosphere-layer.jpg";
    if (weather.includes("clear"))
      return "https://img.freepik.com/premium-photo/green-grass-field-with-sky-clouds-ai-generated_838900-4939.jpg";
    if (weather.includes("cloud"))
      return "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=clouds-cloudscape-cloudy-158163.jpg&fm=jpg";

    return "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f4/73.jpg";
  };

  const weatherMain = current?.weather?.[0]?.main;
  const iconCode = current?.weather?.[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  return (
    <main
      className="w-full h-screen object-cover overflow-y-scroll text-white transition-all duration-300 delay-200"
      style={{
        backgroundImage: `url(${getBackgroundImage(weatherMain)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-screen overflow-y-scroll scrollbar-hide md:p-8 p-4 ">
        <Select
          city={city}
          setCity={setCity}
          handleKeyDown={handleKeyDown}
          recent={recent}
        />
        {loading && <p>Loading weather data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {current && (
          <div className="w-full lg:flex gap-8">
              <CurrentWeather current={current} />
            <ForecastCard forecast={forecast} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
