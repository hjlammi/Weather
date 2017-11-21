import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cssClass = (this.props.hidden === false) ? "menu" : "menu hidden";
    return (
      <div className={cssClass} onClick={this.props.onClick}>
        <p>Search</p>
        <p>5 day forecast</p>
      </div>
    )
  }
}

export default Menu;
