import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyActivityLog extends Component {
    render(){
        return(
            <div>MyActivityLog</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MyActivityLog);