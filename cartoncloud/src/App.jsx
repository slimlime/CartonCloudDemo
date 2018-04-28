import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Container, Row, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink as NavLinkReact, Collapse } from 'reactstrap';
import Deliveries from './Deliveries';
import Create from './Create';
import Update from './Update';
import Delete from './Delete';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Container>
            <Row>
              <header className="header">
                <Navbar expand="md">
                  <NavbarBrand href="/"><h3 className="text-muted">CartonCloud</h3></NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto float-right" pills>
                      <NavItem>
                        <NavLink active="true" exact to="/" className="nav-link">Deliveries</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact to="/create" className="nav-link">New Delivery</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
              </header>
            </Row>
            <Row>
              <Route
                key="Deliveries"
                exact
                path="/"
                component={Deliveries}
              />
              <Route
                key="Create"
                path="/create"
                component={Create}
              />
              <Route
                key="Update"
                path="/update"
                component={Update}
              />
              <Route
                key="Delete"
                path="/delete"
                component={Delete}
              />
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
