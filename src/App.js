import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.css';
import MainPage from './MainPage.js';
import TaxResults from './TaxResults.js';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route path="/TaxResults" component={TaxResults} />
        </div>
      </Router>
    );
  }
}
export default App;
