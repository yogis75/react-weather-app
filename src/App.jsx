import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });

      await fetch(
        `http://api.weatherapi.com/v1/current.json?key=9d2685a56d4c4cfc9c3154155220509&q=${lat},${lon}&aqi=no`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    };
    getData();
  }, [lat, lon]);

  console.log(data);

  return (
    <div className="App">
      {data.location && (
        <div>
          <h1>{data.location.name}</h1>
          <p>{data.location.localtime}</p>
          <div className="tooltip">
            <img src={data.current.condition.icon} alt="" />
          </div>
          <p>Current Temp: {data.current.temp_c}&#8451;</p>
          <p>Feels like: {data.current.feelslike_c}&#8451;</p>
        </div>
      )}
    </div>
  );
}

export default App;
