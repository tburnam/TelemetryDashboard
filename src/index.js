import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Graph from './containers/Graph';


// import App from './components/app';

// Import main style sheet for website
import './style.scss';

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
