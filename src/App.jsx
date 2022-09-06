import { useState, useEffect } from "react";
import refresh from "./images/refresh.png";

import "./App.css";

function App() {
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [data, setData] = useState([]);

  if (data.location) {
    const localTime = data.location.localtime;
    var date =
      localTime.slice(8, 10) +
      "-" +
      localTime.slice(5, 7) +
      "-" +
      localTime.slice(0, 4);
  }

  const refreshWeather = async () => {
    await fetch(
      `http://api.weatherapi.com/v1/current.json?key=9d2685a56d4c4cfc9c3154155220509&q=${lat},${lon}&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    const getData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });

      await refreshWeather();
    };
    getData();
  }, [lat, lon]);

  console.log(data);

  return (
    <div className="App">
      <div className="app--container">
        <img
          src={refresh}
          alt="refresh"
          className="app--container_refreshImg"
          onClick={refreshWeather}
        />
        {data.location && (
          <div className="app--container_info">
            <div className="imgtemp--container">
              <img
                className="weather--img"
                src={data.current.condition.icon}
                alt=""
              />
              <div className="temp--container">
                <h2>
                  {data.current.temp_c}&#8451; / {data.current.temp_f}&#8457;
                </h2>
                <p className="small--text">
                  {data.current.feelslike_c}&#8451; / {data.current.feelslike_f}
                  &#8457;
                </p>
                <p className="small--text">
                  <strong>humidity:</strong> {data.current.humidity}%
                </p>
                <p className="small--text">
                  <strong>wind:</strong> {data.current.wind_kph} km/h{" "}
                  {data.current.wind_dir}
                </p>
              </div>
            </div>
            <div className="location--container">
              <p className="small--text">{date}</p>
              <h1>{data.location.name}</h1>
              <p className="small-text">
                {data.location.region}, {data.location.country}
              </p>
              <p className="small--text">{data.current.condition.text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
