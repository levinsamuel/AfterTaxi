import React from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      start_lat: 34.17,
      start_lng: -118.42,
      end_lat: 34.19,
      end_lng: -118.46,
      est: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    // console.log(event.target.value, event.target.name)
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log('An address was submitted: ', this.state);
    event.preventDefault();

    fetch('http://localhost:3001/priceest', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => this.setState({est: res}))
    .then(res => console.log('state', this.state))
    .catch(err => console.error(err.message));
  }


  render () {

    const passedState = this.props.location ? this.props.location.state : null;
    console.debug('search props:', this.props)

    if (passedState && passedState.user) {
      return (
        <div className='container'>
          <Row>
            <h3> Hi {passedState.user} </h3>
          </Row>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="startad">Start Address:</Label>
              <Input type="text" name="startad" id="startad" placeholder="Start"
                  onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup row>
              <Label for="endad">End Address:</Label>
              <Input type="text" name="endad" id="endad" placeholder="End"
                  onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup row>
              <Button>Get Estimate</Button>
            </FormGroup>
          </Form>
        </div>
      )
    } else {
      return (
        <Redirect to='/home' />
      )
    }
  }
}

export default Search;
