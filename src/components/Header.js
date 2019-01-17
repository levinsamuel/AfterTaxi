import React from 'react';
import { Jumbotron} from 'reactstrap';
// import {NavLink} from 'react-router-dom';
// import PropTypes from 'prop-types'

class Header extends React.Component {
  render () {
    return (
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <h3>AfterTaxi</h3>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

// <NavbarToggler onClick={this.toggleNav} />

// <Collapse isOpen={this.state.isNavOpen} navbar>
//   <Nav navbar>
//     <NavItem>
//       <NavLink className="nav-link" to="/home">
//         <span className="fa fa-home fa-lg"></span> Home
//       </NavLink>
//     </NavItem>
//     <NavItem>
//       <NavLink className="nav-link" to="/aboutus">
//         <span className="fa fa-info fa-lg"></span> About Us
//       </NavLink>
//     </NavItem>
//     <NavItem>
//       <NavLink className="nav-link" to="/menu">
//         <span className="fa fa-list fa-lg"></span> Menu
//       </NavLink>
//     </NavItem>
//     <NavItem>
//       <NavLink className="nav-link" to="/contactus">
//         <span className="fa fa-address-card fa-lg"></span> Contact Us
//       </NavLink>
//     </NavItem>
//   </Nav>
//   <Nav className="ml-auto" navbar>
//     <NavItem>
//       <Button outline onClick={this.toggleModal}>
//         <span className="fa fa-sign-in fa-lg"></span> Login
//       </Button>
//     </NavItem>
//   </Nav>
// </Collapse>
export default Header;
