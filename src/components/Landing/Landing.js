import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
    render() {
        return (
            <div className='Landing'>
                <div className='main'>
                    <div className='title-box'>
                        <span>PURELY SUPPORT</span>
                    </div>
                    <div className='btn-parent'>
                    <a href={process.env.REACT_APP_LOGIN}><div className='title-btns'> enter </div></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;