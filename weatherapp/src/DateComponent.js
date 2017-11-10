import React, { Component } from 'react';
var moment = require('moment');

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

export default DateComponent;
