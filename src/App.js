import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import MyEditor from "./MyEditor.jsx";

import Home from "./Home.jsx";
import About from "./About.jsx";
import Posts from "./Posts.jsx";
import Post from "./Post.jsx";
import Editor from "./Editor.jsx";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route path="/about" component={About} />
          <Route path="/editor" component={Editor} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// https://www.vanityfair.com/images/trending-horizontal-squiggle.svg
