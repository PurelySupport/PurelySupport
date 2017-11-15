import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NoGroupFound.css';

class NoGroupFound extends Component {
    render(){
        return(
            <div>NoGroupFound</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(NoGroupFound);