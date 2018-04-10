import React, { Component } from 'react';

import './Navbar.css';

class App extends Component {
  render() {
    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-articles">Posts</div>
                <div className="navbar-jonroby">
                    <div className="navbar-jon">Jon</div>
                    <div className="navbar-roby">Roby</div>
                </div>
                <div className="navbar-about">About</div>
            </div>
        </div>
    );
  }
}

export default App;

