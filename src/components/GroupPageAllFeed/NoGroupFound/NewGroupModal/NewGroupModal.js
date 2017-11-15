import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewGroupModal extends Component {
    render(){
        return(
            <div className='NewGroupModal'>NewGroupModal</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupModal);