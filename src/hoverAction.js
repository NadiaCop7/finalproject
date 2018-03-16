import React from 'react';
import React, { Component } from 'react';

class onHover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false;
    }
  }
}

render () {
  return (
    <div onMouseOver={() => this.setState({ bool: true })} onMouseOut={() => this.setState({ bool: false })}>
      {this.state.bool ? }

    </div>

  )
}

export default hoverAction;
