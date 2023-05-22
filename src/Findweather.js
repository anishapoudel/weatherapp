import React, { useEffect, useState } from "react";

function Findweather({ long, latt }) {
  const [message, setMessage] = useState([]);

  const handleCurrent = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latt}&lon=${long}&exclude=current&appid=04b97e1dbbea61314ea885c24039475e`
    )
      .then((response) => response.json())
      .then((data) => setMessage(data))
      .catch((error) => console.log("Error: ", error));
  };

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div>
      <header>
        <div>
          <button class="fa fa-search" type="submit" onClick={handleCurrent}>
            Current Weather
          </button>
        </div>
        <div>
          <button class="fa fa-search" type="submit" onClick={handleCurrent}>
            Hourly Forecast
          </button>
        </div>
        <div>
          <button class="fa fa-search" type="submit" onClick={handleCurrent}>
            Weekly Forecast
          </button>
        </div>
      </header>

      {message.current === 0 ? (
        <p></p>
      ) : (
        <div>
          <div>{message}</div>
          <div>{message}</div>
        </div>
      )}

      {message.hourly === 0 ? (
        <p></p>
      ) : (
        <div>
          <div>{message}</div>
          <div>{message}</div>
        </div>
      )}

      {message.weekly === 0 ? (
        <p></p>
      ) : (
        <div>
          <div>{message}</div>
          <div>{message}</div>
        </div>
      )}
    </div>
  );
}
export default Findweather;
