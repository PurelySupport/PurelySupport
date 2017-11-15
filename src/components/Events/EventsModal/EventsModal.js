import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventsModal extends Component {
    render(){
        return(
            <div className='EventsModal'>EventsModal</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsModal);