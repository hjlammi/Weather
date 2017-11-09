import React, { Component } from 'react';

class DataFetcher extends Component {
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
            this.setState({
                place: position.coords.latitude
            })},
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

export default DataFetcher;
