import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupListModal extends Component {
    render(){
        return(
            <div className='GroupListModal'>GroupListModal</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupListModal);