import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserRegistration extends Component {
    render(){
        return(
            <div className='UserRegistration'>UserRegistration</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);