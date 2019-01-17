import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      password: null
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    console.log(event.target)
    // this.setState();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render () {
    return (
      <div className='container'>
        <Form>
          <FormGroup row>
            <Label for="user">Username:</Label>
            <Input type="text" name="user" id="user" placeholder="Enter a username" />
          </FormGroup>
          <FormGroup row>
            <Label for="pass">Password:</Label>
            <Input type="password" name="pass" id="pass" placeholder="" />
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Login;
