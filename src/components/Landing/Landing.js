import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
    render() {
        return (
            <div className='Landing'>
            <div>Landing</div>
                <a href={process.env.REACT_APP_LOGIN}><button className='btn'>Login</button></a>
            </div>
        )
    }
}

export default Landing;