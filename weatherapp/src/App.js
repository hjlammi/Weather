import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import DateComponent from './DateComponent';
import Background1 from './img/background_images/blue-clouds-day-fluffy-53594.jpeg';
import Background2 from './img/background_images/few_clouds.jpeg';
var moment = require('moment');

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
      sunset: "",
      id: "",
      icon: "",
      dataIsLoaded: false
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
        // var address = "http://127.0.0.1:8000/response.json";

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
            sunset: data.sys.sunset,
            id: data.weather[0].id,
            icon: data.weather[0].icon,
            dataIsLoaded: true
          })
        });
      },
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

    let bgImg;
    if (this.state.dataIsLoaded) {
      if (this.state.id === 801 || this.state.id === 802) {
        bgImg = Background1;
      } else if (this.state.id === 803 || this.state.id === 804) {
        bgImg = Background2;
      }
    }

    let divStyle = {
      backgroundImage: 'url(' + bgImg + ')'
    }

    let iconURL = "http://openweathermap.org/img/w/" + this.state.icon + ".png";

    return (
      <div className="App" style={divStyle}>
        <header className="App-header">
          <h1 className="App-title">Weather Now</h1>
        </header>
        <DateComponent />
        <Clock />
        <h1>{this.state.place}</h1>
        <img src={iconURL} alt=""/>
        <p>{this.state.description}</p>
        <p>Current temperature: {this.state.temp} C</p>
        <p>Humidity: {this.state.humidity} %</p>
        <p>Wind: {this.state.wind} m/s</p>
        <p>Sunrise: {moment.unix(this.state.sunrise).format("HH.mm")}</p>
        <p>Sunset: {moment.unix(this.state.sunset).format("HH.mm")}</p>
      </div>
    );
  }
}

  export default App;
