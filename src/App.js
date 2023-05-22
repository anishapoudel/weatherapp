import "./App.css";
import React, { useState, useEffect } from "react";
import Findweather from "./Findweather.js";

function App() {
  const [message, setMessage] = useState([]);
  const [text, setText] = useState([]);
  const [email, setEmail] = useState([]);

  const handleSubmit = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${text}&appid=04b97e1dbbea61314ea885c24039475e`
    )
      .then((response) => response.json())
      .then((data) => setMessage(data))
      .catch((error) => console.log("Error: ", error));
  };

  useEffect(() => {
    console.log(message);
  }, [message]);

  const handleEmail = () => {
    fetch(
      `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=FNMNdzW9bQ5hrxY2gZkjAxtFGQ1G52t5`
    )
      .then((response) => response.json())
      .then((data) => setEmail(data.results))
      .catch((error) => console.log("Error: ", error));
  };

  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <div>
      <header>
        <p>Weather in Your Area</p>

        <div>
          <label for="string">Enter Zip Code: </label>
          <input
            id="string"
            placeholder="type here..."
            type="string"
            onChange={(event) => setText(event.target.value)}
          ></input>

          <button class="fa fa-search" type="submit" onClick={handleSubmit}>
            GO!
          </button>
        </div>
      </header>
      {message.length === 0 ? (
        <p></p>
      ) : (
        <div>
          {message.cod === "400" ? (
            <p> Reenter zipcode</p>
          ) : (
            <Findweather long={message.lon} latt={message.lat} />
          )}
        </div>
      )}

      <div>
        <header>
          <p>Your Top Stories</p>
          <div>
            <button class="fa fa-search" type="submit" onClick={handleEmail}>
              Get most emailed articles for the last day!
            </button>
            {/* <button class="fa fa-search" type="submit" onClick={handleSubmit}>
              Get most shared articles on Facebook for the last day:
            </button>
            <button class="fa fa-search" type="submit" onClick={handleSubmit}>
              Get most viewed articles for the last seven days:
            </button> */}
          </div>
        </header>
        {email.length === 0 ? (
          <p></p>
        ) : (
          <div>
            <table>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
              {email.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.abstract}</td>
                  <td>
                    <a href={item.url}> Click to read </a>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
