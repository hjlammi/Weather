import React, { Component } from 'react';

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ham-menu">
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
      </div>
    )
  }
}

export default HamburgerMenu;
