import React, { Component } from 'react';
import './App.css';
import Clock from './Clock.js';
import DataFetcher from './DataFetcher';
var moment = require('moment');

class InfoBox extends Component {
    render() {
        return (
            <DataFetcher />
        )
    }
}

class DateComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: moment().format("MMMM D YYYY")
        }
    }

    render() {
        return (
            <div>
                {this.state.date}
            </div>
        )
    }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weather Now</h1>
        </header>
        <DateComponent />
        <Clock />
        <InfoBox />
      </div>
    );
  }
}

export default App;
