import React from "react";
import {
  BsThermometerHalf,
  BsMoisture,
  BsSpeedometer2,
  BsWind,
  BsCloudDrizzle,
} from "react-icons/bs";

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const WeatherDetailCard = ({ icon: Icon, title, value, subtitle }) => {
    return (
      <div className="bg-white/10 text-white rounded-2xl p-4 flex flex-col items-center shadow-md">
        <Icon className="text-2xl mb-2" />
        <p className="font-semibold">{title}</p>
        <p className="text-lg">{value}</p>
        {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto p-6 bg-gradient-to-br from-sky-500/30 to-black text-white rounded-3xl shadow-lg mt-6">
     
      <h2 className="text-lg font-semibold mb-4">
        {new Date(data.dt * 1000).toLocaleString()}
      </h2>

    
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-6">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
          <div>
            <p className="text-4xl font-bold">{Math.round(data.main.temp)}°C</p>
            <p className="capitalize">{data.weather[0].description}</p>
          </div>
        </div>
        
        <WeatherDetailCard
          icon={BsThermometerHalf}
          title="Feels Like"
          value={`${Math.round(data.main.feels_like)}°C`}
        />
        <WeatherDetailCard
          icon={BsMoisture}
          title="Humidity"
          value={`${data.main.humidity}%`}
          subtitle="Very Humid"
        />
        <WeatherDetailCard
          icon={BsSpeedometer2}
          title="Pressure"
          value={`${data.main.pressure} hPa`}
          subtitle="Rising Slowly"
        />
        <WeatherDetailCard
          icon={BsWind}
          title="Wind"
          value={`${data.wind.speed} m/s`}
          subtitle={`Dir: ${data.wind.deg}°`}
        />
        {data.rain && (
          <WeatherDetailCard
            icon={BsCloudDrizzle}
            title="Rain (3h)"
            value={`${data.rain["3h"]} mm`}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
