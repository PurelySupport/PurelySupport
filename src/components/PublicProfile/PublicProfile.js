import React, { Component } from 'react';
import { connect } from 'react-redux';

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