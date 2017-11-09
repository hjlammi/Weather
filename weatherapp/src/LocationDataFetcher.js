import React, { Component } from 'react';

class LocationDataFetcher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            place: ""
        };
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            var address = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon;

            fetch(address).then(results => {
                return results.json();
            }).then(data => {
                this.setState({
                    place: data.results[0].address_components[2].long_name
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
            <h1>{this.state.place}</h1>
        )
    }
}

export default LocationDataFetcher;
