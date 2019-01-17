import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Login from './Login';
import Header from './Header';

class Main extends React.Component {
  render () {
    return (
      <div className='Main'>
        <Header/>
        <Switch>
          <Route path='/login' component={Login} />
          <Redirect to='/login'/>
        </Switch>
      </div>
    )
  }
}

export default Main;
