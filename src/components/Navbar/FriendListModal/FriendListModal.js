import React, { Component } from 'react';
import { connect } from 'react-redux';

class FriendListModal extends Component {
    render(){
        return(
            <div>FriendListModal</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendListModal);