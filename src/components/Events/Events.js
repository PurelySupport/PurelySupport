import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Events.css';

class Events extends Component {
    render(){
        return(
            <div>Events</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);