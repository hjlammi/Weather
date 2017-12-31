import React, { Component } from 'react';

class WeatherDataFetcher extends Component {
  constructor(props) {
    super();

    this.state = {
      place: "",
      weather: {}
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        var apiKey = "4a7cbaa6c92638da2d7083e157b44740"
        var address = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;

        fetch(address).then(results => {
          return results.json();
        }).then(data => {
          console.log(data)
          this.setState({
            place: data.name,
            weather: data
          })
        });
      },
      (error) => {
        const place = prompt("Couldn't locate you automatically. Please give your location:");
        this.setState({
          place: place
        })},
        {timeout: 20000});
      }
    }

    render() {
      return (
        <div>
        <h1>{this.props.weather}</h1>
        </div>
      )
    }
  }

  export default WeatherDataFetcher;
