import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';

class PublicProfile extends Component {
    render(){
        return(
            <div className='PublicProfile'>
            <Navbar />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile);