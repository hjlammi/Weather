import React, { Component } from 'react';
var moment = require('moment');

class DateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("ddd D MMMM YYYY")
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

export default DateComponent;
