import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AccountSettings.css';

class AccountSettings extends Component {
    render(){
        return(
            <div>AccountSettings</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);