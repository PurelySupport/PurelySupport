import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GroupListModal.css';

class GroupListModal extends Component {
    render(){
        return(
            <div>GroupListModal</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupListModal);