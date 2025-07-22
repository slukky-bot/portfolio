import React from "react";

import WeatherApp from "../components/Weather";
import MultipleWeather from "../components/MultipleWeather";
import NewsList from "../components/News";

const Projects = () => {
  return (
    <div>
      <NewsList />
      <WeatherApp />
      <MultipleWeather />
    </div>
  );
};

export default Projects;
