import React from "react";
import GoogleMapFrame from "./MapEmbed";
import { BsWind } from 'react-icons/bs'

const CurrentWeather = ({ current }) => {
  if (!current) return null;

  return (
    <div className=" w-full my-4">
      <h2 className="font-bold text-2xl">{current.name}, {current.sys.country}</h2>
      <p className="text-xs ">Updated a few minutes ago</p>

      <div className=" w-fit flex items-center gap-4 p-4 rounded-3xl bg-black/20 backdrop-blur-sm my-2 ">
        <div className="flex gap-1">
          <p className="text-6xl font-bold">{current.main.temp}</p>
          <span className="font-semibold">°C</span>
        </div>
         <img
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt="weather.png"
          className="scale-110 transition-all duration-200"
        />
        <div>
          <p className="font-bold text-xl capitalize">{current.weather[0].description}</p>
          <p className="font-semibold text-sm capitalize flex gap-2 items-center"><BsWind/> {current.wind.speed} m/s</p>
        </div>
      </div>
      <GoogleMapFrame lat={current.coord.lat} lng={current.coord.lon} />

    </div>
  );
};

export default CurrentWeather;
