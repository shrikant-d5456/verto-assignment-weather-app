import React from "react";
import ForecastCard from "./ForecastCard";

const Forecast = ({ days }) => {
  return (
    <div >
      <h3>5-Day Forecast</h3>
      <div>
        {days.map((day, idx) => (
          <ForecastCard key={idx} day={day} />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
