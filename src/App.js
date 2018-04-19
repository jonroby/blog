import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import MyEditor from "./MyEditor.jsx";

import Home from "./Home.jsx";
import About from "./About.jsx";
import Posts from "./Posts.jsx";
import Post from "./Post.jsx";
import Editor from "./Editor.jsx";
import Quill from "./Quill.jsx";

import "./App.css";

const home = () => {
  return (
    <div>
      <Navbar loc={"home"} />
      <Route exact path="/" component={Home} />
    </div>
  );
};

const post = () => {
  return (
    <div>
      <Navbar loc={"post"} />
      <Route exact path="/posts/:post" component={Post} />
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Navbar path="*" />
          </Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:post" component={Post} />

          <Route exact path="/editor" component={Editor} />
          <Route exact path="/editor/:post" component={Editor} />
          <Route exact path="/about" component={About} />
          <Route exact path="/quill" component={Quill} />
        </div>
      </BrowserRouter>
    );
  }
}

// <Route exact path="/posts/:post" component={Post} />

export default App;

// https://www.vanityfair.com/images/trending-horizontal-squiggle.svg
