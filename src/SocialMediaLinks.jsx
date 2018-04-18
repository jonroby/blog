import React, { Component } from 'react';

import './SocialMediaLinks.css';

class SocialMediaLinks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { width } = this.props;
    return (
      <div className="social-links-container">
        <div className="social-links-fixed" style={{ width }}>
          <div className="social-links">
            <div>
              <i className="fa fa-github" />
              <i className="fa fa-linkedin" />
              <i className="fa fa-google" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialMediaLinks;
