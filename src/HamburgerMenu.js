import React, { Component } from 'react';
import Menu from './Menu';

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleHidden: true
    }
  }

  handleClick() {
    this.setState({
      toggleHidden: !this.state.toggleHidden
    })
  }

  render() {
    return (
      <div>
        <div className="ham-menu" onClick={this.handleClick.bind(this)}>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
        </div>
        <Menu hidden={this.state.toggleHidden} onClick={this.handleClick.bind(this)}/>
      </div>
    )
  }
}

export default HamburgerMenu;
