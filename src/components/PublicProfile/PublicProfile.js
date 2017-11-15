import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PublicProfile.css';

class PublicProfile extends Component {
    render(){
        return(
            <div>PublicProfile</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile);