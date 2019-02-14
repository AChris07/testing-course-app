import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import Calculator from './components/Calculator';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                Demo App
              </Navbar.Brand>
            </Navbar.Header>
            <Nav bsStyle="pills" activeKey={1}>
              <NavItem eventKey={1} href="#">
                Calculadora Científica
              </NavItem>
            </Nav>
          </Navbar>
        </header>
        <section className="app-demo">
          <Calculator/>
        </section>
      </div>
    );
  }
}

export default App;
