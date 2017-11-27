import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';

class MyActivityLog extends Component {
    render(){
        return(
            <div className='MyActivityLog'>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyActivityLog);