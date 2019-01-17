import React from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Result from './Result';

const initialState = () => ({
  est: null,
  addressStart: '',
  latStart: null,
  lngStart: null,
  addressEnd: '',
  latEnd: null,
  lngEnd: null
});

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState();
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleStSelect = this.handleStSelect.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleEnSelect = this.handleEnSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.test = this.test.bind(this);
  }

  handleStartChange = addressStart => {
    this.setState({ addressStart });
    console.log(this.state)
  };

  handleEndChange = addressEnd => {
    this.setState({ addressEnd });
    console.log(this.state)
  };

  handleStSelect = addressStart => {
    console.log("selected this one", addressStart);
    geocodeByAddress(addressStart)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          latStart: latLng.lat,
          lngStart: latLng.lng,
          addressStart
        })
      )
      .catch(error => console.error('Error', error));
  };

  handleEnSelect = addressEnd => {
    console.log("selected this one", addressEnd);
    geocodeByAddress(addressEnd)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          latEnd: latLng.lat,
          lngEnd: latLng.lng,
          addressEnd
        })
      )
      .catch(error => console.error('Error', error));
  };

  handleSubmit(event) {
    console.log('An address was submitted: ', this.state);
    event.preventDefault();

    var {latStart, lngStart, latEnd, lngEnd} = this.state;

    if (latStart == null || lngStart == null || latEnd == null || lngEnd == null) {
      alert("Could not get coordinates for one or more addresses");
    } else {

      const qstring = `start_lat=${latStart}&start_lng=${lngStart}&` +
          `end_lat=${latEnd}&end_lng=${lngEnd}`;
      fetch('http://localhost:3001/priceest?' + qstring, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(res => this.setState({est: res.cost_estimates}))
      .then(res => console.log('state', this.state))
      .catch(err => console.error(err.message));
    }
  }

  clearForm() {
    this.setState(initialState());
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
            <PlacesAutocomplete
              value={this.state.addressStart}
              onChange={this.handleStartChange}
              onSelect={this.handleStSelect}
            >
             {(props) => (
                <FormGroup row>
                  <Label for="startad">Start Address</Label>
                  <PlacesInput {...props} placeholder='Start' name='startad' id='startad' />
                </FormGroup>
              )}
            </PlacesAutocomplete>
            <PlacesAutocomplete
              value={this.state.addressEnd}
              onChange={this.handleEndChange}
              onSelect={this.handleEnSelect}
            >
              {(props) => (
                <FormGroup row>
                  <Label for="endad">End Address</Label>
                  <PlacesInput {...props} name="endad" id="endad" placeholder="End" />
                </FormGroup>
              )}
            </PlacesAutocomplete>
            <FormGroup row>
              <Button style={{backgroundColor: '#5245c2'}}>Get Estimate</Button>
              <Button className="ml-1" onClick={this.clearForm}>Clear</Button>
            </FormGroup>
          </Form>

          <Result estimates={this.state.est} />
        </div>
      )
    } else {
      return (
        <Redirect to='/home' />
      )
    }
  }

  // use with this: <Button className="ml-1" onClick={this.test}>Test</Button>
  test() {
    this.setState({
      est: [
          {
              "currency": "USD",
              "ride_type": "lyft_line",
              "display_name": "Shared",
              "primetime_percentage": "0%",
              "primetime_confirmation_token": null,
              "cost_token": null,
              "price_quote_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy::Cgdjb3VyaWVy",
              "price_group_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy",
              "is_valid_estimate": true,
              "estimated_duration_seconds": 705,
              "estimated_distance_miles": 3.79,
              "estimated_cost_cents_min": 400,
              "estimated_cost_cents_max": 600,
              "can_request_ride": true
          },
          {
              "currency": "USD",
              "ride_type": "lyft",
              "display_name": "Lyft",
              "primetime_percentage": "0%",
              "primetime_confirmation_token": null,
              "cost_token": null,
              "price_quote_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy::CghzdGFuZGFyZA==",
              "price_group_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy",
              "is_valid_estimate": true,
              "estimated_duration_seconds": 705,
              "estimated_distance_miles": 3.79,
              "estimated_cost_cents_min": 800,
              "estimated_cost_cents_max": 1000,
              "can_request_ride": true
          },
          {
              "currency": "USD",
              "ride_type": "lyft_plus",
              "display_name": "Lyft XL",
              "primetime_percentage": "0%",
              "primetime_confirmation_token": null,
              "cost_token": null,
              "price_quote_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy::CgRwbHVz",
              "price_group_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy",
              "is_valid_estimate": true,
              "estimated_duration_seconds": 705,
              "estimated_distance_miles": 3.79,
              "estimated_cost_cents_min": 1200,
              "estimated_cost_cents_max": 1500,
              "can_request_ride": true
          },
          {
              "currency": "USD",
              "ride_type": "lyft_premier",
              "display_name": "Lux",
              "primetime_percentage": "0%",
              "primetime_confirmation_token": null,
              "cost_token": null,
              "price_quote_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy::CgdwcmVtaXVt",
              "price_group_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy",
              "is_valid_estimate": true,
              "estimated_duration_seconds": 705,
              "estimated_distance_miles": 3.79,
              "estimated_cost_cents_min": 2100,
              "estimated_cost_cents_max": 2400,
              "can_request_ride": true
          },
          {
              "currency": "USD",
              "ride_type": "lyft_lux",
              "display_name": "Lux Black",
              "primetime_percentage": "0%",
              "primetime_confirmation_token": null,
              "cost_token": null,
              "price_quote_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy::CgNsdXg=",
              "price_group_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy",
              "is_valid_estimate": true,
              "estimated_duration_seconds": 705,
              "estimated_distance_miles": 3.79,
              "estimated_cost_cents_min": 2800,
              "estimated_cost_cents_max": 3200,
              "can_request_ride": true
          },
          {
              "currency": "USD",
              "ride_type": "lyft_luxsuv",
              "display_name": "Lux Black XL",
              "primetime_percentage": "0%",
              "primetime_confirmation_token": null,
              "cost_token": null,
              "price_quote_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy::CgZsdXhzdXY=",
              "price_group_id": "EJ6ThMTUnq2BERoYemVybzoxMjI1NzQxMDE0MTc0NTk5NTgy",
              "is_valid_estimate": true,
              "estimated_duration_seconds": 705,
              "estimated_distance_miles": 3.79,
              "estimated_cost_cents_min": 3600,
              "estimated_cost_cents_max": 4000,
              "can_request_ride": true
          }
      ]
    })
  }
}
// <Input type="text" name="startad" id="startad" placeholder="Start"
//     onChange={this.handleChange}/>
// { getInputProps, suggestions, getSuggestionItemProps, loading }

const PlacesInput = ( props ) => {

  console.debug(props)
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
