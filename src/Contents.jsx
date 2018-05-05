import React, { Component } from "react";

import "./Contents.css";

class Contents extends Component {
  constructor(props) {
    super(props);
  }

  renderContents = contents => {
    if (!contents) return;
    return contents.map(c => {
      return <div>{c}</div>;
    });
  };

  render() {
    const { width, contents } = this.props;
    return (
      <div className="contents-container">
        {/*<div className="contents-fixed" style={{ width }}>
          <div className="contents">
            <div>
              {this.renderContents(contents)}
            </div>
          </div>
        </div>*/}
      </div>
    );
  }
}

export default Contents;
