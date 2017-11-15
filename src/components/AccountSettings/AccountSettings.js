import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccountSettings extends Component {
    render(){
        return(
            <div className='AccountSettings'>AccountSettings</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);