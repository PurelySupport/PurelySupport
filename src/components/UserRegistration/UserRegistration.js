import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserRegistration.css';

class UserRegistration extends Component {
    render(){
        return(
            <div>UserRegistration</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);