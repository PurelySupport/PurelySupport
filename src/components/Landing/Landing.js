import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
    render() {
        return (
            <div className='App'>
                <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);