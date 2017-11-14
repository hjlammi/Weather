import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import DateComponent from './DateComponent';
var moment = require('moment');

class InfoBox extends Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      place: "",
      main: "",
      description: "",
      temp: "",
      humidity: "",
      wind: "",
      sunrise: "",
      sunset: ""
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        var apiKey = "4a7cbaa6c92638da2d7083e157b44740"
        var address = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +
        "&units=metric&APPID=" + apiKey;

        fetch(address).then(results => {
          return results.json();
        }).then(data => {
          this.setState({
            place: data.name,
            main: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset
          })
        })},
      (error) => {
        const place = prompt("Couldn't locate you automatically. Please give your location:");
        this.setState({
          place: place
        })
      },
      {timeout: 20000});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weather Now</h1>
        </header>
        <DateComponent />
        <Clock />
        <h1>{this.state.place}</h1>
        <p>{this.state.description}</p>
        <p>Current temperature: {this.state.temp} C</p>
        <p>Humidity: {this.state.humidity} C</p>
        <p>Wind: {this.state.wind} m/s</p>
        <p>Sunrise: {moment.unix(this.state.sunrise).format("HH.mm")}</p>
        <p>Sunset: {moment.unix(this.state.sunset).format("HH.mm")}</p>
        <InfoBox>{this.state.weather}</InfoBox>
      </div>
    );
  }
}

  export default App;
