import React, { Component } from 'react';

export class user extends Component {
  render() {
    return (
        <div className="user">
          {this.props.user.name}
        </div>
    );
  }
}
