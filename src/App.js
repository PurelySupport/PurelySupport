import React, { Component } from 'react';
import Routers from './routers';
import './App.css';
import { getUserCredentials } from '../src/ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends Component {

  componentDidMount(){
    this.props.getUserCredentials()
  }
  render() {
    return (
      <div className="App">
        <Routers />
        
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    userCredentials: state.userCredentials
    
  }
}


export default withRouter(connect(mapStateToProps, { getUserCredentials })(App));
