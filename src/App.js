import React, { useState } from "react";
const api = {
    key: "69f1180baba16804c8046c4c94a48706",
    base: "https://api.openweathermap.org/data/2.5/weather?q="
};

export default function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = event => {
        if (event.key === "Enter") {
            fetch(`${api.base}${query}&units=metric&appid=${api.key}`)
                .then((response) => response.json())
                .then((result) => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    };

    return (
        <div className="app">
            <card>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">{weather.main.temp}°c</div>
                            <div className="weather">{weather.weather[0].main}</div>
                            <div className="humidity">{weather.main.humidity}%</div>
                            <div className="wind">{weather.wind.speed}</div>
                        </div>
                    </div>
                ) : ('')}
            </card>
        </div>
    );
}
