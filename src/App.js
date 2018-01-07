import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import DateComponent from './DateComponent';
import HamburgerMenu from './HamburgerMenu';
import BackgroundBroken from './img/background_images/abstract/broken2.jpg';
import BackgroundBalloon from './img/background_images/abstract/balloon2.jpg';
import BackgroundThunder from './img/background_images/abstract/thunder2.jpg';
import BackgroundRain from './img/background_images/abstract/rain-drops.jpeg';
import BackgroundSnow from './img/background_images/abstract/snow2.jpg';
import BackgroundFog from './img/background_images/abstract/fog.jpg';
import BackgroundStorm from './img/background_images/abstract/storm.jpg';
import BackgroundCold from './img/background_images/abstract/frost.jpeg';
import BackgroundHot from './img/background_images/abstract/hot.jpeg';
import BackgroundWindy from './img/background_images/abstract/windy.jpg';
import BackgroundCloudy from './img/background_images/abstract/cloudy.jpg';
import BackgroundDandelion from './img/background_images/abstract/else.jpg';
import BackgroundLoading from './img/background_images/abstract/loading.jpg';
import YellowSun from "./img/YellowSun.svg";
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
      dataIsLoaded: false,
      errorOpen: false
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
            description: data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1),
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
        this.setState({
          errorOpen: true
        })
      },
      {timeout: 20000});
    }
  }

  render() {

    let errorHidden, infoHidden;
    let bgImg;
    if (this.state.dataIsLoaded) {
      if (this.state.id >= 200 && this.state.id <= 232) {
        bgImg = BackgroundThunder;
      } else if (this.state.id >= 300 && this.state.id <= 321) {
        bgImg = BackgroundRain;
      } else if (this.state.id >= 500 && this.state.id <= 531 ) {
        bgImg = BackgroundRain;
      } else if (this.state.id >= 600 && this.state.id <= 622) {
        bgImg = BackgroundSnow;
      } else if (this.state.id >= 701 && this.state.id <= 771) {
        bgImg = BackgroundFog;
      } else if (this.state.id === 800) {
        bgImg = BackgroundBalloon;
      } else if (this.state.id === 801 || this.state.id === 802) {
        bgImg = BackgroundBroken;
      } else if (this.state.id === 803 || this.state.id === 804) {
        bgImg = BackgroundCloudy;
      } else if (this.state.id === 781) {
        bgImg = BackgroundStorm;
      } else if (this.state.id >= 900 && this.state.id <= 902) {
        bgImg = BackgroundStorm;
      } else if (this.state.id >= 960 && this.state.id <= 962) {
        bgImg = BackgroundStorm;
      } else if (this.state.id === 903) {
        bgImg = BackgroundCold;
      } else if (this.state.id === 904) {
        bgImg = BackgroundHot;
      } else if (this.state.id >= 905 && this.state.id <= 906) {
        bgImg = BackgroundWindy;
      } else if (this.state.id >= 952 && this.state.id <= 959) {
        bgImg = BackgroundWindy;
      } else {
        bgImg = BackgroundDandelion;
      }
    } else {
      bgImg = BackgroundDandelion;
      infoHidden = { display: "none"}
    }

    let divStyle = {
      backgroundImage: 'url(' + bgImg + ')'
    }

    let icon = this.state.icon;
    let iconURL = "./SVG/" + icon + ".svg";

    if (this.state.errorOpen) {
      infoHidden = { display: "none"}
    } else {
      errorHidden = { display: "none" };
    }

    return (
      <div className="App" style={divStyle}>
        <header className="App-header">
          <HamburgerMenu />
          <h1 className="App-title"><img src={YellowSun} alt="logo" className="App-logo"/>WeatherNow</h1>
        </header>
        <div className="infoContainer">
          <DateComponent />
          <Clock />
          <div className="weatherInfo" style={infoHidden}>
            <h1>{this.state.place}</h1>
            <p><img src={process.env.PUBLIC_URL + iconURL} alt=""/>{this.state.temp} &deg;C</p>
            <p>{this.state.description}</p>
            <p>Humidity: {this.state.humidity} %</p>
            <p>Wind: {this.state.wind} m/s</p>
            <p>Sunrise: {moment.unix(this.state.sunrise).format("HH.mm")}</p>
            <p>Sunset: {moment.unix(this.state.sunset).format("HH.mm")}</p>
          </div>
          <div className="errorMsg" style={errorHidden}>
            <h3>Unfortunately something went wrong and we couldn't locate you automatically!</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
