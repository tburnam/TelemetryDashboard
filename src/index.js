import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Graph from './containers/Graph';


// import App from './components/app';

// Import main style sheet for website
import './style.scss';


// Navigation Component (for top of each page)
const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
      </ul>
    </nav>
  );
};

// TODO: Inline hack for Main page
const Main = (props) => {
  return <div> Main page </div>;
};


// TODO: Inline hack for About page
const About = (props) => {
  return <div> All there is to know about me </div>;
};

// TODO: Inline hack for test page
const Test = (props) => {
  return <div> this retrieves a record </div>;
};


// Main application
const App = (props) => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Graph} />
      </div>
    </Router>
  );
};

ReactDOM.render(
    <App />
  , document.getElementById('main'));
