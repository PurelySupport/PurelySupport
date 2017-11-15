import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewGroupModal extends Component {
    render(){
        return(
            <div>NewGroupModal</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupModal);