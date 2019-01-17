import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';
import {Redirect, Route} from 'react-router-dom';
import Search from './Search';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      password: null,
      redirect: false
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    console.log(event.target.value, event.target.name)
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ', this.state);
    event.preventDefault();
    this.setState({redirect: true});
  }

  render () {

    if (this.state.redirect) {
      return (
        <Redirect to={{
            pathname: "/search",
            state: {user: this.state.user}
          }}/>
      )
    } else {

      return (
        <div className='container'>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="user">Username:</Label>
              <Input type="text" name="user" id="user" placeholder="Enter a username"
                  onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup row>
              <Label for="password">Password:</Label>
              <Input type="password" name="password" id="password" placeholder=""
                  onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup row>
              <Button>Submit</Button>
            </FormGroup>
          </Form>
        </div>
      )
    }
  }
}

export default Login;
