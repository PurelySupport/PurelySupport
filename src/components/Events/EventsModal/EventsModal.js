import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventsModal.css';

class EventsModal extends Component {
    render(){
        return(
            <div>EventsModal</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsModal);