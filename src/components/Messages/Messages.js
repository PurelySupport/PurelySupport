import React, { Component } from 'react';
import { connect } from 'react-redux';

class Messages
 extends Component {
    render(){
        return(
            <div>Messages
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages
);