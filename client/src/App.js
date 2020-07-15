import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col} from "react-bootstrap"
import Navigation from "./components/NavBar"
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import HomePage from './components/HomePage';
import BackOffice from './components/BackOffice';
import Edit from "./components/Edit"

class App extends React.Component {

  state = {
    books:[]
  }

  render() {
    return (
      <Router>
      <div>

        <Navigation />
        
        <Switch>
          <Route path="/details/:id">
            <Edit />
          </Route>
          <Route path="/backoffice">
            <BackOffice />
          </Route>
          <Route path="/" exact>
             <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
