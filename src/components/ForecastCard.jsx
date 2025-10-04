import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import { BsCalendar2DayFill, BsCloudLightningRainFill, BsThermometerSun } from "react-icons/bs";

const ForecastCard = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const [selected, setSelected] = useState(forecast[0]);

  return (
    <div>
      <h3 className="font-semibold text-2xl">5-Day Forecast</h3>

      <div className="w-full flex gap-4 my-4 overflow-x-scroll scrollbar-hide pb-2">
        {forecast.map((day, i) => (
          <div
            key={i}
            onClick={() => setSelected(day)}
            className={`min-w-[140px] p-4 rounded-3xl cursor-pointer transition-all duration-500 ${
              selected.dt === day.dt
                ? "text-white  bg-gradient-to-br from-sky-500/30 to-black transition-all duration-500"
                : "bg-black/20 backdrop-blur-sm text-white"
            }`}
          >
            <p className="font-semibold text-sm flex gap-1 items-center">
            <BsCalendar2DayFill/> 
             {new Date(day.dt * 1000)
                .toDateString()
                .split(" ")
                .slice(0, 3)
                .join(" ")}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-14 h-14 mx-auto"
            />

            <div className="text-xs flex justify-between mt-2 text-center">
              <p className=" flex gap-1 items-center"> <BsThermometerSun/> {Math.round(day.main.temp)}°C</p>
              <p className=" flex gap-1 items-center"> <BsCloudLightningRainFill/> {day.weather[0].main}</p>
            </div>
          </div>
        ))}
      </div>

      <WeatherCard data={selected} />
    </div>
  );
};

export default ForecastCard;
