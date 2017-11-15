import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PostModal.css';

class PostModal extends Component {
    render(){
        return(
            <div>PostModal</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);