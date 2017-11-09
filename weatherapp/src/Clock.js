import React, { Component } from 'react';
var moment = require('moment');

class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: moment()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            time: moment()
        });
    }

    render() {
        return (
            <div>
                {this.state.time.format("HH.mm.ss")}
            </div>
        )
    }
}

export default Clock;
