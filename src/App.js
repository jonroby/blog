import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar.jsx";

import Home from "./Home.jsx";
import About from "./About.jsx";
import Posts from "./Posts.jsx";
import Post from "./Post.jsx";
import Quill from "./Quill.jsx";

import "./App.css";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Route path="/" component={Navbar} />

                <Switch>
                  <Route exact path="/posts" component={Posts} />
                  <Route exact path="/posts/:post" component={Post} />

                  <Route exact path="/editor" component={Quill} />
                  <Route exact path="/editor/:post" component={Quill} />
                  <Route exact path="/about" component={About} />

                  <Route path="*" component={Posts} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
