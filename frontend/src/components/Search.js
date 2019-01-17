import React from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      start_lat: 34.17,
      start_lng: -118.42,
      end_lat: 34.19,
      end_lng: -118.46,
      est: null,
      address: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMapChange = this.handleMapChange.bind(this);
  }


  handleChange(event) {
    // console.log(event.target.value, event.target.name)
    this.setState({[event.target.name]: event.target.value});
  }

  handleMapChange = address => {
    this.setState({ address });
    console.log(this.state)
  };

  handleSelect = address => {
    console.log("selected this one", address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

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

          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleMapChange}
            onSelect={this.handleSelect}
          >
           {(props) => (
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="startad">Start Address:</Label>
                <PlacesInput {...props} placeholder='Start' name='startad' id='startad' />
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
          )}
          </PlacesAutocomplete>
        </div>
      )
    } else {
      return (
        <Redirect to='/home' />
      )
    }
  }
}
// <Input type="text" name="startad" id="startad" placeholder="Start"
//     onChange={this.handleChange}/>
// { getInputProps, suggestions, getSuggestionItemProps, loading }

const PlacesInput = ( props ) => {

  console.log(props)
  const {getInputProps, suggestions, getSuggestionItemProps, loading,
      placeholder, name, id} = props;

  return (
    <>
      <Input {...getInputProps({
                placeholder, name, id,
                className: 'location-search-input',
              })}
      />
      <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map(suggestion => {
          const className = suggestion.active
            ? 'suggestion-item--active'
            : 'suggestion-item';
          // inline style for demonstration purpose
          const style = suggestion.active
            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
            : { backgroundColor: '#ffffff', cursor: 'pointer' };
          return (
            <div
              {...getSuggestionItemProps(suggestion, {
                className,
                style,
              })}
            >
              <span>{suggestion.description}</span>
            </div>
          );
        })}
      </div>
    </>
)
}

export default Search;
