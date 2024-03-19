import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import Search from "../assets/search.png";
import Cloud from "../assets/cloud.png";
import Clear from "../assets/clear.png";
import Drizzle from "../assets/drizzle.png";
import Rain from "../assets/rain.png";
import Snow from "../assets/snow.png";
import Humidity from "../assets/humidity.png";
import Wind from "../assets/wind.png";

const WeatherApp = () => {
  const api_key = "15e5171f4fbebf5be8934a3aeacb300d";
  const [city, setCity] = useState(null);
  const [searchBtn, setSearchBtn] = useState("");
  const [search, setSearch] = useState("Kolkata");
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [wicon, setWicon] = useState(Cloud);

  const searchCall = () => {
    setSearch(searchBtn);
  };

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${api_key}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Data Was Not Found");
        }
        const data = await response.json();
        // console.log(data);
        setCity(data);
        setLoading(false);

        // Move the logic to set the weather icon here
        if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
          setWicon(Cloud);
        } else if (
          data.weather[0].icon === "01d" ||
          data.weather[0].icon === "01n"
        ) {
          setWicon(Clear);
        } else if (data.weather[0].icon.startsWith("02")) {
          setWicon(Cloud);
        } else if (
          data.weather[0].icon.startsWith("03") ||
          data.weather[0].icon.startsWith("04")
        ) {
          setWicon(Drizzle);
        } else if (
          data.weather[0].icon.startsWith("09") ||
          data.weather[0].icon.startsWith("10")
        ) {
          setWicon(Rain);
        } else if (data.weather[0].icon.startsWith("13")) {
          setWicon(Snow);
        } else {
          setWicon(Clear);
        }
      } catch (error) {
        console.log(error);
        setCity(null);
        setLoading(false);
      }
    };

    if (search) {
      fetchApi();
    }
  }, [search]);

  return (
    <div className="Container">
      <div className="flex items-center justify-center gap-5 pt-14">
        <input
          type="text"
          className="border w-96 h-20 border rounded-full border-none outline-none pl-10 text-2xl font-medium"
          placeholder="Search"
          onChange={(e) => {
            setSearchBtn(e.target.value);
          }}
        />
        <div
          className="flex justify-center items-center bg-white h-20 w-20 border rounded-full cursor-pointer"
          onClick={searchCall}
        >
          <img src={Search} alt="Search" />
        </div>
      </div>
      <div className="weatherImg flex justify-center mt-7">
        <img src={wicon} alt="Cloud" />
      </div>
      {loading ? ( // Conditional rendering based on loading state
        <h1 className="text-white text-5xl mt-10 font-normal">Loading...</h1>
      ) : !city ? (
        <h1 className="text-white text-5xl mt-10 font-normal">No Data Found</h1>
      ) : (
        <div>
          <div className="weather-temp flex justify-center text-white text-9xl font-medium">
            {Math.floor(city.main.temp)}°C
          </div>

          <div className="weather-location flex justify-center text-white text-6xl mt-7">
            {/* To capitalize the first letter of the text */}
            {search.charAt(0).toUpperCase() + search.slice(1)}
          </div>
          <div className="data-container flex justify-center text-white mt-20">
            <div className="element flex items-start m-auto gap-3">
              <img src={Humidity} alt="Humidity" className="mt-2" />
              <div className="data text-3xl font-normal">
                <div className="humidity-percent">{city.main.humidity}%</div>
                <div className="text-lg">Humidity</div>
              </div>
            </div>
            <div className="element flex items-start m-auto gap-3">
              <img src={Wind} alt="Wind" className="mt-2" />
              <div className="data text-3xl font-normal">
                <div className="humidity-percent">{city.wind.speed}km/h</div>
                <div className="text-lg">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
